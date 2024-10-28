import { IdGameType, IdPlayerType } from "./game";

export type ShipType = {
  position: {
    x: number;
    y: number;
  };
  direction: boolean;
  length: number;
  type: "small" | "medium" | "large" | "huge";
};

export type AddShipsDataType = {
  gameId: IdGameType;
  ships: ShipType[];
  indexPlayer: IdPlayerType;
};
