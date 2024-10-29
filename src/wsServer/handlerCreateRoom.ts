import { roomsDB } from "../store/rooms";
import { UserWithoutPasswordType } from "../types/user";

export const handlerCreateRoom = (user: UserWithoutPasswordType) => {
  try {
    roomsDB.createRoom(user);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};
