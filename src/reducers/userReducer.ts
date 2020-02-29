import { User, USER_ONLINE } from "./lobbyReducer";

export const SET_USER_NAME = "SET_USER_NAME";

const initialState: User = {
  userName: "Not logged in",
  userId: "-",
  rating: "-",
  country: "-",
  picture: "-"
};

export const userReducer = (state = initialState, action): User => {
  switch (action.type) {
    case SET_USER_NAME:
      return {
        ...state,
        userName: action.payload.userName
      };
    case USER_ONLINE:
      if (state.userName === action.payload.userName) {
        return action.payload;
      } else {
        return state;
      }
    default:
      return state;
  }
};

export const setUserName = userName => {
  return { type: SET_USER_NAME, payload: { userName } };
};
