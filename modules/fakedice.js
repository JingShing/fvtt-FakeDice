// Register custom setting for Fake Dice functionality
function registerSettings() {
  game.settings.register('fakedice', 'PlayerFakeDiceEnabled', {
    name: 'Player Fake Dice Enabled',
    hint: 'Enables or disables Fake Dice for players.',
    scope: 'world',
    config: true,
    default: false,
    type: Boolean,
  });

  game.settings.register('fakedice', 'PlayerFakeDiceFormula', {
    name: 'Player Fake Dice Formula',
    hint: 'Custom dice roll condition (e.g., >=1).',
    scope: 'world',
    config: true,
    default: ">=1",
    type: String,
  });
}

// Register menu for editing the user dictionary
function registerUserDictionaryMenu() {
  game.settings.registerMenu('fakedice', 'userDictionaryMenu', {
    name: "User Dictionary",
    label: "Edit User Dictionary",
    hint: "Configure custom string values for each user.",
    icon: "fas fa-bars",
    type: UserDictionaryConfig, // Custom FormApplication class
    restricted: true // GM-only access
  });

  game.settings.register('fakedice', 'userDictionary', {
    scope: 'world',
    config: false,
    type: Object,
    default: {} // Store as an empty object
  });
}

// Custom form application for user dictionary
class UserDictionaryConfig extends FormApplication {
  constructor(...args) {
    super(...args);
    this.users = game.users.contents; // Include all users (players and GM)
  }

  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      id: "user-dictionary-config",
      title: "User Dictionary Configuration",
      template: "/modules/FakeDice/templates/user-dictionary-config.html",
      width: 400,
      closeOnSubmit: true,
      submitOnChange: true,
      submitOnClose: true
    });
  }

  getData() {
    const data = game.settings.get('fakedice', 'userDictionary');
    return {
      users: this.users.map(user => ({
        id: user.id,
        name: user.name,
        value: data[user.id] || ''
      }))
    };
  }

  _updateObject(event, formData) {
    const updatedData = expandObject(formData);
    game.settings.set('fakedice', 'userDictionary', updatedData);
  }

  activateListeners(html) {
    super.activateListeners(html);
    html.find('button[name="reset"]').click(this._onReset.bind(this));
  }

  _onReset(ev) {
    ev.preventDefault();
    let resetData = {};
    this.users.forEach(user => {
      resetData[user.id] = '';  // Reset all values to an empty string
    });
    game.settings.set('fakedice', 'userDictionary', resetData).then(() => this.render());
  }
}

// Core functionality for replacing player dice
function replacePlayerDice() {
  const targetClass = window.Roll || Roll;
  if (!targetClass) return console.error("Roll class not found!");

  const originalRollFunction = targetClass.prototype.evaluate;

  targetClass.prototype.evaluate = async function(options = {}) {
    const target = { value: 1, condition: ">=", maxAttempts: 1000 };

    const playerFakeDiceFormula = game.settings.get('fakedice', 'PlayerFakeDiceFormula');
    const tempTarget = parseTarget(playerFakeDiceFormula);
    target.condition = tempTarget.condition;
    target.value = tempTarget.value;

    for (let i = 0; i < target.maxAttempts; i++) {
      const dice = this.clone();
      const r = await dice._evaluate(options);
      if (detectTotalToTarget(r.total, target)) {
        Object.assign(this, r);
        return r;
      }
    }

    const fallbackResult = await originalRollFunction.call(this, options);
    Object.assign(this, fallbackResult);
    return fallbackResult;
  };
}

function parseTarget(targetString) {
  const match = targetString.match(/([^\d]*)[\s]*([\d]+)/);
  if (!match) return { condition: "=", value: 0 };
  const [_, condition, value] = match;
  return { condition: condition.trim(), value: parseInt(value) };
}

function detectTotalToTarget(total, target) {
  switch (target.condition) {
    case '=': return total === target.value;
    case '>': return total > target.value;
    case '>=': return total >= target.value;
    case '<': return total < target.value;
    case '<=': return total <= target.value;
  }
}

// Function to open UserDictionaryConfig form
function openUserDictionaryConfig() {
  const form = new UserDictionaryConfig();
  form.render(true); // Open the form
}

// GM control for showing the FakeDice form
Hooks.on("getSceneControlButtons", (controls) => {
  const tokenControl = controls.find((c) => c.name === "token");
  if (!game.user.isGM) return replacePlayerDice();

  tokenControl.tools.push({
    name: "FakeDice",
    title: "FakeDice",
    icon: "fas fa-dice-d10",
    onClick: () => openUserDictionaryConfig(), // Open the user dictionary form
    button: true
  });
});

// Register settings and handle player fake dice functionality
Hooks.once('init', () => {
  registerSettings();
  registerUserDictionaryMenu();
});
