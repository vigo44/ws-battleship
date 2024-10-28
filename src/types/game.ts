import { ShipType } from "./ship";

export type GameType = {
  idGame: IdGameType;
  masterPlayer: PlayerTypeWithField;
  slavePlayer: PlayerTypeWithField;
};

type PlayerType = {
  idPlayer: IdPlayerType;
  index: number | string;
};

export type IdPlayerType = string | number;
export type IdGameType = string | number;

export type PlayerTypeWithField = PlayerType & {
  field?: FieldType;
  ships?: ShipType[];
};

export type FieldType = number[];

export type GameCreateDataType = {
  idGame: IdGameType;
  idPlayer: IdPlayerType;
};

export type GameStartDataType = {
  ships: ShipType[];
  currentPlayerIndex: IdPlayerType;
};
