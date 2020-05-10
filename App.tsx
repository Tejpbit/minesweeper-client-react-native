import "react-native-gesture-handler";
import React from "react";
import _ from "lodash";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Provider } from "react-redux";
import { compose, createStore, applyMiddleware } from "redux";
import { rootReducer } from "./src/reducers/rootReducer";

import { LobbyView } from "./src/LobbyView";
import { GameView } from "./src/GameView";
import { BackendProvider } from "./BackendContext";
import logger from "redux-logger";
import { StatusBar } from "react-native";

// TS declaration for making redux devtools extension stop complaining in createStore below.
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: typeof compose;
  }
}
// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),

const store = createStore(rootReducer, applyMiddleware(logger));
// @ts-ignore
window.store = store;
const Stack = createStackNavigator();
// const backend = new Backend("stats.zomis.net:8083", dispatch)

const App = () => {
  return (
    <Provider store={store}>
      <BackendProvider>
        <StatusBar barStyle="dark-content" />
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
