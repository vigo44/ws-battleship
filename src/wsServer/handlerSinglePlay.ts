import { roomsDB } from "../store/rooms";
import { UserWithoutPasswordType } from "../types/user";
import { AddUserDataType } from "../types/room";
import { gamesDB } from "../store/games";

export const handlerSinglePlay = (user: UserWithoutPasswordType) => {
  try {
    gamesDB.createGame([user, { name: "Bot", index: "bot" }]);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};
