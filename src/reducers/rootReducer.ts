import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { lobbyReducer, LobbyState, User } from "./lobbyReducer";
import { navigationReducer } from "./navigationReducer";
import { gameReducer, Game } from "./gameReducer";
import { connectionReducer, ConnectionState } from "./connectionReducer";
import { lastPressedReducer, LastPressedState } from "./lastPressesReducer";

export const rootReducer = combineReducers({
  lobbyState: lobbyReducer,
  userState: userReducer,
  navigationRoute: navigationReducer,
  gameState: gameReducer,
  connectionState: connectionReducer,
  lastPressesState: lastPressedReducer
});

export interface StoreState {
  lobbyState: LobbyState;
  userState: User;
  navigationRoute: any;
  gameState: Game;
  connectionState: ConnectionState;
  lastPressesState: LastPressedState[];
}
