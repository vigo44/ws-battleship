import EventEmitter from "node:events";
import { type WebSocket } from "ws";
import { OutputMessageType } from "../constants/message";
import { handlerUpdateRooms } from "../wsServer/handlerUpdateRooms";
import { UserWithoutPasswordType } from "../types/user";
import { gamesDB } from "../store/games";
import { handlerCreateGame } from "../wsServer/handlerCreateGame";
import { GameType } from "../types/game";
import { handlerStartGame } from "../wsServer/handlerStartGame";
import { handlerGameTurn } from "../wsServer/handlerGameTurn";

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
};
