import { OutputMessageType } from "../constants/message";
import { emitter } from "../emmiter/emmiter";
import { GameCreateDataType, GameType, IdGameType, IdPlayerType, PlayerTypeWithField } from "../types/game";
import { ShipType } from "../types/ship";
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

  public findGameForResponse(user: UserWithoutPasswordType): GameCreateDataType | null {
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

  public findIdGame(user: UserWithoutPasswordType): string | number | null {
    const findGame = this.games.find((item) => {
      return item.masterPlayer.index === user.index || item.slavePlayer.index === user.index;
    });
    if (findGame) {
      return findGame.idGame;
    }
    return null;
  }

  public findGame(idGame: IdGameType | null): GameType | null {
    if (idGame) {
      return this.games.find((item) => item.idGame === idGame) ?? null;
    }
    return null;
  }

  public findMyIdPlayer(user: UserWithoutPasswordType): IdPlayerType | null {
    const game = this.findGame(this.findIdGame(user));
    if (game) {
      return game.masterPlayer.index === user.index ? game.masterPlayer.idPlayer : game.slavePlayer.idPlayer;
    }
    return null;
  }

  public findEnemyIdPlayer(user: UserWithoutPasswordType): IdPlayerType | null {
    const game = this.findGame(this.findIdGame(user));
    if (game) {
      return game.masterPlayer.index === user.index ? game.slavePlayer.idPlayer : game.masterPlayer.idPlayer;
    }
    return null;
  }

  public getPlayer(idGame: IdGameType, idPlayer: IdPlayerType): PlayerTypeWithField | null {
    const game = this.findGame(idGame);
    if (game) {
      return game.masterPlayer.idPlayer === idPlayer
        ? game.masterPlayer
        : game.slavePlayer.idPlayer === idPlayer
        ? game.slavePlayer
        : null;
    }
    return null;
  }

  private checkCreateFields(idGame: IdGameType) {
    const game = this.findGame(idGame);
    if (game && game.slavePlayer.ships && game.masterPlayer.ships) {
      return game.slavePlayer.ships && game.masterPlayer.ships;
    }
  }

  public createField(idGame: IdGameType, idPlayer: IdPlayerType, ships: ShipType[]) {
    const player = this.getPlayer(idGame, idPlayer);
    if (player) {
      player.ships = ships;
    }
    const game = this.findGame(idGame);
    if (game && game.slavePlayer.ships && game.masterPlayer.ships) {
      emitter.emit(OutputMessageType.Start_game, game);
    }
  }
}

export const gamesDB = new Games();
