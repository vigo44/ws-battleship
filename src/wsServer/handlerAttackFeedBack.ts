import { type WebSocket } from "ws";
import { OutputMessageType } from "../constants/message";
import { handlerOutputMessage } from "./handlerOutputMessage";

import { ShotType } from "../types/game";

export const handlerAttackFeedBack = (ws: WebSocket, data: ShotType) => {
  try {
    handlerOutputMessage({ ws, data, type: OutputMessageType.AttackFeedBack });
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};
