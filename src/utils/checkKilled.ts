import { CellType, FieldType } from "../types/game";

export const checkKilled = (field: FieldType, x: number, y: number) => {
  const ship = field[y][x][0];
  let flatField: CellType[] = [];
  field.forEach((item) => {
    flatField = [...flatField, ...item];
  });
  const filterShipCell = flatField.filter((item) => {
    return item[0] === ship;
  });
  const filterShot = filterShipCell.filter((item) => {
    return item[1] === "nonShot";
  });
  console.log("ship", filterShipCell, filterShot);
  return filterShot.length === 0;
};
