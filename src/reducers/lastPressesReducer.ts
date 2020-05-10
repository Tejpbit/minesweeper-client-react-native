import { FDAT } from "./gameReducer";
import { Point } from "../models";

const initialState = [null, null];

export type LastPressedState = null | Point;

export const lastPressedReducer = (
  state: LastPressedState[] = initialState,
  action: any
): LastPressedState[] => {
  switch (action.type) {
    case FDAT: {
      const clickedPos = new Point(action.payload.x, action.payload.y);
      const playerIndex = parseInt(action.payload.playerIndex);
      const newState = [...state];
      newState[playerIndex] = clickedPos;
      return newState;
    }
    default:
      return state;
  }
};
