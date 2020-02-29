import React from "react";
import { View, Text, Image } from "react-native";
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

interface Props {
  neighbours: number;
  isOpen: boolean;
  isMine: boolean;
  clickedBy: Player;
}

const numbersToIconMap = {
  0: Empty,
  1: One,
  2: Two,
  3: Three,
  4: Four,
  5: Five,
  6: Six,
  7: Seven,
  8: Eight
};

export const FieldTile = ({ neighbours, isMine, isOpen, clickedBy }: Props) => {
  let Icon = numbersToIconMap[neighbours];

  if (isMine && isOpen) {
    Icon = clickedBy === Player.BLUE ? BlueFlag : RedFlag;
  }

  return (
    <View>
      <Image style={{ width: 50, height: 50 }} source={Icon} />
    </View>
  );
};
