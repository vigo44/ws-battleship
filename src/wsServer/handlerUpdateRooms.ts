import { type WebSocket } from "ws";
import { OutputMessageType } from "../constants/message";
import { handlerOutputMessage } from "./handlerOutputMessage";
import { roomsDB } from "../store/rooms";

export const handlerUpdateRooms = (ws: WebSocket) => {
  try {
    const responseData = roomsDB.getNotCompleteRooms();
    handlerOutputMessage({ ws, data: responseData, type: OutputMessageType.UpdateRooms });
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};
