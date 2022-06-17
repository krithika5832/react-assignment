import { authHeader } from "../helpers";
import { API_URL } from "../config.js";

export const services = {
  GetProductList,
};

function GetProductList(args) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };
  return fetch(`${API_URL}posts`, requestOptions).then(HandleResponse);
}

function HandleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    const status = data.status;
    const code = data.code;
    if (code == 202) {
      if (data.message == "Not Allowed to Delete") {
      } else {
        window.location.reload();
      }
    }
    if (status === "error") {
      if (data.message == "Not Allowed to Delete") {
        const error = data;
        return Promise.reject(error);
      } else {
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
      }
    }
    if (!response.ok) {
      if (response.status === 500) {
        let error = "Operation Not Successful";
        return Promise.reject(error);
      }
      if (response.status === 202) {
        window.location.reload();
      }
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    return data;
  });
}
