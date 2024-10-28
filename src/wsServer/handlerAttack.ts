import { gamesDB } from "../store/games";
import { AttackDataType } from "../types/game";

export const handlerAttack = (data: string) => {
  try {
    const props: AttackDataType = JSON.parse(data);
    gamesDB.attack(props);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};
