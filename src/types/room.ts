import { UserWithoutPasswordType } from "./user";

export type RoomType = {
  roomId: string | number;
  roomUsers: UserWithoutPasswordType[];
};

export type AddUserDataType = {
  indexRoom: number | string;
};
