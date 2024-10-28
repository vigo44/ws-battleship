import { IdGameType, IdPlayerType } from "./game";

export type ShipType = unknown;

export type AddShipsDataType = {
  gameId: IdGameType;
  ships: ShipType[];
  indexPlayer: IdPlayerType;
};
