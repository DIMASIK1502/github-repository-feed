import { combineReducers } from "redux";

import repositories from "./redux/reducers/repositories";
import common from "./redux/reducers/common";
import licenses from "./redux/reducers/licenses";

export default combineReducers({
  repositories,
  common,
  licenses
});
