import React, { useContext, useCallback } from "react";
import {
  View,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
  ViewStyle
} from "react-native";
import { useSelector } from "react-redux";
// import Unknown from "./res/classic-minesweeper-res/unknown.png";
import { FieldType, FieldMark } from "./reducers/gameReducer";
import { BackendContext, useBackend } from "../BackendContext";
import { StoreState } from "./reducers/rootReducer";

interface Props {
  x: number;
  y: number;
}

const fieldTypeToResouceMap: Record<FieldType, { uri: string }> = {
  [FieldType.Empty]: { uri: "tile_0" },
  [FieldType.Unknown]: { uri: "tile_unknown" },
  [FieldType.One]: { uri: "tile_1" },
  [FieldType.Two]: { uri: "tile_2" },
  [FieldType.Three]: { uri: "tile_3" },
  [FieldType.Four]: { uri: "tile_4" },
  [FieldType.Five]: { uri: "tile_5" },
  [FieldType.Six]: { uri: "tile_6" },
  [FieldType.Seven]: { uri: "tile_7" },
  [FieldType.Eight]: { uri: "tile_8" },
  [FieldType.Mine]: { uri: "tile_flag_red" }
};

const gameIdSelector = (state: StoreState) => state.gameState.gameId;

const smallestScreenDimention = Math.min(
  Dimensions.get("window").width,
  Dimensions.get("window").height
);

export const FieldTile = ({ x, y }: Props) => {
  const Backend = useBackend();
  const gameId = useSelector(gameIdSelector);
  const field = useSelector(
    useCallback((state: StoreState) => state.gameState.fields[y][x], [x, y])
  );
  const lastPressedPositions = useSelector(
    (state: StoreState) => state.lastPressesState
  );
  const isLastPressed = lastPressedPositions.find(
    pos => pos && pos.x === field.pos.x && pos.y === field.pos.y
  );
  const isLastPressedByPlayer = lastPressedPositions.findIndex(
    pos => pos && pos.x === field.pos.x && pos.y === field.pos.y
  );

  let Icon = fieldTypeToResouceMap[field.fieldType];

  if (field.mine) {
    switch (field.clickedBy) {
      case 0:
        Icon = { uri: "tile_flag_blue" };
        break;
      case 1:
        Icon = { uri: "tile_flag_red" };
        break;
      default:
        Icon = { uri: "tile_mine" };
        break;
    }
  }

  const borderStyle: ViewStyle = {
    borderWidth: 2,
    borderColor: isLastPressedByPlayer === 0 ? "blue" : "red",
    backgroundColor: "transparent",
    width: smallestScreenDimention / 16,
    height: smallestScreenDimention / 16,
    position: "absolute"
  };

  const isFieldMark = field.fieldMark === FieldMark.Mark;

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
        {isLastPressed && <View style={borderStyle}></View>}
      </View>
    </TouchableWithoutFeedback>
  );
};
