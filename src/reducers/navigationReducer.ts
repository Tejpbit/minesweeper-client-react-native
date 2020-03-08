export const NAVIGATE = "NAVIGATE";
import * as RootNavigation from "../rootNavigation";
import { PLAY } from "./lobbyReducer";
import { GAME } from "./gameReducer";

export const navigationReducer = (state = "", action) => {
  if (action.type == PLAY || action.type == NAVIGATE) {
    RootNavigation.navigate("GameView");
  }
  return state;
};
