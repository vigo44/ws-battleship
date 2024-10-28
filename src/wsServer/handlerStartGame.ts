import { type WebSocket } from "ws";
import { OutputMessageType } from "../constants/message";
import { handlerOutputMessage } from "./handlerOutputMessage";

import { GameStartDataType } from "../types/game";

export const handlerStartGame = (ws: WebSocket, data: GameStartDataType) => {
  try {
    handlerOutputMessage({ ws, data, type: OutputMessageType.Start_game });
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};
