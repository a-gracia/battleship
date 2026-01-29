import { Ship } from "./ship";

export class Gameboard {
  constructor() {
    this.attacks = [];

    this.locations = [
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
  }

  receiveAttack(x, y) {
    this.attacks.push([x, y]);
    for (let i = 0; i < this.locations.length; i++) {
      const shipLocation = this.locations[i];
      let minX = shipLocation.x;
      let minY = shipLocation.y;
      let maxX, maxY;

      if (shipLocation.horizontal) {
        maxX = minX + shipLocation.ship.length - 1;
        maxY = minY;
      } else {
        maxX = minX;
        maxY = minY + shipLocation.ship.length - 1;
      }

      if (minX <= x && x <= maxX && minY <= y && y <= maxY) {
        shipLocation.ship.hit();
        return true;
      }
    }
    return false;
  }

  allSunk() {
    const isSunk = (location) => location.ship.isSunk();

    return this.locations.every(isSunk);
  }
}
