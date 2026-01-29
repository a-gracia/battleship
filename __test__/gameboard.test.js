import { Gameboard } from "../src/js/gameboard";

it("Receive attack: success", () => {
  let gameboard = new Gameboard();

  expect(gameboard.receiveAttack(0, 0)).toBeTruthy();
});

it("Receive attack: miss", () => {
  let gameboard = new Gameboard();

  expect(gameboard.receiveAttack(6, 6)).toBeFalsy();
  expect(gameboard.missedHits[0]).toStrictEqual({ x: 6, y: 6 });
});

it("All ships sunk: false", () => {
  let gameboard = new Gameboard();

  expect(gameboard.allSunk()).toBeFalsy();
});

it("All ships sunk: true", () => {
  let gameboard = new Gameboard();

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
