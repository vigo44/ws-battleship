export enum InputMessageType {
  Reg = "reg",
  CreateRoom = "create_room",
  AddToRoom = "add_user_to_room",
  AddShip = "add_ships",
  Attack = "attack",
  RandomAttack = "randomAttack",
}

export enum OutputMessageType {
  Reg = "reg",
  Winners = "update_winners",
}

export const INVALID_PASSWORD = "Invalid password! Try again!";
