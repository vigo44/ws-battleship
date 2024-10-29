import { roomsDB } from "../store/rooms";
import { UserWithoutPasswordType } from "../types/user";
import { AddUserDataType } from "../types/room";
import { gamesDB } from "../store/games";

export const handlerAddRoom = (user: UserWithoutPasswordType, data: string) => {
  try {
    const { indexRoom }: AddUserDataType = JSON.parse(data);
    const usersIntoRoom = roomsDB.addUser(user, indexRoom);
    if (usersIntoRoom) {
      gamesDB.createGame(usersIntoRoom);
    }
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};
