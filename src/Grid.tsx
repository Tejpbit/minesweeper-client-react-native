import React, { useContext } from "react";
import { View, Text, Image } from "react-native";
import styled from "styled-components";
import { FieldTile } from "./FieldTile";
import _ from "lodash";
import { Point, Player } from "./models";
import { Backend } from "./backend";
import { FieldType, Field } from "./reducers/gameReducer";
import { useSelector } from "react-redux";
import Imageyees from "../assets/guest_profile_pic.png";

interface Props {}

const countNeighbours = (
  center: Point,
  grid: Record<string, Field>
): number => {
  const neighbours = [
    center.add(new Point(1, 1)),
    center.add(new Point(1, 0)),
    center.add(new Point(1, -1)),
    center.add(new Point(0, -1)),
    center.add(new Point(-1, -1)),
    center.add(new Point(-1, 0)),
    center.add(new Point(-1, 1)),
    center.add(new Point(0, 1))
  ];

  return neighbours.filter(n => grid[JSON.stringify(n)]).length;
};
const fieldToKey = (field: Field) => {
  return `${field.pos}${field.value}${field.mine}${field.fieldType}${field.fieldMark}`;
};

export const Grid = React.memo(() => {
  // const fields = useSelector(state => state.gameState.fields);

  // return fields.map((f, y) => {
  //   return (
  //     <FlatList
  //       horizontal={true}
  //       data={f}
  //       renderItem={({ item, index: x }) => (
  //         <FieldTile x={x} y={y} key={`${x}:${y}`} />
  //       )}
  //     />
  //   );
  // });
  // return <Image source={Imageyees} />;

  return (
    <View style={{ flexDirection: "column", flex: 1 }}>
      {[...Array(16).keys()].map(y => {
        return (
          <Row key={`${y}`}>
            {[...Array(16).keys()].map(x => {
              return <FieldTile x={x} y={y} key={`${x}:${y}`} />;
            })}
          </Row>
        );
      })}
    </View>
  );
});

const Row = styled.View`
  display: flex;
  flex-direction: row;
`;
