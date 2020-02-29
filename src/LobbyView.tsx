import React, { useReducer, useContext } from "react";
import { View, Text, Button, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components";
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
import { BackendContext } from "../App";
import { Backend } from "./backend";

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

const LobbyGamesAndPlayers = () => {
  const navigation = useNavigation();
  const lobbyState: LobbyState = useSelector(state => state.lobbyState);
  const userState: User = useSelector(state => state.userState);

  const backend: Backend = useContext(BackendContext);

  return (
    <View>
      <ScrollView>
        <Header>Your Games</Header>
        {lobbyState.games
          .filter(g => g.players.includes(userState.userName))
          .map(g => (
            <>
              <GameRow
                onPress={() => navigation.navigate("GameView")}
                pressText="Resume"
              />
              <Divider />
            </>
          ))}
        <Header>Online Players</Header>
        {Object.values(lobbyState.onlinePlayers).map(onlinePlayer => (
          <PlayerRow
            bold={onlinePlayer.userName == userState.userName}
            key={onlinePlayer.userId}
            {...onlinePlayer}
            onPress={() => navigation.navigate("GameView")}
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
        <GameRow
          onPress={() => navigation.navigate("GameView")}
          pressText="Observe"
        />
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
