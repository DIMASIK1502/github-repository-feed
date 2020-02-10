export function setSearchInput(query) {
  return dispatch => dispatch({ type: "SET_SEARCH_INPUT", payload: query });
}
export function setLicenseType(type) {
  return dispatch => dispatch({ type: "SET_LICENSE_TYPE", payload: type });
}
export function setLoading(value) {
  return dispatch => dispatch({ type: "SET_LOADING", payload: value });
}
