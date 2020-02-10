const initialState = {
  page: 0,
  pageSize: 5,
  results: [],
  total: 0
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case "GET_REPOSITORIES":
      return {
        ...state,
        ...{
          total: action.payload.total_count,
          results: action.payload.items,
          page: action.payload.page
        }
      };
    default:
      return state;
  }
};
