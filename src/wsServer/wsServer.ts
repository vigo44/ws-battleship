import { Server, type WebSocket } from "ws";
import { handlerInputMessage } from "./handlerInputMessage";
import { UserWithoutPasswordType } from "../types/user";
import { regestrationEmmiter } from "../emmiter/emmiter";

export const wsServer = (): void => {
  const wsServer = new Server({ port: 3000 });
  wsServer.on("connection", (ws: WebSocket) => {
    console.log("New client connected");

    let currentUser: UserWithoutPasswordType | undefined;
    const setCurrentUser = (user: UserWithoutPasswordType) => {
      currentUser = user;
    };
    regestrationEmmiter(ws);
    ws.on("message", (message: Buffer) => handlerInputMessage({ ws, message, currentUser, setCurrentUser }));
    ws.on("close", () => console.log("Client was disconnected"));
  });
  wsServer.on("error", (error) => {
    console.log(error);
  });
  console.log(`Start WebSocket server on the ${3000} port!`);
};
