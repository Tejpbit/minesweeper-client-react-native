export const CONNECTION_STATE = "CONNECTION_STATE";

export enum ConnectionStatus {
  CONNECTED,
  DISCONNECTED
}

export interface ConnectionState {
  connectionStatus: ConnectionStatus.DISCONNECTED;
}

const initalState: ConnectionState = {
  connectionStatus: ConnectionStatus.DISCONNECTED
};

export const connectionReducer = (
  state: ConnectionState = initalState,
  action
) => {
  switch (action.type) {
    case CONNECTION_STATE:
      return {
        ...state,
        connectionStatus: action.connectionStatus
      };

    default:
      return state;
  }
};

export const updateConnectionState = (connectionStatus: ConnectionStatus) => {
  return {
    type: CONNECTION_STATE,
    connectionStatus
  };
};
