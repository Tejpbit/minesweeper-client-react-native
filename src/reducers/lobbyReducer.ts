export const USER_ONLINE = "USER_ONLINE";
export const LOBBY_CHAT = "LOBBY_CHAT";
export const OTHER_CHAT = "OTHER_CHAT";
export const LOBBY_CONNECTED = "LOBBY_CONNECTED";
export const USER_LOGGED_IN = "USER_LOGGED_IN";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const LIST = "LIST";

export interface User {
  userName: string;
  rating: string;
  country: string;
  userId: string; // not used by the server right now. Replacing it with the userName in the reducer
  picture: string;
}

export interface GameStatus {
  gameId: string;
  players: string;
  scores: string;
  currentPlayerIndex: string;
  timestamp: string;
}

export interface LobbyState {
  games: GameStatus[];
  onlinePlayers: Record<string, User>;
  onlineAIs: Record<string, User>;
}

export const lobbyReducer = (state = initialLobby, action) => {
  console.log("Lobby reducer action", action);

  switch (action.type) {
    case LIST:
      return {
        ...state,
        [action.payload.gameId]: action.payload
      };

    case USER_ONLINE:
      if (action.payload.userName.startsWith("#AI")) {
        return {
          ...state,
          onlineAIs: {
            ...state.onlineAIs,
            [action.payload.userName]: {
              ...action.payload,
              userId: action.payload.userName
            }
          }
        };
      } else {
        console.log("Adding user", action.payload);

        return {
          ...state,
          onlinePlayers: {
            ...state.onlinePlayers,
            [action.payload.userName]: {
              ...action.payload,
              userId: action.payload.userName
            }
          }
        };
      }

    default:
      return state;
  }
};

const initialLobby: LobbyState = {
  games: [],
  onlinePlayers: {},
  onlineAIs: {}
};
