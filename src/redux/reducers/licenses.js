const initialState = {
  results: []
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case "GET_LICENSE_LIST":
      return {
        ...state,
        results: action.payload
      };
    default:
      return state;
  }
};
