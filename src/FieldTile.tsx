import React, { useContext } from "react";
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Dimensions
} from "react-native";
import { useSelector } from "react-redux";
import Unknown from "../assets/classic-minesweeper-res/unknown.png";
import BlueFlag from "../assets/classic-minesweeper-res/m1.png";
import RedFlag from "../assets/classic-minesweeper-res/m2.png";
import Empty from "../assets/classic-minesweeper-res/0.png";
import One from "../assets/classic-minesweeper-res/1.png";
import Two from "../assets/classic-minesweeper-res/2.png";
import Three from "../assets/classic-minesweeper-res/3.png";
import Four from "../assets/classic-minesweeper-res/4.png";
import Five from "../assets/classic-minesweeper-res/5.png";
import Six from "../assets/classic-minesweeper-res/6.png";
import Seven from "../assets/classic-minesweeper-res/7.png";
import Eight from "../assets/classic-minesweeper-res/8.png";
import { Player } from "./models";
import { FieldType, Field } from "./reducers/gameReducer";
import { Backend } from "./backend";
import { BackendContext } from "../BackendContext";

interface Props {
  x: number;
  y: number;
}

const fieldTypeToResouceMap = {
  [FieldType.Empty]: Empty,
  [FieldType.Unknown]: Unknown,
  [FieldType.One]: One,
  [FieldType.Two]: Two,
  [FieldType.Three]: Three,
  [FieldType.Four]: Four,
  [FieldType.Five]: Five,
  [FieldType.Six]: Six,
  [FieldType.Seven]: Seven,
  [FieldType.Eight]: Eight
};

export const FieldTile = ({ x, y }: Props) => {
  const Backend: Backend = useContext(BackendContext);
  const gameId = useSelector(state => state.gameState.gameId);
  const field = useSelector(state => state.gameState.fields[y][x]);
  let Icon = fieldTypeToResouceMap[field.fieldType];
  const smallestScreenDimention = Math.min(
    Dimensions.get("window").width,
    Dimensions.get("window").height
  );
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        console.log("tilePressed", x, y, gameId);
        Backend.send(`WEAP ${gameId} ${x} ${y} P`);
      }}
    >
      <View>
        <Image
          style={{
            width: smallestScreenDimention / 16,
            height: smallestScreenDimention / 16
          }}
          source={Icon}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};
