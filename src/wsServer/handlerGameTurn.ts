import { type WebSocket } from "ws";
import { OutputMessageType } from "../constants/message";
import { handlerOutputMessage } from "./handlerOutputMessage";

import { IdPlayerType } from "../types/game";

export const handlerGameTurn = (ws: WebSocket, currentPlayer: IdPlayerType) => {
  try {
    handlerOutputMessage({ ws, data: { currentPlayer }, type: OutputMessageType.Turn });
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};
