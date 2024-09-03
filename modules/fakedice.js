const TARGET_FORMAT = /([^\d]*)[\s]*([\d]+)/;
var targetClass = window.Roll;
if (!targetClass) {
    console.error("window.Roll not found!");
    targetClass = Roll;
}
if (!targetClass) {
    console.error("Roll not found!");
    targetClass = null;
}
else{
    console.log("target Class is using Roll!");
}
const original_roll_function = targetClass.evaluate;

const whisperError = (error) => {
  console.error(`Forget VTT | FakeDice | ${error}`);
  ChatMessage.create({
    user: game.user._id,
    whisper: [game.user._id],
    flavor: "FakeDice",
    content: `<div>Error: ${error}</div>`
  });
};

const whisperMessage = (msg) => {
    console.log(`Forget VTT | FakeDice | ${msg}`);
    ChatMessage.create({
      user: game.user._id,
      whisper: [game.user._id],
      flavor: "FakeDice",
      content: `<div>msg: ${msg}</div>`
    });
};

const parseTarget = (target) => {
  const match = target.match(TARGET_FORMAT);
  const condition = match[1].trim();
  const value = parseInt(match[2].trim());
  switch (condition) {
    case "lt":
    case "<":
      return {
        condition: "<",
        value
      };
    case "lte":
    case "<=":
      return {
        condition: "<=",
        value
      };
    case "gt":
    case ">":
      return {
        condition: ">",
        value
      };
    case "gte":
    case ">=":
      return {
        condition: ">=",
        value
      };
    case "":
    case "eq":
    case "=":
    case "==":
    case "===":
      return {
        condition: "=",
        value
      };
    default:
      return undefined;
  };
};

const parseDialogDoc = (doc) => {
  try {
    const target = parseTarget(doc.find("input[name=target]")[0].value);
    target.maxAttempts = doc.find("input[name=maxAttempts]")[0].value;
    return target;
  } catch (e) {
    console.error(e);
    return {
      target: undefined
    };
  }
}

function activePlayerFakeDice(){
  return;
}

function registerSetting(){
  game.settings.register('fakedice', 'PlayerFakeDiceEnabled', {
    name: 'Player Fake Dice Enabled',
    hint: 'Player Fake Dice Enabled',
    scope: 'world',
    config: true,
    default: false,
    type: Boolean,
    onChange: activePlayerFakeDice
  });
  game.settings.register('fakedice', 'PlayerFakeDiceFormula', {
    name: 'Player Fake Dice Formula',
    hint: 'Player Fake Dice Formula',
    scope: 'world',
    config: true,
    default: ">=1",
    type: String,
  });

}

function replacePlayerDice(){
    targetClass.prototype.evaluate = async function(options={}) {
      var target={value:1, condition:">=", maxAttempts:"1000"};
      const detectTotalToTarget = (total, target) => {
        switch (target.condition) {
            case '=':
                return total === target.value;
            case '>':
                return total > target.value;
            case '>=':
                return total >= target.value;
            case '<':
                return total < target.value;
            case '<=':
                return total <= target.value;
        }
    };
    if(game.settings.get('fakedice', 'PlayerFakeDiceEnabled')){
      // player fake dice
      var playerFakeDiceFormula = game.settings.get('fakedice', 'PlayerFakeDiceFormula');
      var tempTarget = parseTarget(playerFakeDiceFormula);
      target.condition = tempTarget.condition;
      target.value = tempTarget.value;
      for (let i = 0; i < target.maxAttempts; i++) {
        const dice = this.clone();
        const r = await dice._evaluate(options);
        const total = r.total;
        if (detectTotalToTarget(total, target)) {
            console.log(`Foundry VTT | Fake | Simulate in ${i+1} attempts.`);
            this._evaluated = true;
            r._evaluated = true;
            for (let key in r) {
                if (r.hasOwnProperty(key)) {
                    this[key] = r[key];
                }
            }
            return r;
        }
      }
    }
    // if statement cannot meet will return random result
    const dice = this.clone();
    const r = await dice._evaluate(options);
    const total = r.total;
    console.log(`Foundry VTT | Fake | Cannot simulate in max attempts.`);
    this._evaluated = true;
    r._evaluated = true;
    for (let key in r) {
        if (r.hasOwnProperty(key)) {
            this[key] = r[key];
        }
    }
    return r;
};
}

const onSubmit = async (doc, replaceOrNot) => {
  const target = parseDialogDoc(doc);
  if(replaceOrNot){
        targetClass.prototype.evaluate = async function({minimize=false, maximize=false, allowStrings=false, allowInteractive=true, ...options}={}) {
            const detectTotalToTarget = (total, target) => {
                switch (target.condition) {
                    case '=':
                        return total === target.value;
                    case '>':
                        return total > target.value;
                    case '>=':
                        return total >= target.value;
                    case '<':
                        return total < target.value;
                    case '<=':
                        return total <= target.value;
                }
            };
            for (let i = 0; i < target.maxAttempts; i++) {
              const dice = this.clone();
              const r = await dice._evaluate({minimize, maximize, allowStrings, allowInteractive});
              const total = r.total;
              if (detectTotalToTarget(total, target)) {
                  console.log(`Foundry VTT | Fake | Simulate in ${i+1} attempts.`);
                  this._evaluated = true;
                  r._evaluated = true;
                  for (let key in r) {
                      if (r.hasOwnProperty(key)) {
                          this[key] = r[key];
                      }
                  }
                  return r;
              }
          }
          // if statement cannot meet will return random result
          const dice = this.clone();
          const r = await dice._evaluate(options);
          const total = r.total;
          console.log(`Foundry VTT | Fake | Cannot simulate in max attempts.`);
          this._evaluated = true;
          r._evaluated = true;
          for (let key in r) {
              if (r.hasOwnProperty(key)) {
                  this[key] = r[key];
              }
          }
          return r;
        };
        whisperMessage("function got replaced successfully");
        whisperMessage(`All dices are now can only be roll in ${target.condition}${target.value} in ${target.maxAttempts} times`);
  }
  else{
    targetClass.prototype.evaluate = original_roll_function;
    whisperMessage("function got back to original successfully");
  }
}

const showDialog = async () => {
  const html = await renderTemplate("/modules/FakeDice/templates/dialog.html");
  return new Promise((resolve) => {
    new Dialog({
      title: 'FakeDice',
      content: html,
      buttons: {
        yes: {
          label: "Replace",
          callback: async (input) => {
            resolve(await onSubmit(input, true));
          }
        },
        no: {
            label: "Origin",
            callback: async (input) => {
              resolve(await onSubmit(input, false));
            }
          }
      },
      default: "no",
      close: () => resolve(null),
      render: (doc) => {
        doc.find("input[name=target]")[0].focus();
      }
    }).render(true);
  });
}

Hooks.on("getSceneControlButtons", (controls) => {
    registerSetting();
    if (!game.user.isGM) {
        replacePlayerDice();
        return;
    }
    const bar = controls.find((c) => c.name === "token");
    bar.tools.push({
        name: "FakeDice",
        title: "FakeDice",
        icon: "fas fa-dice-d10",
        onClick: () => showDialog(),
        button: true
    });
});
