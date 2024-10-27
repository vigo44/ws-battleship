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
    return user && { name: user.name, id: user.id };
  }

  public addUser(newUser: NewUserType) {
    const user = this.users.find((item) => item.name === newUser.name);

    if (user) {
      const userWithoutPassword = { name: user.name, id: user.id };
      if (user.password === newUser.password) {
        return userWithoutPassword;
      } else throw new ErrorPassword(INVALID_PASSWORD, userWithoutPassword);
    } else {
      const newUserWithUuid = { ...newUser, id: randomUUID() };
      this.users = [...this.users, newUserWithUuid];
      const userWithoutPassword = { name: newUserWithUuid.name, id: newUserWithUuid.id };
      return userWithoutPassword;
    }
  }
}

export const usersDB = new Users();
