import React from "react";
import { View } from "react-native";
import styled from "styled-components";
import { FieldTile } from "./FieldTile";
import _ from "lodash";
import { Point, Player } from "./models";

interface Props {
  mines: Record<string, boolean>;
}

const countNeighbours = (
  center: Point,
  grid: Record<string, boolean>
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

const isMine = (point: Point, grid: Record<string, boolean>) => {
  return grid[JSON.stringify(point)];
};

export const Grid = ({ mines }: Props) => {
  console.log("grid", JSON.stringify(mines));

  return (
    <View>
      {[...Array(16).keys()].map(x => {
        return (
          <Row key={x}>
            {[...Array(16).keys()].map(y => {
              return (
                <FieldTile
                  key={`${x},${y}`}
                  isOpen={true}
                  neighbours={countNeighbours(new Point(x, y), mines)}
                  isMine={isMine(new Point(x, y), mines)}
                  clickedBy={_.sample([Player.BLUE, Player.RED])}
                />
              );
            })}
          </Row>
        );
      })}
    </View>
  );
};

const Row = styled.View`
  display: flex;
  flex-direction: row;
`;
