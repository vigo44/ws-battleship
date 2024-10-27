import EventEmitter from "node:events";
import { type WebSocket } from "ws";
import { OutputMessageType } from "../constants/message";
import { handlerUpdateRooms } from "../wsServer/handlerUpdateRooms";

export const emitter = new EventEmitter();

export const regestrationEmmiter = (ws: WebSocket) => {
  emitter.on(OutputMessageType.UpdateRooms, () => handlerUpdateRooms(ws));
};
