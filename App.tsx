import "react-native-gesture-handler";
import React from "react";
import _ from "lodash";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Provider } from "react-redux";
import { compose, createStore } from "redux";
import { rootReducer } from "./src/reducers/rootReducer";

import { LobbyView } from "./src/LobbyView";
import { GameView } from "./src/GameView";
import { BackendProvider } from "./BackendContext";

// TS declaration for making redux devtools extension stop complaining in createStore below.
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: typeof compose;
  }
}

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <BackendProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Lobby" component={LobbyView} />
            <Stack.Screen name="GameView" component={GameView} />
          </Stack.Navigator>
        </NavigationContainer>
      </BackendProvider>
    </Provider>
  );
};

export default App;
