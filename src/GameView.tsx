import React, { useReducer, useEffect } from "react";
import { View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ReactNativeZoomableView from "@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView";
import { Grid } from "./Grid";
import _ from "lodash";
import { Point } from "./models";

function gridReducer(state: Record<string, boolean>, action) {
  switch (action.type) {
    case "set_mine":
      return { ...state, [JSON.stringify(action.position)]: true };
    default:
      return state;
  }
}
const initialGrid: Record<string, boolean> = {};

interface Props {}
export const GameView = ({}: Props) => {
  const [grid, dispatchGrid] = useReducer(gridReducer, initialGrid);

  useEffect(() => {
    let numbers = _.take(_.shuffle([...Array(256).keys()]), 51);

    numbers.forEach((n: number) => {
      let x = n % 16;
      let y = Math.floor(n / 16);
      dispatchGrid({ type: "set_mine", position: new Point(x, y) });
    });
  }, []);
  return (
    <View>
      <ScrollView style={{}}>
        <ReactNativeZoomableView
          maxZoom={2.0}
          minZoom={0.65}
          zoomStep={0.5}
          initialZoom={0.65}
          bindToBorders={true}
          onZoomAfter={() => {}}
          movementSensibility={1}
          style={{}}
        >
          <Grid mines={grid} />
        </ReactNativeZoomableView>
      </ScrollView>
    </View>
  );
};
