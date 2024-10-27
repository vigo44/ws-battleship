import { OutputMessageType } from "../constants/message";
import { emitter } from "../emmiter/emmiter";
import { RoomType } from "../types/room";
import { UserWithoutPasswordType } from "../types/user";
import { randomUUID } from "node:crypto";

class Rooms {
  private rooms: RoomType[] = [];

  public createRoom(user: UserWithoutPasswordType) {
    this.rooms = [...this.rooms, { roomId: randomUUID(), roomUsers: [user] }];
    emitter.emit(OutputMessageType.UpdateRooms);
  }

  public addUser(user: UserWithoutPasswordType, roomId: string | number) {
    const findRoom = this.getNotCompleteRooms().find((item) => {
      return item.roomId === roomId;
    });
    if (findRoom) {
      if (findRoom.roomUsers[0]?.index !== user.index) findRoom.roomUsers = [...findRoom.roomUsers, user];
    }
    emitter.emit(OutputMessageType.UpdateRooms);
  }

  public getNotCompleteRooms() {
    return this.rooms.filter((item) => {
      return item.roomUsers.length < 2;
    });
  }
}

export const roomsDB = new Rooms();
