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
};

const getNamesPlayers = (data, container) => {
  let playerInfo;

  container.textContent = "";
  for (const player of data.list) {
    playerInfo = window.application.renderBlock("player-info", container);
    playerInfo.textContent = player.login;
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

  if (data["game-status"].status === "waiting-for-start") {
    window.application.renderScreen("enemyMoveScreen");
    return;
  }

  if (data["game-status"].status === "waiting-for-your-move") {
    window.application.player.enemy = data["game-status"].enemy.login;
    window.application.renderScreen("playerMoveScreen");
    return;
  }
};
