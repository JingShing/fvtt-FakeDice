const TARGET_FORMAT = /([^\d]*)[\s]*([\d]+)/;
const original_roll_function = window.Roll.prototype.evaluate;

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
  console.log(target);
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
    console.log(target);
    target.maxAttempts = doc.find("input[name=maxAttempts]")[0].value;
    console.log(target);
    return target;
  } catch (e) {
    console.error(e);
    return {
      target: undefined
    };
  }
}

const onSubmit = async (doc, replaceOrNot) => {
  console.log(doc);
  const target = parseDialogDoc(doc);
  if(replaceOrNot){
        var targetClass = window.Roll;
        if (!targetClass) {
            whisperError("selected class not found!");
            return;
        }
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
        };
        whisperMessage("function got replaced successfully");
        whisperMessage(`All dices are now can only be roll in ${target.condition}${target.value} in ${target.maxAttempts} times`);
  }
  else{
    var targetClass = window.Roll;
    if (!targetClass) {
        whisperError("selected class not found!");
        return;
    }
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
    if (!game.user.isGM) {
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