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
export const GameView = ({ contentWidth, contentHeight }: Props) => {
  const dispatch = useDispatch();
  const setZoomRef = useRef();
  const gameId = useSelector((state: StoreState) => state.gameState.gameId);
  const fields = useSelector((state: StoreState) => state.gameState.fields);
  return (
    <>
      <Text>{gameId}</Text>
      <Button
        title="print"
        onPress={() => {
          console.log();

          fields.forEach(row => {
            console.log("GameRow", row.map(f => f.value).join(""));
          });
          console.log();
        }}
      />
      <Button
        title="Set random thingymajig"
        onPress={() => {
          const x = Math.floor(Math.random() * 4);
          const y = Math.floor(Math.random() * 4);
          const number = Math.floor(Math.random() * 9);
          dispatch({
            type: "FDAT",
            payload: {
              gameId: "lol",
              x: `${x}`,
              y: `${y}`,
              type: "play",
              playerIndex: "0",
              values: `10${number}`
            }
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

  // const gameState = useSelector((s: StoreState) => s.gameState);
  const contentRef = useRef();
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;

  const baseScale = useRef(new Animated.Value(1));
  const pinchScale = useRef(new Animated.Value(1));
  const scale = useRef(
    Animated.multiply(baseScale.current, pinchScale.current)
  );

  const lastScale = useRef(1);
  const translation = useRef(new Animated.ValueXY({ x: 0, y: 0 }));
  // translation.current.x.interpolate()
  const currentPos = useRef({ x: 0, y: 0 });

  const onZoomEvent = useCallback(
    Animated.event(
      [
        {
          nativeEvent: {
            scale: pinchScale.current
          }
        }
      ],
      {
        useNativeDriver: true
      }
    ),
    []
  );

  const onPanEvent = useCallback(
    Animated.event(
      [
        {
          nativeEvent: {
            translationX: translation.current.x,
            translationY: translation.current.y
          }
        }
      ],
      {
        useNativeDriver: true
      }
    ),
    []
  );

  const onPinchStateChange = useCallback(event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      lastScale.current *= event.nativeEvent.scale;
      baseScale.current.setValue(lastScale.current);
      pinchScale.current.setValue(1);
    }
  }, []);

  const onPanStateChange = useCallback(event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      currentPos.current.x = clamp(
        currentPos.current.x + event.nativeEvent.translationX,
        0,
        screenWidth - contentWidth
      );
      currentPos.current.y = clamp(
        currentPos.current.y + event.nativeEvent.translationY,
        0,
        screenHeight - contentHeight
      );

      translation.current.x.setOffset(currentPos.current.x);
      translation.current.x.setValue(0);
      translation.current.y.setOffset(currentPos.current.y);
      translation.current.y.setValue(0);
    }
  }, []);

  const pinchRef = useRef();
  const panRef = useRef();
  return (
    <PinchGestureHandler
      ref={pinchRef}
      simultaneousHandlers={panRef}
      onGestureEvent={onZoomEvent}
      onHandlerStateChange={onPinchStateChange}
    >
      <Animated.View style={{ flex: 1 }}>
        <PanGestureHandler
          ref={panRef}
          simultaneousHandlers={pinchRef}
          onGestureEvent={onPanEvent}
          onHandlerStateChange={onPanStateChange}
        >
          <Animated.View
            style={{
              flex: 1
            }}
          >
            <Animated.View
              style={{
                transform: [
                  {
                    translateX: Animated.add(
                      translation.current.x,
                      currentPos.current.x
                    ).interpolate({
                      inputRange: [0, screenWidth - contentWidth],
                      outputRange: [0, screenWidth - contentWidth],
                      extrapolate: "clamp"
                    })
                  },
                  {
                    translateY: Animated.add(
                      translation.current.y,
                      currentPos.current.y
                    ).interpolate({
                      inputRange: [0, screenHeight - contentHeight],
                      outputRange: [0, screenHeight - contentHeight],
                      extrapolate: "clamp"
                    })
                  },
                  { scale: scale.current }
                ]
              }}
            >
              <Animated.View>
                <View
                  ref={contentRef}
                  style={{
                    flexDirection: "row",
                    backgroundColor: "green",
                    width: 150,
                    height: 150
                  }}
                ></View>
              </Animated.View>
            </Animated.View>
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
    </PinchGestureHandler>
  );

  // return (
  //   <ReactNativeZoomableView
  //     maxZoom={1.5}
  //     minZoom={0.5}
  //     initialZoom={0.9}
  //     zoomEnabled={true}
  //     // maxZoom={2.0}
  //     // minZoom={0.65}
  //     zoomStep={0.05}
  //     // initialZoom={2}
  //     style={{ backgroundColor: "pink" }}
  //   >
  //     {/* <Button
  //       title="print"
  //       onPress={() => {
  //         console.log();

  //         gameState.fields.forEach(row => {
  //           console.log("GameRow", row.map(f => f.value).join(""));
  //         });
  //         console.log();
  //       }}
  //     /> */}
  //     {/* <Button
  //       title="Set random thingymajig"
  //       onPress={() => {
  //         const x = Math.floor(Math.random() * 4);
  //         const y = Math.floor(Math.random() * 4);
  //         const number = Math.floor(Math.random() * 9);
  //         dispatch({
  //           type: "FDAT",
  //           payload: {
  //             gameId: "lol",
  //             x,
  //             y,
  //             type: FieldMark.Play,
  //             playerIndex: 0,
  //             values: `10${number}`
  //           }
  //         });
  //       }}
  //     /> */}
  //     <Grid />
  //   </ReactNativeZoomableView>
  // );
};
