const renderLoginBlock = (container) => {
  const loginInput = document.createElement("input");
  const loginButton = document.createElement("button");

  loginInput.placeholder = "Введите имя игрока";
  loginButton.textContent = "Войти";

  loginButton.addEventListener("click", () => {
    const requestParams = {
      login: loginInput.value,
    };
    window.application.player["login"] = loginInput.value;
    appRequest("login", requestParams, getToken);
  });

  container.appendChild(loginInput);
  container.appendChild(loginButton);
};

window.application.blocks["login-block"] = renderLoginBlock;

const renderPlayerListBlock = (container) => {
  const playerList = document.createElement("div");

  const requestParams = {
    token: window.application.player.token,
  };

  const getOnlinePlayers = setInterval(() => {
    appRequest("player-list", requestParams, (data) => {
      getNamesPlayers(data, playerList);
    });
  }, 1000);

  window.application.timers.push(getOnlinePlayers);

  container.appendChild(playerList);

  return playerList;
};

window.application.blocks["player-list"] = renderPlayerListBlock;

const renderPlayerInfoBlock = (container) => {
  const playerInfo = document.createElement("p");
  container.appendChild(playerInfo);

  return playerInfo;
};

window.application.blocks["player-info"] = renderPlayerInfoBlock;

const renderPlayButtonBlock = (container) => {
  const playButton = document.createElement("button");

  playButton.textContent = "Играть";

  playButton.addEventListener("click", () => {
    const requestParams = {
      token: window.application.player.token,
    };
    appRequest("start", requestParams, getStart);
  });

  container.appendChild(playButton);
};

window.application.blocks["play-button"] = renderPlayButtonBlock;
