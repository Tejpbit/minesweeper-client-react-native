import React, { useRef, useCallback } from "react";
import { View, Dimensions, Button, Animated, Text } from "react-native";
import {
  ScrollView,
  PinchGestureHandler,
  State,
  PanGestureHandler
} from "react-native-gesture-handler";
// import ReactNativeZoomableView from "@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView";
import { Grid } from "./Grid";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { StoreState } from "./reducers/rootReducer";

const clamp = (value: number, low: number, high: number) => {
  return Math.min(high, Math.max(low, value));
};

interface Props {
  contentWidth: number;
  contentHeight: number;
}
const selectGameId = (state: StoreState) => state.gameState.gameId;
const selectFields = (state: StoreState) => state.gameState.fields;
const selectScores = (state: StoreState) => state.gameState.scores;
const selectPlayers = (state: StoreState) => state.gameState.players;

export const GameView = ({ contentWidth, contentHeight }: Props) => {
  const dispatch = useDispatch();
  const setZoomRef = useRef();
  const gameId = useSelector(selectGameId);
  const fields = useSelector(selectFields);
  const scores = useSelector(selectScores);
  const players = useSelector(selectPlayers);
  const gameOver = useSelector((state: StoreState) => state.gameState.gameOver);
  console.log("GameId gameview", gameId);

  return (
    <>
      <Text>Gameid: {gameId}</Text>
      <Text>Player1: {scores[0]}</Text>
      <Text>Player2: {scores[1]}</Text>
      <Text>GameOver: {gameOver}</Text>
      <Button
        title="print"
        onPress={() => {
          fields.forEach(row => {
            console.log("GameRow", row.map(f => f.value).join(""));
          });
        }}
      />
      <ScrollView
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
          width: "100%"
        }}
        zoomScale={0.5}
        contentInset={{ left: 100, right: 100 }}
        centerContent //centers content when zoom is less than scroll view bounds
        maximumZoomScale={2}
        minimumZoomScale={1}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        // ref={this.setZoomRef} //helps us get a reference to this ScrollView instance
        style={{ overflow: "hidden" }}
      >
        <Grid />
      </ScrollView>
    </>
  );
};
