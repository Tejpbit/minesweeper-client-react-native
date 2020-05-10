import _ from "lodash";

import { PLAY, LIST } from "./lobbyReducer";
import { Point } from "../models";

export const FDAT = "FDAT";
export const GAME = "GAME";
export const GAME_OVER = "GAME_OVER";

export enum FieldType {
  Unknown,
  One,
  Two,
  Three,
  Four,
  Five,
  Six,
  Seven,
  Eight,
  Mine,
  Empty
}

const fieldValueFromNumber = (number: number) => {
  const map = [
    FieldType.Empty,
    FieldType.One,
    FieldType.Two,
    FieldType.Three,
    FieldType.Four,
    FieldType.Five,
    FieldType.Six,
    FieldType.Seven,
    FieldType.Eight
  ];
  return map[number] || FieldType.Empty;
};

export enum FieldMark {
  Mark,
  Play
}

export interface Field {
  clickedBy: number; //Player index
  fieldType: FieldType;
  fieldMark: FieldMark;
  mine: boolean;
  value: number;
  pos: Point;
}

export interface Game {
  gameId: number;
  players: [string, string];
  lastPresses: [Point | null, Point | null];
  scores: [number, number];
  fields: Field[][];
  gameOver: false;
}

const initialTilesState = (): Field[][] => {
  const fields = [];
  for (let y = 0; y < 16; y++) {
    const fieldRow = [];
    for (let x = 0; x < 16; x++) {
      const field: Field = {
        fieldType: FieldType.Unknown,
        clickedBy: -1,
        fieldMark: FieldMark.Play, // mark. highlight with the players color. play normal nothing
        mine: false,
        value: -1,
        pos: new Point(x, y)
      };
      fieldRow.push(field);
    }
    fields.push(fieldRow);
  }
  return fields;
};

const initialGameState: Game = {
  gameId: -1,
  players: ["", ""],
  lastPresses: [null, null],
  scores: [0, 0],
  fields: initialTilesState(),
  gameOver: false
};

export const gameReducer = (state = initialGameState, action: any) => {
  switch (action.type) {
    case PLAY:
      return {
        ...state,
        gameId: action.payload.gameId,
        players: [action.payload.player1, action.payload.player2]
      };
    case GAME:
      return { ...state, gameId: action.payload.gameId };
    case GAME_OVER:
      return {
        ...state,
        gameOver: true
      };
    case LIST:
      return {
        ...state,
        scores: action.payload.scores
      };
    case FDAT:
      const clickedPos = new Point(action.payload.x, action.payload.y);
      const fdatValues: string = action.payload.values;
      const number = fdatValues.substring(2); // The number of the field, i.e. neighbours
      const isMine = fdatValues.substring(1, 2) === "1"; // Is it a mine
      const fieldType = fdatValues.substring(0, 1); // The state of the field 0:unpressed, 1:pressed, 2:blocked
      const playerIndex = parseInt(action.payload.playerIndex);
      const lastPresses = [...state.lastPresses];
      lastPresses[playerIndex] = clickedPos;
      // varför kan playerIndex bli 3
      return {
        ...state,
        lastPresses,
        fields: state.fields.map((row, y) => {
          return row.map((cell, x) => {
            if (
              parseInt(action.payload.x) === x &&
              parseInt(action.payload.y) === y
            ) {
              return {
                fieldType:
                  fieldType === "0" // 0 is unpressed. 2(blocked) is not supported
                    ? FieldType.Unknown
                    : fieldValueFromNumber(parseInt(number)),
                clickedBy: parseInt(action.payload.playerIndex),
                fieldMark:
                  action.payload.type === "mark"
                    ? FieldMark.Mark
                    : FieldMark.Play,
                mine: isMine,
                value: parseInt(number),
                pos: clickedPos
              };
            } else if (state.lastPresses.includes(new Point(x, y))) {
              return {
                ...state.fields[y][x],
                fieldMark: FieldMark.Play
              };
            }
            return cell;
          });
        })
      };
    // const newFields = [...state.fields];
    // newFields[action.payload.y][action.payload.x] = {
    //   fieldType:
    //     fieldType === "0" // 0 is unpressed. 2(blocked) is not supported
    //       ? FieldType.Unknown
    //       : fieldValueFromNumber(parseInt(number)),
    //   clickedBy: action.payload.playerIndex,
    //   fieldMark:
    //     action.payload.type === "mark" ? FieldMark.Mark : FieldMark.Play,
    //   mine: isMine === "1",
    //   value: parseInt(number),
    //   pos: clickedPos
    // };
    // return {
    //   ...state,
    //   fields: newFields
    // };

    default:
      return state;
  }
};
