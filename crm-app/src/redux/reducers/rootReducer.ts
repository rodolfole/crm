import { combineReducers } from "redux";

import { AuthReducer } from "./authReducer";
import { ClientReducer } from "./clientReducer";

const rootReducer = combineReducers({
  AUTH: AuthReducer,
  CLIENT: ClientReducer,
});

export default rootReducer;
