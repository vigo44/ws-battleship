import { INVALID_PASSWORD } from "../constants/message";
import { NewUserType, UserType } from "../types/user";
import { randomUUID } from "node:crypto";

export class ErrorPassword extends Error {
  user: UserType;
  constructor(message: string, user: UserType) {
    super(message);
    this.user = user;
  }
}

class Users {
  private users: UserType[] = [];

  public findUser(newUser: NewUserType) {
    const user = this.users.find((item) => item.name === newUser.name);
    return user;
  }

  public addUser(newUser: NewUserType) {
    const user = this.users.find((item) => item.name === newUser.name);
    if (user) {
      if (user.password === newUser.password) {
        return user;
      } else throw new ErrorPassword(INVALID_PASSWORD, user);
    } else {
      const newUserWithUuid = { ...newUser, id: randomUUID() };
      this.users = [...this.users, newUserWithUuid];
      return newUserWithUuid;
    }
  }
}

export const usersDB = new Users();
