import React from "react";
import { View, Text, Image } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { PlayerIcon, PlayerNameText, PressText } from "./common";
import styled from "styled-components";

interface Props {
  onPress: () => void;
  userName: string;
  rating: string;
  country: string;
  picture: any;
  bold?: boolean;
}
export const PlayerRow = ({
  onPress,
  userName,
  rating,
  country,
  picture,
  bold = false
}: Props) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <PlayerRowContainer>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <PlayerIcon source={{ uri: picture }} />
          <PlayerNameText style={{ fontWeight: bold ? "bold" : "400" }}>
            {userName}
          </PlayerNameText>
        </View>
        <PressText>Challenge ></PressText>
      </PlayerRowContainer>
    </TouchableWithoutFeedback>
  );
};

const PlayerRowContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 5px;
  align-items: center;
`;
