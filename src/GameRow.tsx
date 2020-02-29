import React from "react";
import { View } from "react-native";
import styled from "styled-components";
import { PlayerIcon, PlayerNameText, PressText } from "./common";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

interface GameRowProps {
  onPress: () => void;
  pressText: string;
}
export const GameRow = ({ onPress, pressText }: GameRowProps) => {
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
              <PlayerNameText>guest_v65507</PlayerNameText>
            </PlayerIconBox>
            <ScoreText>22</ScoreText>
          </PlayerRow>
          <PlayerRow>
            <PlayerIconBox>
              <PlayerIcon
                source={require("../assets/guest_profile_pic.png")}
                style={{}}
              />
              <PlayerNameText>Loser</PlayerNameText>
            </PlayerIconBox>
            <ScoreText>23</ScoreText>
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
