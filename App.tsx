import "react-native-gesture-handler";
import React, { useEffect, useState, createContext } from "react";
import _ from "lodash";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Provider, useDispatch } from "react-redux";
import { createStore } from "redux";
import { rootReducer } from "./src/reducers/rootReducer";

import { LobbyView } from "./src/LobbyView";
import { GameView } from "./src/GameView";
import { Backend } from "./src/backend";

const store = createStore(rootReducer);
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

export let BackendContext;

const BackendProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [backend, _setBackend] = useState(
    new Backend("stats.zomis.net:8083", dispatch)
  );

  BackendContext = createContext(backend);

  return (
    <BackendContext.Provider value={backend}>
      {children}
    </BackendContext.Provider>
  );
};

export default App;
