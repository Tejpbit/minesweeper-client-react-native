import {
  USER_ONLINE,
  OTHER_CHAT,
  LOBBY_CHAT,
  LOBBY_CONNECTED,
  USER_LOGGED_IN,
  LOGIN_ERROR
} from "./reducers/lobbyReducer";

import _ from "lodash";
import { SET_USER_ID, setUserName } from "./reducers/userReducer";

/*
USER 10342 guest_baqasf
stats.zomis.net : 8083
localhost:8080

VUE_APP_URL=http://localhost:8082/
VUE_APP_AUTH_API_URL=http://localhost:8082/
VUE_APP_AUTH_REDIRECT_URL=http://localhost:8080/
*/

export class Backend {
  dispatch: any;
  backendUrl: string;
  ws: WebSocket;

  constructor(backendUrl, dispatch) {
    this.dispatch = dispatch;
    this.backendUrl = backendUrl;
    console.log("Creating websocket");

    this.ws = new WebSocket(`wss://${backendUrl}/websocket`);

    this.ws.onopen = () => {
      // connection opened
      dispatch(setUserName("guest_tejp_react_native"));
      this.ws.send("USER 30000 guest_tejp_react_native"); // send a message
    };

    this.ws.onmessage = e => {
      // a message was received
      console.log("backend says: ", e.data);
      this.handle_message(e.data);
    };

    this.ws.onerror = e => {
      // an error occurred
      console.log("error", e);
    };

    this.ws.onclose = e => {
      // connection closed
      console.log("error closed", e);
    };
  }

  send(message: string) {
    this.ws.send(message);
  }

  handle_message(message: string) {
    const parts = message.split(" ");
    const actionName = parts[0];
    //this.dispatch()

    const actionTemplate = actionTemplates[actionName];
    console.log("Action:", actionName, actionTemplates[actionName]);

    const paramValues = {
      fullParam: message.substr(5),
      params: parts.slice(1)
    };

    if (actionTemplate.handler) {
      actionTemplate.handler(paramValues);
    } else {
      // No handler.
      // Assume there exists params array with names for the parameters
      const paramNames = actionTemplate.params;
      const paramTuples = _.zip(paramNames, paramValues.params);

      const actionPayload = paramTuples.reduce(
        (acc: Record<string, string>, curr: [string, string]) => {
          return {
            ...acc,
            [curr[0]]: curr[1]
          };
        },
        {}
      );
      this.dispatch({
        type: actionTemplate.type,
        payload: actionPayload
      });
    }
  }
}

// ADIO // spela audio
// USRK //dunno
// ws message PROT Your account is not protected with a password. Please use another method to login.
// ws message USRK guest_tejp_react_native
// ws message CONN guest_tejp_react_native 1500 -- 0 https://www.gravatar.com/avatar/06ba159c19debdb63f1a50606f9e7d1e?s=128&d=identicon
// ws message CONN guest_tejp_react_native 1500 -- 0 https://www.gravatar.com/avatar/06ba159c19debdb63f1a50606f9e7d1e?s=128&d=identicon
// ws message USER guest_tejp_react_native 1500 -- 0 https://www.gravatar.com/avatar/06ba159c19debdb63f1a50606f9e7d1e?s=128&d=identicon
// ws message CHAT Welcome to Minesweeper Flags Extreme! To see a list of commands, write /help in the chat.
// ws message CHAT The server currently does not have a database connection. Games that you play will NOT be stored in the database and cannot be resumed if all players leave the game.
// ws message USER #AI_Linear 2000 N/A 0 https://www.gravatar.com/avatar/9acca2403d2bbb96ea31f8e14fd2843e?s=128&d=identicon
// ws message USER #AI_Loser 2000 N/A 0 https://www.gravatar.com/avatar/399f7c86a904dfb1ca4d38c20cbb9fcb?s=128&d=identicon
// ws message USER #AI_Horrible 2000 N/A 0 https://www.gravatar.com/avatar/51466a70f8441a2a066911cbcc7f0d7f?s=128&d=identicon
// ws message USER #AI_Complete_Idiot 2000 N/A 0 https://www.gravatar.com/avatar/0212ec74cb537d382376801737f1b2bf?s=128&d=identicon
// ws message USER #AI_Medium 2000 N/A 0 https://www.gravatar.com/avatar/4195cd9fefd40b09df18c4dbca7b7806?s=128&d=identicon
// ws message USER #AI_Challenger 2000 N/A 0 https://www.gravatar.com/avatar/cd765950d399d1e83bee91e80d8e60b5?s=128&d=identicon
// ws message USER #AI_Fighter 2000 N/A 0 https://www.gravatar.com/avatar/f90dab3c112ec8d42f4158ad41a9540b?s=128&d=identicon
// ws message USER #AI_Hard 2000 N/A 0 https://www.gravatar.com/avatar/183e259e9c3dd97e186c38d56856cd39?s=128&d=identicon
// ws message USER #AI_HardPlus 2000 N/A 0 https://www.gravatar.com/avatar/bc50fe559f9db382ee56ef9641ddcb18?s=128&d=identicon
// ws message USER #AI_Extreme3 2000 N/A 0 https://www.gravatar.com/avatar/78cc1c402c21399bf563187bfcd0a61f?s=128&d=identicon
// ws message USER #AI_Nightmare 2000 N/A 0 https://www.gravatar.com/avatar/29c5c7b028ecb22adc59cbf08cc453b7?s=128&d=identicon
// ws message USER guest_tejp_react_native 1500 -- 0 https://www.gravatar.com/avatar/06ba159c19debdb63f1a50606f9e7d1e?s=128&d=identicon

