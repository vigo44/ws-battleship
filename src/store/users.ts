import { INVALID_PASSWORD } from "../constants/message";
import { NewUserType, UserType, UserWithoutPasswordType } from "../types/user";
import { randomUUID } from "node:crypto";

export class ErrorPassword extends Error {
  user: UserWithoutPasswordType;
  constructor(message: string, user: UserWithoutPasswordType) {
    super(message);
    this.user = user;
  }
}

class Users {
  private users: UserType[] = [];

  public findUser(newUser: NewUserType): UserWithoutPasswordType | undefined {
    const user = this.users.find((item) => item.name === newUser.name);
    return user && { name: user.name, index: user.index };
  }

  public addUser(newUser: NewUserType) {
    const user = this.users.find((item) => item.name === newUser.name);

    if (user) {
      const userWithoutPassword = { name: user.name, index: user.index };
      if (user.password === newUser.password) {
        return userWithoutPassword;
      } else throw new ErrorPassword(INVALID_PASSWORD, userWithoutPassword);
    } else {
      const newUserWithUuid = { ...newUser, index: randomUUID() };
      this.users = [...this.users, newUserWithUuid];
      const userWithoutPassword = { name: newUserWithUuid.name, index: newUserWithUuid.index };
      return userWithoutPassword;
    }
  }
}

export const usersDB = new Users();
