if (window.application.player["token"] === undefined) {
  window.application.renderScreen("login");
}

const getToken = (data) => {
  window.application.player["token"] = data.token;

  const requestParams = {
    token: window.application.player["token"],
  };

  appRequest("player-status", requestParams, getPlayerStatus);
};

const getPlayerStatus = (data) => {
  if (data["player-status"]["status"] === "lobby") {
    window.application.renderScreen("lobby");
  }

  if (data["player-status"]["status"] === "game") {
    window.application.renderScreen("player-move");
  }
};

const getNamesPlayers = (data, container) => {
  container.textContent = "";
  for (const player of data.list) {
    const playerInfo = document.createElement("p");
    playerInfo.textContent = player.login;
    container.appendChild(playerInfo);

    if (player.you) {
      playerInfo.textContent += " (Вы)";
    }
  }
};

const getStart = (data) => {
  window.application.player.gameId = data["player-status"].game.id;

  const requestParams = {
    token: window.application.player.token,
    id: window.application.player.gameId,
  };

  appRequest("game-status", requestParams, getGameStatus);
};

const getGameStatus = (data) => {
  if (data.status === "error") {
    window.application.renderScreen("lobby");
    return;
  }

  if (data["game-status"].status === "game") {
    window.application.renderScreen("player-move");
    return;
  }

  if (data["game-status"].status === "waiting-for-start") {
    window.application.renderScreen("waiting-game");
    return;
  }

  if (data["game-status"].status === "waiting-for-enemy-move") {
    window.application.renderScreen("enemy-move");
    return;
  }

  if (data["game-status"].status === "waiting-for-your-move") {
    window.application.player.enemy = data["game-status"].enemy.login;
    window.application.renderScreen("player-move");
    return;
  }

  if (data["game-status"].status === "lose") {
    window.application.renderScreen("lose");
    return;
  }

  if (data["game-status"].status === "win") {
    window.application.renderScreen("win");
    return;
  }
};

const updateGameStatus = () => {
  const updateStatus = setInterval(() => {
    const requestParams = {
      token: window.application.player.token,
      id: window.application.player.gameId,
    };

    appRequest("game-status", requestParams, getGameStatus);
  }, 1000);

  window.application.timers.push(updateStatus);
};
