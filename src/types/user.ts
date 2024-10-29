export type UserType = {
  index: IndexType;
  name: string;
  password: string;
};

export type IndexType = string | number;

export type NewUserType = Omit<UserType, "index">;

export type UserWithoutPasswordType = Omit<UserType, "password">;
