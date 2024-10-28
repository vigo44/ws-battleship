import { type WebSocket } from "ws";
import { OutputMessageType } from "../constants/message";
import { handlerOutputMessage } from "./handlerOutputMessage";

import { IdPlayerType } from "../types/game";

export const handlerFinish = (ws: WebSocket, winPlayer: IdPlayerType) => {
  try {
    handlerOutputMessage({ ws, data: { winPlayer }, type: OutputMessageType.Finish });
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};
