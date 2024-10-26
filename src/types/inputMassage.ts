import { InputMessageType } from "../constants/message";

export type InputMassageType = {
  type: InputMessageType;
  data: string;
  id: number;
};
