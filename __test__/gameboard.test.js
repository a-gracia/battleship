import { Gameboard } from "../src/js/gameboard";
import { Ship } from "../src/js/ship";

let locations = [
  {
    x: 0,
    y: 0,
    horizontal: true,
    ship: new Ship(5),
  },
  {
    x: 0,
    y: 1,
    horizontal: true,
    ship: new Ship(4),
  },
  {
    x: 0,
    y: 2,
    horizontal: true,
    ship: new Ship(3),
  },
  {
    x: 0,
    y: 3,
    horizontal: true,
    ship: new Ship(3),
  },
  {
    x: 0,
    y: 4,
    horizontal: false,
    ship: new Ship(2),
  },
];

it("Receive attack: success", () => {
  let gameboard = new Gameboard(locations);

  expect(gameboard.receiveAttack(0, 0)).toBeTruthy();
});

it("Receive attack: miss", () => {
  let gameboard = new Gameboard(locations);

  expect(gameboard.receiveAttack(6, 6)).toBeFalsy();
  expect(gameboard.attacks[0]).toStrictEqual([6, 6]);
});

it("All ships sunk: false", () => {
  let gameboard = new Gameboard(locations);

  expect(gameboard.allSunk()).toBeFalsy();
});

it("All ships sunk: true", () => {
  let gameboard = new Gameboard(locations);

  gameboard.receiveAttack(0, 0);
  gameboard.receiveAttack(1, 0);
  gameboard.receiveAttack(2, 0);
  gameboard.receiveAttack(3, 0);
  gameboard.receiveAttack(4, 0);

  gameboard.receiveAttack(0, 1);
  gameboard.receiveAttack(1, 1);
  gameboard.receiveAttack(2, 1);
  gameboard.receiveAttack(3, 1);

  gameboard.receiveAttack(0, 2);
  gameboard.receiveAttack(1, 2);
  gameboard.receiveAttack(2, 2);

  gameboard.receiveAttack(0, 3);
  gameboard.receiveAttack(1, 3);
  gameboard.receiveAttack(2, 3);

  gameboard.receiveAttack(0, 4);
  gameboard.receiveAttack(0, 5);

  expect(gameboard.allSunk()).toBeTruthy();
});
