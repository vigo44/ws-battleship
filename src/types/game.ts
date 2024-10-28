import { ShipType } from "./ship";

export type GameType = {
  idGame: IdGameType;
  masterPlayer: PlayerTypeWithField;
  slavePlayer: PlayerTypeWithField;
  turn: IdPlayerType;
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
  amountShot: number;
};

export type FieldType = CellType[][];

export type GameCreateDataType = {
  idGame: IdGameType;
  idPlayer: IdPlayerType;
};

export type GameStartDataType = {
  ships: ShipType[];
  currentPlayerIndex: IdPlayerType;
};
export type StatusType = "miss" | "killed" | "shot" | "nonShot";
export type CellType = [type: number, status: StatusType];

export type AttackDataType = {
  gameId: IdGameType;
  x: number;
  y: number;
  indexPlayer: IdPlayerType;
};

export type ShotType = {
  position: {
    x: number;
    y: number;
  };
  currentPlayer: IdPlayerType;
  status: StatusType;
};
