export type WinnerType = {
  id: string | number;
  name: string;
  wins: number;
};

export type WinnerWithoutIdType = Omit<WinnerType, "id">;

export type NewWinnerType = Omit<WinnerType, "wins">;
