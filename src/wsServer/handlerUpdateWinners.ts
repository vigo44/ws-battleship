import { type WebSocket } from "ws";
import { OutputMessageType } from "../constants/message";
import { handlerOutputMessage } from "./handlerOutputMessage";
import { winnersDB } from "../store/winners";

export const handlerUpdateWinners = (ws: WebSocket) => {
  try {
    const responseData = winnersDB.getWinners();
    handlerOutputMessage({ ws, data: responseData, type: OutputMessageType.Winners });
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};
