import { Ship } from "../src/js/ship";

it("Hit ship once", () => {
  let ship = new Ship();

  ship.hit();

  expect(ship.hitCount).toBe(1);
});

it("Hit ship twice", () => {
  let ship = new Ship();

  ship.hit();
  ship.hit();

  expect(ship.hitCount).toBe(2);
});

it("Hit ship three times", () => {
  let ship = new Ship();

  ship.hit();
  ship.hit();
  ship.hit();

  expect(ship.hitCount).toBe(3);
});

it("Check if ship is sunk", () => {
  let ship = new Ship(2);

  ship.hit();

  expect(ship.isSunk()).toBeFalsy();
});

it("Check if ship is sunk", () => {
  let ship = new Ship(2);

  ship.hit();
  ship.hit();

  expect(ship.isSunk()).toBeTruthy();
});
