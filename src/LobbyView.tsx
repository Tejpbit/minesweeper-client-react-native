import React, { useReducer, useContext } from "react";
import { View, Text, Button, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import { GameRow } from "./GameRow";
import { Divider } from "./common";
import { PlayerRow } from "./PlayerRow";
import { ScrollView } from "react-native-gesture-handler";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../assets/home.svg";
import Chat from "../assets/chat.svg";
import { ChatView } from "./ChatView";
import { useSelector } from "react-redux";
import { LobbyState, User } from "./reducers/lobbyReducer";
import { FieldTile } from "./FieldTile";
import { FieldType, FieldMark } from "./reducers/gameReducer";
import { StoreState } from "./reducers/rootReducer";
import { BackendContext, useBackend } from "../BackendContext";
import { ConnectionStatus } from "./reducers/connectionReducer";

const Tab = createBottomTabNavigator();

export const LobbyView = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Games"
        component={LobbyGamesAndPlayers}
        options={{ tabBarIcon: Home }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatView}
        options={{ tabBarIcon: Chat }}
      />
    </Tab.Navigator>
  );
};

const selectConnectionStatus = (state: StoreState) =>
  state.connectionState.connectionStatus;

const LobbyGamesAndPlayers = () => {
  const navigation = useNavigation();
  const lobbyState: LobbyState = useSelector(
    (state: StoreState) => state.lobbyState
  );
  const userState: User = useSelector((state: StoreState) => state.userState);
  const connectionStatus = useSelector(selectConnectionStatus);
  const backend = useBackend();

  return (
    <View>
      <Text>
        {connectionStatus === ConnectionStatus.CONNECTED
          ? "Connected"
          : "Disconnected"}
      </Text>
      <ScrollView>
        <Header>Your Games</Header>
        {Object.values(lobbyState.games)
          .filter(g => g.users.includes(userState.userName))
          .map(g => (
            <GameRow
              key={g.gameId}
              {...g}
              onPress={() => {
                navigation.navigate("GameView");
                console.log("Resuming game", g.gameId);

                backend.send(`RESU ${g.gameId}`);
              }}
              pressText="Resume"
            />
          ))}
        <Button
          title="asd"
          onPress={() => {
            navigation.navigate("GameView");
          }}
        />
        <Header>Online Players</Header>
        {Object.values(lobbyState.onlinePlayers).map(onlinePlayer => (
          <PlayerRow
            bold={onlinePlayer.userName == userState.userName}
            key={onlinePlayer.userId}
            {...onlinePlayer}
            onPress={() => backend.send(`INVT ${onlinePlayer.userName}`)}
          />
        ))}
        <Header>Online AIs</Header>
        {Object.values(lobbyState.onlineAIs).map(onlineAI => (
          <PlayerRow
            key={onlineAI.userId}
            {...onlineAI}
            onPress={() => {
              backend.send(`INVT ${onlineAI.userName}`);
            }}
          />
        ))}

        <Header>Other Games</Header>
        {Object.values(lobbyState.games)
          .filter(g => !g.users.includes(userState.userName))
          .map(g => (
            <GameRow
              key={g.gameId}
              {...g}
              onPress={() => navigation.navigate("GameView")}
              pressText="Observe"
            />
          ))}
      </ScrollView>
    </View>
  );
};

const Header = styled.Text`
  background-color: #1976d2;
  color: white;
  font-size: 28px;
  padding-left: 20px;
`;
