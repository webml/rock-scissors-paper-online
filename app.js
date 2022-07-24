const app = document.querySelector(".app");

window.application = {
  blocks: {},
  screens: {},
  renderScreen: function (screenName) {
    for (let timer of window.application.timers) {
      clearInterval(timer);
      timer === undefined;
    }
    window.application.timers = [];

    if (window.application.screens[screenName] === undefined) {
      return;
    }

    app.textContent = "";

    window.application.screens[screenName]();
  },
  renderBlock: function (blockName, container) {
    if (window.application.blocks[blockName] === undefined) {
      console.log("Такой блок не существует");
    }

    window.application.blocks[blockName](container);
  },
  timers: [],

  player: {},
};
