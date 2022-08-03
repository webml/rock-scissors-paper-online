const renderLoginScreen = () => {
  const app = document.querySelector(".app");

  const title = document.createElement("h1");
  title.textContent = "Турнир по игре камень, ножницы, бумага";

  const content = document.createElement("div");
  content.classList.add("content");
  window.application.renderBlock("img", content);

  window.application.renderBlock("login-block", content);

  app.appendChild(title);
  app.appendChild(content);
};

window.application.screens["login"] = renderLoginScreen;

const renderLobbyScreen = () => {
  const app = document.querySelector(".app");

  const title = document.createElement("h1");
  title.textContent = "Список игроков";

  const content = document.createElement("div");
  content.classList.add("content");
  content.style.justifyContent = "space-between";

  window.application.renderBlock("player-list", content);
  window.application.renderBlock("play-button", content);

  app.appendChild(title);
  app.appendChild(content);
};

window.application.screens["lobby"] = renderLobbyScreen;

const renderPlayerMoveScreen = () => {
  const app = document.querySelector(".app");

  const title = document.createElement("h1");
  title.textContent = "Ваш ход";

  const content = document.createElement("div");
  content.classList.add("content");
  window.application.renderBlock("player-moves", content);

  app.appendChild(title);
  app.appendChild(content);
};

window.application.screens["player-move"] = renderPlayerMoveScreen;

const renderEnemyMoveScreen = () => {
  const app = document.querySelector(".app");

  const title = document.createElement("h1");
  title.textContent = `Ход ${window.application.player.enemy}`;

  const content = document.createElement("div");
  content.classList.add("centre");
  window.application.renderBlock("loading", content);

  updateGameStatus();

  app.appendChild(title);
  app.appendChild(content);
};

window.application.screens["enemy-move"] = renderEnemyMoveScreen;

const renderWinScreen = () => {
  const app = document.querySelector(".app");

  const title = document.createElement("h1");
  title.textContent = "Вы выиграли!";
  const content = document.createElement("div");
  content.classList.add("content");

  window.application.renderBlock("win-img", content);

  window.application.renderBlock("next-game", content);

  app.appendChild(title);
  app.appendChild(content);
};

window.application.screens["win"] = renderWinScreen;

const renderLoseScreen = () => {
  const app = document.querySelector(".app");

  const title = document.createElement("h1");
  title.textContent = "Вы проиграли!";
  const content = document.createElement("div");
  content.classList.add("content");

  window.application.renderBlock("img", content);
  window.application.renderBlock("next-game", content);

  app.appendChild(title);
  app.appendChild(content);
};

window.application.screens["lose"] = renderLoseScreen;

const renderWaitingGameScreen = () => {
  const app = document.querySelector(".app");

  const title = document.createElement("h1");
  title.textContent = "Ожидание игры";

  const content = document.createElement("div");
  content.classList.add("centre");
  window.application.renderBlock("loading", content);

  updateGameStatus();

  app.appendChild(title);
  app.appendChild(content);
};

window.application.screens["waiting-game"] = renderWaitingGameScreen;
