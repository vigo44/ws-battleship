import { type WebSocket } from "ws";
import { OutputMessageType } from "../constants/message";
import { handlerOutputMessage } from "./handlerOutputMessage";

import { GameCreateDataType } from "../types/game";

export const handlerCreateGame = (ws: WebSocket, player: GameCreateDataType) => {
  try {
    handlerOutputMessage({ ws, data: player, type: OutputMessageType.CreateGame });
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};
