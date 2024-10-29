import { gamesDB } from "../store/games";
import { AttackRandomDataType } from "../types/game";

export const handlerAttackRandom = (data: string) => {
  try {
    const props: AttackRandomDataType = JSON.parse(data);
    gamesDB.AtatackRandom(props);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};
