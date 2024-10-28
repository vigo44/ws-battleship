import { gamesDB } from "../store/games";
import { AddShipsDataType } from "../types/ship";

export const handlerAddShips = (data: string) => {
  try {
    const { gameId, ships, indexPlayer }: AddShipsDataType = JSON.parse(data);
    gamesDB.createField(gameId, indexPlayer, ships);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};
