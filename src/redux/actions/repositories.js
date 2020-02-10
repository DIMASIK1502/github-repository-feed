import axios from "axios";
import { url, token } from "../../config/api";
import { message } from "antd";
import moment from "moment";

export function getRepositores(
  page = 1,
  pageSize = 5,
  query = "",
  license = "",
  sorter = "desc"
) {
  const startOfMonth = moment()
    .startOf("month")
    .format("YYYY-MM-DD");
  const config = {
    headers: {
      Authorization: `token ${token}`,
      Accept: "application/vnd.github.mercy-preview+json"
    },
    params: {
      q: `language:javascript created:>=${startOfMonth} ${license &&
        "license:"}${license} ${query}`,
      sort: "stars",
      order: sorter,
      page: page,
      per_page: pageSize
    }
  };
  return dispatch => {
    dispatch({ type: "SET_LOADING", payload: true });
    return axios
      .get(`${url}/search/repositories`, config)
      .then(response => {
        dispatch({ type: "SET_LOADING", payload: false });
        dispatch({
          type: "GET_REPOSITORIES",
          payload: { ...response.data, page, pageSize }
        });
      })
      .catch(err => {
        message.error("Ошибка при получении списка репозиториев");
        dispatch({ type: "SET_LOADING", payload: false });
      });
  };
}
