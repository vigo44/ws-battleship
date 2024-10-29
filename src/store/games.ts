import { OutputMessageType } from "../constants/message";
import { emitter } from "../emmiter/emmiter";
import {
  AttackDataType,
  AttackRandomDataType,
  CellType,
  FieldType,
  GameCreateDataType,
  GameType,
  IdGameType,
  IdPlayerType,
  PlayerTypeWithField,
  ShotType,
  StatusType,
} from "../types/game";
import { ShipType } from "../types/ship";
import { UserWithoutPasswordType } from "../types/user";
import { randomUUID } from "node:crypto";
import { addShips } from "../utils/generateFields";
import { winnersDB } from "./winners";
import { usersDB } from "./users";
import { checkKilled } from "../utils/checkKilled";

class Games {
  private games: GameType[] = [];

  public createGame([master, slave]: UserWithoutPasswordType[]) {
    const idMaster = randomUUID();
    const newGame = {
      idGame: randomUUID(),
      masterPlayer: { index: master.index, idPlayer: idMaster, amountShot: 20 },
      slavePlayer: { index: slave.index, idPlayer: randomUUID(), amountShot: 20 },
      turn: idMaster,
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

  public getEnemyPlayer(idGame: IdGameType, idPlayer: IdPlayerType): PlayerTypeWithField | null {
    const game = this.findGame(idGame);
    if (game) {
      return game.masterPlayer.idPlayer === idPlayer
        ? game.slavePlayer
        : game.slavePlayer.idPlayer === idPlayer
        ? game.masterPlayer
        : null;
    }
    return null;
  }

  public createField(idGame: IdGameType, idPlayer: IdPlayerType, ships: ShipType[]) {
    const player = this.getPlayer(idGame, idPlayer);
    if (player) {
      player.ships = ships;
      player.field = addShips(ships);
    }
    const game = this.findGame(idGame);
    if (game && game.masterPlayer.ships && (game.slavePlayer.ships || game.slavePlayer.index === "bot")) {
      emitter.emit(OutputMessageType.Start_game, game);
    }
  }

  public turn(game: GameType, turn: IdPlayerType) {
    game.turn = turn;
  }

  private checkKilled(field: FieldType, x: number, y: number) {
    const ship = field[y][x][0];
    let flatField: CellType[] = [];
    field.forEach((item) => {
      flatField = [...flatField, ...item];
    });
    const filterShipCell = flatField.filter((item) => {
      return item[0] === ship;
    });
    const filterShot = filterShipCell.filter((item) => {
      return item[1] === "shot";
    });
    if (filterShipCell.length === filterShot.length) {
      filterShot.map(() => {
        return [ship, "killed"];
      });
      return "killed";
    }
    return "shot";
  }

  private findShipKilled(field: FieldType, ship: number, indexPlayer: IdPlayerType): ShotType[] {
    const shipKilled: ShotType[] = [];
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (field[i][j][0] === ship) {
          shipKilled.push({ position: { x: j, y: i }, currentPlayer: indexPlayer, status: "killed" });
          if (field[i - 1]?.[j]?.[0] === 0) {
            shipKilled.push({ position: { x: j, y: i - 1 }, currentPlayer: indexPlayer, status: "miss" });
            field[i - 1][j][1] = "miss";
          }
          if (field[i + 1]?.[j]?.[0] === 0) {
            shipKilled.push({ position: { x: j, y: i + 1 }, currentPlayer: indexPlayer, status: "miss" });
            field[i + 1][j][1] = "miss";
          }
          if (field[i]?.[j - 1]?.[0] === 0) {
            shipKilled.push({ position: { x: j - 1, y: i }, currentPlayer: indexPlayer, status: "miss" });
            field[i][j - 1][1] = "miss";
          }
          if (field[i]?.[j + 1]?.[0] === 0) {
            shipKilled.push({ position: { x: j + 1, y: i }, currentPlayer: indexPlayer, status: "miss" });
            field[i][j + 1][1] = "miss";
          }
          if (field[i - 1]?.[j - 1]?.[0] === 0) {
            shipKilled.push({ position: { x: j - 1, y: i - 1 }, currentPlayer: indexPlayer, status: "miss" });
            field[i - 1][j - 1][1] = "miss";
          }
          if (field[i + 1]?.[j + 1]?.[0] === 0) {
            shipKilled.push({ position: { x: j + 1, y: i + 1 }, currentPlayer: indexPlayer, status: "miss" });
            field[i + 1][j + 1][1] = "miss";
          }
          if (field[i + 1]?.[j - 1]?.[0] === 0) {
            shipKilled.push({ position: { x: j - 1, y: i + 1 }, currentPlayer: indexPlayer, status: "miss" });
            field[i + 1][j - 1][1] = "miss";
          }
          if (field[i - 1]?.[j + 1]?.[0] === 0) {
            shipKilled.push({ position: { x: j + 1, y: i - 1 }, currentPlayer: indexPlayer, status: "miss" });
            field[i - 1][j + 1][1] = "miss";
          }
        }
      }
    }
    return shipKilled;
  }

  public attack({ gameId, x, y, indexPlayer }: AttackDataType) {
    const player = this.getEnemyPlayer(gameId, indexPlayer);
    const game = this.findGame(gameId);
    let typeAttack: StatusType = "miss";
    if (game && game.turn === indexPlayer && player && player?.field) {
      const [ship, cellType] = player.field[y][x];
      if (cellType !== "nonShot") return;
      if (ship !== 0) {
        player.field[y][x][1] = "shot";
        typeAttack = this.checkKilled(player.field, x, y);
        player.amountShot--;
      } else {
        player.field[y][x][1] = typeAttack;
        this.turn(game, player.idPlayer);
      }
      const attackFeedBack: ShotType[] =
        typeAttack === "killed"
          ? this.findShipKilled(player.field, ship, indexPlayer)
          : [{ position: { x, y }, currentPlayer: indexPlayer, status: typeAttack }];
      if (player.amountShot === 0) {
        const index = this.getPlayer(gameId, indexPlayer)?.index;
        if (index) {
          const userWin = usersDB.findUserByIndex(index);
          if (userWin) {
            winnersDB.addNewWinner(userWin);
          }
        }
        emitter.emit(OutputMessageType.Finish, game, indexPlayer);
      } else {
        emitter.emit(OutputMessageType.AttackFeedBack, attackFeedBack, game, typeAttack);
      }
    }
  }

  public AtatackRandom({ gameId, indexPlayer }: AttackRandomDataType) {
    const player = this.getEnemyPlayer(gameId, indexPlayer);
    const game = this.findGame(gameId);
    if (game && game.turn === indexPlayer && player && player?.field) {
      let x = -1;
      let y = -1;
      while (true) {
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);
        const [ship, cellType] = player.field[x][y];
        if (cellType === "nonShot") break;
      }
      this.attack({ gameId, indexPlayer, x, y });
    }
  }
}

export const gamesDB = new Games();
