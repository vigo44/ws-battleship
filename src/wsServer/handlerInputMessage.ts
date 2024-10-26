import { type WebSocket } from "ws";
import { InputMassageType } from "../types/inputMassage";
import { InputMessageType } from "../constants/message";
import { handlerUserReg } from "./handlerUserReg";

export const handlerInputMessage = (ws: WebSocket, message: Buffer) => {
  try {
    const { type, data }: InputMassageType = JSON.parse(message.toString("utf8"));
    switch (type) {
      case InputMessageType.Reg:
        handlerUserReg(ws, data);
        break;
      default:
        throw new Error("Invalid type incomingMessage");
        break;
    }
  } catch (error) {
    console.log(error);
  }
};
