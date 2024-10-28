import EventEmitter from "node:events";
import { type WebSocket } from "ws";
import { OutputMessageType } from "../constants/message";
import { handlerUpdateRooms } from "../wsServer/handlerUpdateRooms";
import { UserWithoutPasswordType } from "../types/user";
import { gamesDB } from "../store/games";
import { handlerCreateGame } from "../wsServer/handlerCreateGame";
import { GameType, IdPlayerType, ShotType, StatusType } from "../types/game";
import { handlerStartGame } from "../wsServer/handlerStartGame";
import { handlerGameTurn } from "../wsServer/handlerGameTurn";
import { handlerAttackFeedBack } from "../wsServer/handlerAttackFeedBack";
import { handlerFinish } from "../wsServer/handlerFinish";
import { handlerUpdateWinners } from "../wsServer/handlerUpdateWinners";

export const emitter = new EventEmitter();

type regestrationEmmiterType = {
  ws: WebSocket;
  getCurrentUser: () => UserWithoutPasswordType | undefined;
};

export const regestrationEmmiter = ({ ws, getCurrentUser }: regestrationEmmiterType) => {
  emitter.on(OutputMessageType.UpdateRooms, () => handlerUpdateRooms(ws));
  emitter.on(OutputMessageType.CreateGame, () => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      const date = gamesDB.findGameForResponse(currentUser);
      if (date) {
        handlerCreateGame(ws, date);
      }
    }
  });
  emitter.on(OutputMessageType.Start_game, (game: GameType) => {
    const currentUser = getCurrentUser();
    if (!currentUser?.index) return;
    if (currentUser.index === game.masterPlayer.index) {
      handlerStartGame(ws, { ships: game.masterPlayer.ships ?? [], currentPlayerIndex: game.masterPlayer.idPlayer });
      handlerGameTurn(ws, game.masterPlayer.idPlayer);
    }
    if (currentUser.index === game.slavePlayer.index) {
      handlerStartGame(ws, { ships: game.slavePlayer.ships ?? [], currentPlayerIndex: game.slavePlayer.idPlayer });
      handlerGameTurn(ws, game.masterPlayer.idPlayer);
    }
  });
  emitter.on(OutputMessageType.AttackFeedBack, (shots: ShotType[], game: GameType, status: StatusType) => {
    const currentUser = getCurrentUser();
    if (!currentUser?.index) return;
    if (currentUser.index === game.masterPlayer.index || currentUser.index === game.slavePlayer.index) {
      shots.forEach((item) => {
        handlerAttackFeedBack(ws, item);
      });
      if (status === "miss") {
        handlerGameTurn(ws, game.turn);
      }
    }
  });
  emitter.on(OutputMessageType.Finish, (game: GameType, winPlayer: IdPlayerType) => {
    const currentUser = getCurrentUser();
    if (!currentUser?.index) return;
    if (currentUser.index === game.masterPlayer.index || currentUser.index === game.slavePlayer.index) {
      handlerFinish(ws, winPlayer);
      handlerUpdateRooms(ws);
      handlerUpdateWinners(ws);
    }
  });
};
