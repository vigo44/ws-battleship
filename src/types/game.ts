export type GameType = {
  idGame: number | string;
  masterPlayer: PlayerType;
  slavePlayer: PlayerType;
};

type PlayerType = {
  idPlayer: number | string;
  index: number | string;
};

export type GameCreateDataType = {
  idGame: number | string;
  idPlayer: number | string;
};
