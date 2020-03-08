import _ from "lodash";

import { PLAY } from "./lobbyReducer";
import { Point } from "../models";

export const FDAT = "FDAT";
export const GAME = "GAME";

export enum FieldType {
  Unknown,
  Empty,
  Mine,
  One,
  Two,
  Three,
  Four,
  Five,
  Six,
  Seven,
  Eight
}

const fieldValueFromNumber = (number: number) => {
  const map = {
    0: FieldType.Empty,
    1: FieldType.One,
    2: FieldType.Two,
    3: FieldType.Three,
    4: FieldType.Four,
    5: FieldType.Five,
    6: FieldType.Six,
    7: FieldType.Seven,
    8: FieldType.Eight
  };
  return map[number];
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
  fields: Field[][];
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
  fields: initialTilesState()
};

export const gameReducer = (state = initialGameState, action) => {
  if (action.type == "GAME" || action.type == "FDAT") {
    console.log("GameReducer running", action.type, action);
  }

  switch (action.type) {
    case GAME:
      console.log("GAME", action);
      return { ...state, gameId: action.payload.gameId };
    case FDAT:
      const fdatValues: string = action.payload.values;
      const number = fdatValues.substring(2); // The number of the field, i.e. neighbours
      const isMine = fdatValues.substring(1, 2); // Is it a mine
      const fieldType = fdatValues.substring(0, 1); // The state of the field 0:unpressed, 1:pressed, 2:blocked
      console.log("FDAT reducer", number, isMine, fieldType);

      const clickedPos = new Point(action.payload.x, action.payload.y);
      return {
        gameId: state.gameId,
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
                clickedBy: action.payload.playerIndex,
                fieldMark:
                  action.payload.type === "mark"
                    ? FieldMark.Mark
                    : FieldMark.Play,
                mine: isMine === "1",
                value: parseInt(number),
                pos: clickedPos
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
