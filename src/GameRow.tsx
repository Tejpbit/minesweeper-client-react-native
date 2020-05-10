import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { PlayerIcon, PlayerNameText, PressText } from "./common";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { GameStatus } from "./reducers/lobbyReducer";

interface GameRowProps extends GameStatus {
  onPress: () => void;
  pressText: string;
}
export const GameRow = ({
  onPress,
  pressText,
  gameId,
  users,
  scores,
  timestamp,
  currentPlayerIndex
}: GameRowProps) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 5,
          marginHorizontal: 10
        }}
      >
        <View style={{ flex: 1 }}>
          <PlayerRow>
            <PlayerIconBox>
              <PlayerIcon source={require("../assets/guest_profile_pic.png")} />
              <PlayerNameText>{users[0]}</PlayerNameText>
            </PlayerIconBox>
            <ScoreText>{scores[0]}</ScoreText>
          </PlayerRow>
          <PlayerRow>
            <PlayerIconBox>
              <PlayerIcon
                source={require("../assets/guest_profile_pic.png")}
                style={{}}
              />
              <PlayerNameText>{users[1]}</PlayerNameText>
            </PlayerIconBox>
            <ScoreText>{scores[1]}</ScoreText>
          </PlayerRow>
        </View>
        <View>
          <PressText style={{ fontSize: 18 }}>{pressText} ></PressText>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const PlayerIconBox = styled.View`
  display: flex;
  flex-direction: row;
`;

const ScoreText = styled.Text`
  margin-right: 10px;
`;

const PlayerRow = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
