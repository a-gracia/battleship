import { Ship } from "./ship";
import { getRandomInt } from "./utils";

export class Gameboard {
  constructor(locations) {
    this.attacks = [];

    if (locations) {
      this.locations = locations;
    } else {
      this.locations = this.randomLocations();
    }
  }

  randomLocations() {
    let shipSizes = [2, 3, 3, 4, 5];
    let locations = [];
    let usedCoordinates = [];

    shipSizes.forEach((size) => {
      let horizontal = Math.random() > 0.5;
      let minX = 0;
      let maxX = horizontal ? 10 - size : 10;

      let minY = 0;
      let maxY = horizontal ? 10 : 10 - size;

      while (true) {
        let coordX = getRandomInt(minX, maxX);
        let coordY = getRandomInt(minY, maxY);

        let shipCoordinates = [];

        for (let i = 0; i < size; i++) {
          if (horizontal) {
            shipCoordinates.push([coordX + i, coordY]);
          } else {
            shipCoordinates.push([coordX, coordY + i]);
          }
        }

        const exists = shipCoordinates.some(([a, b]) =>
          usedCoordinates.some(([c, d]) => a === c && b === d),
        );

        if (!exists) {
          usedCoordinates = usedCoordinates.concat(shipCoordinates);

          locations.push({
            x: coordX,
            y: coordY,
            horizontal: horizontal,
            ship: new Ship(size),
          });

          break;
        }
      }
    });

    return locations;
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