interface ActionParams {
  fullParam: string;
}
interface Action {
  type: string;
  handler?: (params: ActionParams) => any;
  params?: string[];
}
type ActionMap = Record<string, Action>;

const actionTemplates = {
  USRK: { type: USER_LOGGED_IN, params: ["userName"] },
  PROT: { type: LOGIN_ERROR, handler: p => ({ message: p.fullParam }) },
  CHAT: {
    type: LOBBY_CHAT,
    handler: e => ({
      timestamp: new Date().toLocaleString(),
      message: e.fullParam
    })
  },
  MESS: {
    type: OTHER_CHAT,
    handler: e => ({
      timestamp: new Date().toLocaleString(),
      message: e.fullParam
    })
  },
  ALRT: {
    type: "lobby/notification",
    handler: e => ({
      timestamp: new Date().toLocaleString(),
      message: e.fullParam
    })
  },
  NOTI: {
    type: "lobby/notification",
    handler: e => ({
      timestamp: new Date().toLocaleString(),
      message: e.fullParam
    })
  },
  PLAY: {
    type: "lobby/chatMessage",
    handler: e => ({
      timestamp: new Date().toLocaleString(),
      message: `Game #${e.params[0]} started! ${e.params[1]} vs. ${e.params[2]}`
    })
  },
  CONN: {
    type: LOBBY_CONNECTED,
    params: ["userName", "rating", "country"]
  },
  GONE: {
    type: "lobby/disconnected",
    params: ["userName"]
  },
  NAME: {
    type: "games/setNames",
    params: ["gameId", "player1", "player2"] // TODO: Fix to support more players, use "e.restParams(1)"
  },
  MDAT: {
    type: "games/mapData",
    params: ["gameId", "type", "value"]
  },
  PDAT: {
    type: "games/playerData",
    params: ["gameId", "playerIndex", "type", "value"]
  },
  FDAT: {
    type: "games/fieldData",
    params: ["gameId", "x", "y", "type", "playerIndex", "values"]
  },
  YEND: {
    type: "games/yourElimination",
    params: ["gameId", "result"]
  },
  ELIM: {
    type: "games/playerEliminated",
    params: ["gameId", "name", "score", "winPosition"]
  },
  INVT: {
    type: "invites/addInvite",
    params: ["host", "plugin"],
    handler: () => ({
      response: null
    })
  },
  INVY: {
    type: "invites/onInviteResponse",
    params: ["userName"],
    handler: () => ({
      accepted: true
    })
  },
  INVN: {
    type: "invites/onInviteResponse",
    params: ["userName"],
    handler: () => ({
      accepted: false
    })
  },
  INCG: {
    type: "games/incomplete",
    params: ["gameId", "players", "scores", "clicks", "lastActive"]
  },
  GEND: {
    type: "games/endGame",
    params: ["gameId"]
  },
  GAME: {
    type: "games/newGame",
    params: ["gameId", "yourIndex"]
  },
  LIST: {
    // players and scores are comma-separated
    type: "lobby/gameList",
    params: ["gameId", "players", "scores", "currentPlayerIndex", "timestamp"],
    handler: e => ({ paramsCount: e.params.length })
  },
  SEND: {
    type: "games/changeGameId",
    handler: e => e.fullParam
  },
  USER: {
    type: USER_ONLINE,
    params: ["userName", "rating", "country", "userId", "picture"]
  }
};
