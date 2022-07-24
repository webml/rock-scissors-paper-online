const renderLoginScreen = () => {
  const app = document.querySelector(".app");

  const title = document.createElement("h1");
  title.textContent = "Турнир по игре камень, ножницы, бумага";

  const content = document.createElement("div");

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

  window.application.renderBlock("player-list", content);
  window.application.renderBlock("play-button", content);

  app.appendChild(title);
  app.appendChild(content);
};

window.application.screens["lobby"] = renderLobbyScreen;
