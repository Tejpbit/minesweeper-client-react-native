export const USER_ONLINE = "USER_ONLINE";
export const LOBBY_CHAT = "LOBBY_CHAT";
export const OTHER_CHAT = "OTHER_CHAT";
export const LOBBY_CONNECTED = "LOBBY_CONNECTED";
export const USER_LOGGED_IN = "USER_LOGGED_IN";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const LIST = "LIST";
export const PLAY = "PLAY";

export interface User {
  userName: string;
  rating: string;
  country: string;
  userId: string; // not used by the server right now. Replacing it with the userName in the reducer
  picture: string;
}

export interface GameStatus {
  gameId: string;
  users: string[];
  scores: string[];
  currentPlayerIndex: string;
  timestamp: string;
}

export class ChatMessage {
  sender: string;
  message: string;
  timestamp: Date;
  constructor(sender: string, message: string, timestamp: Date) {
    this.sender = sender;
    this.message = message;
    this.timestamp = timestamp;
  }
}

export interface LobbyState {
  games: GameStatus[];
  onlinePlayers: Record<string, User>;
  onlineAIs: Record<string, User>;
  globalChat: ChatMessage[];
}

export const lobbyReducer = (state = initialLobby, action) => {
  //   console.log("Lobby reducer action", action);

  switch (action.type) {
    case PLAY:
      return {
        ...state,
        globalChat: [
          ...state.globalChat,
          new ChatMessage("asd", "asd", new Date())
        ]
      };
    case LIST:
      return {
        ...state,
        games: {
          ...state.games,
          [action.payload.gameId]: action.payload
        }
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
  onlineAIs: {},
  globalChat: []
};
