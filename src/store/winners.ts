import { NewWinnerType, WinnerType, WinnerWithoutIdType } from "../types/winner";

class Winners {
  private winners: WinnerType[] = [];

  public getWinners(): WinnerWithoutIdType[] {
    const winnersSort = this.winners.sort((item1, item2) => item2.wins - item1.wins);
    const resultWinners = winnersSort.map((item) => ({ name: item.name, wins: item.wins }));
    return resultWinners;
  }

  public addNewWinner(newWinner: NewWinnerType) {
    const findWinner = this.winners.find((item) => {
      return item.id === newWinner.id;
    });
    if (findWinner) {
      findWinner.wins++;
    } else {
      this.winners = [...this.winners, { ...newWinner, wins: 1 }];
    }
  }
}

export const winnersDB = new Winners();
