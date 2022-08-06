const renderLoginBlock = (container) => {
  const loginInput = document.createElement("input");
  loginInput.classList.add("input");
  loginInput.placeholder = "Введите имя игрока";
  loginInput.setAttribute("required", "required");

  const loginButton = document.createElement("button");
  loginButton.classList.add("button_active");
  loginButton.textContent = "Войти";

  const error = document.createElement("p");

  loginButton.addEventListener("click", () => {
    if (loginInput.value === "") {
      error.textContent = "Вы не можете зайти в игру без имени";
      container.insertBefore(error, container.children[0]);
    }
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
  playerList.classList.add("player-list");
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

const renderPlayButtonBlock = (container) => {
  const playButton = document.createElement("button");
  playButton.classList.add("button_active");
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

const renderPlayerMovesBlock = (container) => {
  const rockButton = document.createElement("div");
  rockButton.classList.add("button-move");
  rockButton.style.backgroundImage = "url('./src/img/rock.png')";

  const paperButton = document.createElement("div");
  paperButton.classList.add("button-move");
  paperButton.style.backgroundImage = "url('./src/img/paper.png')";

  const scissorsButton = document.createElement("div");
  scissorsButton.classList.add("button-move");
  scissorsButton.style.backgroundImage = "url('./src/img/scissors.png')";

  const requestParams = {
    token: window.application.player.token,
    id: window.application.player.gameId,
  };

  rockButton.addEventListener("click", () => {
    requestParams.move = "rock";
    appRequest("play", requestParams, getGameStatus);
  });

  paperButton.addEventListener("click", () => {
    requestParams.move = "paper";
    appRequest("play", requestParams, getGameStatus);
  });

  scissorsButton.addEventListener("click", () => {
    requestParams.move = "scissors";
    appRequest("play", requestParams, getGameStatus);
  });

  const moves = document.createElement("div");
  moves.classList.add("moves");

  [rockButton, paperButton, scissorsButton].forEach((el) => moves.appendChild(el));
};

window.application.blocks["player-moves"] = renderPlayerMovesBlock;

const renderNextGameBlock = (container) => {
  const nextGameButton = document.createElement("button");
  nextGameButton.classList.add("button_active");
  nextGameButton.textContent = "Играть ещё!";

  nextGameButton.addEventListener("click", () => {
    const requestParams = {
      login: window.application.player.login,
    };
    appRequest("login", requestParams, getToken);
  });

  container.appendChild(nextGameButton);
};

window.application.blocks["next-game"] = renderNextGameBlock;

const renderLoadingBlock = (container) => {
  const loadingImage = document.createElement("img");
  loadingImage.src = "./src/img/loading.png";
  loadingImage.classList.add("loading");

  container.appendChild(loadingImage);
};

window.application.blocks["loading"] = renderLoadingBlock;

const renderImgBlock = (container) => {
  const marqueeBlock = document.createElement("div");
  marqueeBlock.classList.add("marquee__block");

  const rock = document.createElement("img");
  rock.classList.add("marquee__item");
  rock.src = "./src/img/rock.png";
  marqueeBlock.appendChild(rock);

  const paper = document.createElement("img");
  paper.classList.add("marquee__item");
  paper.src = "./src/img/paper.png";
  marqueeBlock.appendChild(paper);

  const scissors = document.createElement("img");
  scissors.classList.add("marquee__item");
  scissors.src = "./src/img/scissors.png";
  marqueeBlock.appendChild(scissors);

  container.appendChild(marqueeBlock);
};

window.application.blocks["img"] = renderImgBlock;

const renderWinImgBlock = (container) => {
  const winImage = document.createElement("img");
  winImage.src = "./src/img/win.png";
  winImage.classList.add("centre");

  container.appendChild(winImage);
};

window.application.blocks["win-img"] = renderWinImgBlock;
