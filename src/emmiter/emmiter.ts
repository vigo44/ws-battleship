import EventEmitter from "node:events";
import { type WebSocket } from "ws";
import { OutputMessageType } from "../constants/message";
import { handlerUpdateRooms } from "../wsServer/handlerUpdateRooms";
import { UserWithoutPasswordType } from "../types/user";
import { gamesDB } from "../store/games";
import { handlerCreateGame } from "../wsServer/handlerCreateGame";

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
      const date = gamesDB.findGame(currentUser);
      console.log("date", date);
      if (date) {
        handlerCreateGame(ws, date);
      }
    }
  });
};
