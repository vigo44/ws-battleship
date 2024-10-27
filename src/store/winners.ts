import { NewWinnerType, WinnerType, WinnerWithoutIndexType } from "../types/winner";

class Winners {
  private winners: WinnerType[] = [];

  public getWinners(): WinnerWithoutIndexType[] {
    const winnersSort = this.winners.sort((item1, item2) => item2.wins - item1.wins);
    const resultWinners = winnersSort.map((item) => ({ name: item.name, wins: item.wins }));
    return resultWinners;
  }

  public addNewWinner(newWinner: NewWinnerType) {
    const findWinner = this.winners.find((item) => {
      return item.index === newWinner.index;
    });
    if (findWinner) {
      findWinner.wins++;
    } else {
      this.winners = [...this.winners, { ...newWinner, wins: 1 }];
    }
  }
}

export const winnersDB = new Winners();
