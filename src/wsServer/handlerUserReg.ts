import { type WebSocket } from "ws";
import { dataInputRegType } from "../types/dataRegType";
import { ErrorPassword, usersDB } from "../store/users";
import { OutputMessageType } from "../constants/message";
import { handlerOutputMessage } from "./handlerOutputMessage";

export const handlerUserReg = (ws: WebSocket, data: string) => {
  try {
    const newUser: dataInputRegType = JSON.parse(data);
    const responseData = { ...usersDB.addUser(newUser), error: false, errorText: "" };
    handlerOutputMessage({ ws, data: responseData, type: OutputMessageType.Reg });
  } catch (error) {
    if (error instanceof ErrorPassword) {
      handlerOutputMessage({
        ws,
        data: { ...error.user, error: true, errorText: error.message },
        type: OutputMessageType.Reg,
      });
    } else {
      if (error instanceof Error) {
        throw error;
      }
    }
  }
};
