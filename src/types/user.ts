export type UserType = {
  index: string | number;
  name: string;
  password: string;
};

export type NewUserType = Omit<UserType, "index">;

export type UserWithoutPasswordType = Omit<UserType, "password">;
