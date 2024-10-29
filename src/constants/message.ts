export enum InputMessageType {
  Reg = "reg",
  CreateRoom = "create_room",
  AddToRoom = "add_user_to_room",
  AddShip = "add_ships",
  Attack = "attack",
  RandomAttack = "randomAttack",
  Single_play = "single_play",
}

export enum OutputMessageType {
  Reg = "reg",
  Winners = "update_winners",
  UpdateRooms = "update_room",
  CreateGame = "create_game",
  Start_game = "start_game",
  Turn = "turn",
  AttackFeedBack = "attack",
  Finish = "finish",
}

export const INVALID_PASSWORD = "Invalid password! Try again!";
