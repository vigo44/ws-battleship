import { type WebSocket } from "ws";
import { InputMassageType } from "../types/inputMassage";
import { InputMessageType } from "../constants/message";
import { handlerUserReg } from "./handlerUserReg";
import { handlerUpdateWinners } from "./handlerUpdateWinners";

export const handlerInputMessage = (ws: WebSocket, message: Buffer) => {
  try {
    const { type, data }: InputMassageType = JSON.parse(message.toString("utf8"));
    switch (type) {
      case InputMessageType.Reg:
        const succed = handlerUserReg(ws, data);
        if (succed) {
          handlerUpdateWinners(ws);
        }
        break;
      default:
        throw new Error("Invalid type incomingMessage");
        break;
    }
  } catch (error) {
    console.log(error);
  }
};
