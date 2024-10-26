import { type WebSocket } from "ws";
import { OutputMessageType } from "../constants/message";

type HandlerInputMessageType = { ws: WebSocket; data: unknown; type: OutputMessageType };

export const handlerOutputMessage = ({ ws, data, type }: HandlerInputMessageType) => {
  try {
    const responseStr = JSON.stringify({ id: 0, data: JSON.stringify(data), type });
    ws.send(responseStr);
  } catch (error) {
    console.log(error);
  }
};
