const initialState = {
  search: "",
  loading: false,
  licenseType: ""
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case "SET_SEARCH_INPUT":
      return {
        ...state,
        search: action.payload
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload
      };
    case "SET_LICENSE_TYPE":
      return {
        ...state,
        licenseType: action.payload
      };
    default:
      return state;
  }
};
