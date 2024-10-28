import { type WebSocket } from "ws";
import { InputMassageType } from "../types/inputMassage";
import { InputMessageType } from "../constants/message";
import { handlerUserReg } from "./handlerUserReg";
import { handlerUpdateWinners } from "./handlerUpdateWinners";
import { UserWithoutPasswordType } from "../types/user";
import { handlerUpdateRooms } from "./handlerUpdateRooms";
import { handlerAddRoom } from "./handlerAddRoom";
import { handlerCreateRoom } from "./handlerCreateRoom";
import { handlerAddShips } from "./handlerAddShip";
import { handlerAttack } from "./handlerAttack";
import { handlerAttackRandom } from "./handlerAttackRandom";

type HandlerInputMessageProps = {
  ws: WebSocket;
  message: Buffer;
  currentUser: UserWithoutPasswordType | undefined;
  setCurrentUser: (user: UserWithoutPasswordType) => void;
};

export const handlerInputMessage = ({ ws, message, currentUser, setCurrentUser }: HandlerInputMessageProps) => {
  try {
    const { type, data }: InputMassageType = JSON.parse(message.toString("utf8"));
    switch (type) {
      case InputMessageType.Reg:
        const userReg = handlerUserReg(ws, data);
        if (userReg) {
          setCurrentUser(userReg);
          handlerUpdateRooms(ws);
          handlerUpdateWinners(ws);
        }
        break;
      case InputMessageType.CreateRoom:
        if (currentUser) {
          handlerCreateRoom(currentUser);
        }
        break;
      case InputMessageType.AddToRoom:
        if (currentUser) {
          handlerAddRoom(currentUser, data);
        }
        break;
      case InputMessageType.AddShip:
        handlerAddShips(data);
        break;
      case InputMessageType.Attack:
        handlerAttack(data);
        break;
      case InputMessageType.RandomAttack:
        handlerAttackRandom(data);
        break;
      default:
        console.log("Invalid type incomingMessage");
        break;
    }
  } catch (error) {
    console.log(error);
  }
};
