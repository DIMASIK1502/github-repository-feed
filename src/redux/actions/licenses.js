import axios from "axios";
import { url, token } from "../../config/api";
import { message } from "antd";

export function getLicenses() {
  const config = {
    headers: {
      Authorization: `token ${token}`,
      Accept: "application/vnd.github.mercy-preview+json"
    }
  };
  return dispatch =>
    axios
      .get(`${url}/licenses`, config)
      .then(response => {
        dispatch({
          type: "GET_LICENSE_LIST",
          payload: response.data
        });
      })
      .catch(err => {
        message.error("Ошибка при получении списка лицензий");
      });
}
