import { CellType, FieldType } from "../types/game";
import { ShipType } from "../types/ship";

const generateEmptyField = (): CellType[][] => {
  let field: CellType[][] = [];
  for (let i = 0; i < 10; i++) {
    let cols: CellType[] = [];
    for (let j = 0; j < 10; j++) {
      cols.push([0, "nonShot"]);
    }
    field.push(cols);
  }
  return field;
};

export const addShips = (ships: ShipType[]): FieldType => {
  const field: FieldType = generateEmptyField();
  const indexShip = { small: 1, medium: 1, large: 1, huge: 1 };
  ships.forEach((ship) => {
    for (let i = 0; i < ship.length; i++) {
      const cell: CellType = [ship.length * 10 + indexShip[ship.type], "nonShot"];
      const xCell = ship.direction ? ship.position.x : ship.position.x + i;
      const yCell = ship.direction ? ship.position.y + i : ship.position.y;
      field[yCell][xCell] = cell;
    }
    indexShip[ship.type]++;
  });
  return field;
};

export const checkKilled = (field: FieldType, x: number, y: number) => {
  const xBeffore = field[y][x - 1] && field[y][x - 1][0] !== 0 && field[y][x - 1][1] === "nonShot";
  const xAfter = field[y][x + 1] && field[y][x + 1][0] !== 0 && field[y][x + 1][1] === "nonShot";
  const yBeffore = field[y - 1] && field[y - 1][x] && field[y - 1][x][0] !== 0 && field[y - 1][x][1] === "nonShot";
  const yAfter = field[y + 1] && field[y + 1][x] && field[y + 1][x][0] !== 0 && field[y + 1][x][1] === "nonShot";
  return xBeffore || xAfter || yBeffore || yAfter;
};
