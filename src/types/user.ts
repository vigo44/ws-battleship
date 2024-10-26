export type UserType = {
  id: string | number;
  name: string;
  password: string;
};

export type NewUserType = Omit<UserType, "id">;
