export type WinnerType = {
  index: string | number;
  name: string;
  wins: number;
};

export type WinnerWithoutIndexType = Omit<WinnerType, "index">;

export type NewWinnerType = Omit<WinnerType, "wins">;
