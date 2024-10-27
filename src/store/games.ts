import { OutputMessageType } from "../constants/message";
import { emitter } from "../emmiter/emmiter";
import { GameCreateDataType, GameType } from "../types/game";
import { UserWithoutPasswordType } from "../types/user";
import { randomUUID } from "node:crypto";

class Games {
  private games: GameType[] = [];

  public createGame([master, slave]: UserWithoutPasswordType[]) {
    const newGame = {
      idGame: randomUUID(),
      masterPlayer: { index: master.index, idPlayer: randomUUID() },
      slavePlayer: { index: slave.index, idPlayer: randomUUID() },
    };
    this.games = [...this.games, newGame];
    emitter.emit(OutputMessageType.CreateGame);
  }

  public findGame(user: UserWithoutPasswordType): GameCreateDataType | null {
    const findGame = this.games.find((item) => {
      return item.masterPlayer.index === user.index || item.slavePlayer.index === user.index;
    });
    if (findGame) {
      const responseGame = {
        idGame: findGame.idGame,
        idPlayer:
          findGame.masterPlayer.index === user.index ? findGame.masterPlayer.idPlayer : findGame.slavePlayer.idPlayer,
      };
      return responseGame;
    }
    return null;
  }
}

export const gamesDB = new Games();
