import React, { useContext } from "react";
import { View, Text, Image } from "react-native";
import styled from "styled-components/native";
import { FieldTile } from "./FieldTile";
import _ from "lodash";
import { Point, Player } from "./models";
import { FieldType, Field } from "./reducers/gameReducer";
import { useSelector } from "react-redux";

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
  return (
    <View style={{ flexDirection: "column", flex: 1 }}>
      {[...Array(16).keys()].map(y => {
        return (
          <Row key={y}>
            {[...Array(16).keys()].map(x => {
              return <FieldTile x={x} y={y} key={x} />;
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
