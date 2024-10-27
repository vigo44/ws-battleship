import { roomsDB } from "../store/rooms";
import { UserWithoutPasswordType } from "../types/user";
import { AddUserDataType } from "../types/room";

export const handlerAddRoom = (user: UserWithoutPasswordType, data: string) => {
  try {
    const { indexRoom }: AddUserDataType = JSON.parse(data);
    roomsDB.addUser(user, indexRoom);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};
