import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { lobbyReducer } from "./lobbyReducer";

export const rootReducer = combineReducers({
  lobbyState: lobbyReducer,
  userState: userReducer
});
