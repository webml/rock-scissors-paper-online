const API = "https://skypro-rock-scissors-paper.herokuapp.com/";

const appRequest = (handle, params, perform) => {
  const requestParams = [];

  for (const key in params) {
    requestParams.push(`${key}=${params[key]}`);
  }
  const API_URL = `${API}${handle}?${requestParams.join("&")}`;

  const request = new XMLHttpRequest();
  request.open("GET", API_URL);
  request.send();

  request.onload = function () {
    const data = JSON.parse(request.response);
    perform(data);
  };
};
