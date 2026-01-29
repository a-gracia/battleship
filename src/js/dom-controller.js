import { Gameboard } from "./gameboard";
import { Player } from "./player";
import { Ship } from "./ship";

const BOARD_SIZE = 10;

export class DOMController {
  constructor() {
    this.radar = document.querySelector("#radar");
    this.myBoard = document.querySelector("#my-board");
    this.winnerContainer = document.querySelector("#winner-container");

    this.player = new Player(false, this.myBoard);
    this.cpu = new Player(true, this.radar);
    this.currentPlayer = this.player;

    // Populate both boards
    this.populateBoard(this.player);
    this.populateBoard(this.cpu);

    // Add current locartions to player's board
    this.updatePlayerBoard(this.player);
  }

  populateBoard(player) {
    for (let y = BOARD_SIZE - 1; y >= 0; y--) {
      for (let x = 0; x < BOARD_SIZE; x++) {
        let button = document.createElement("button");
        button.setAttribute("data-x", x);
        button.setAttribute("data-y", y);

        if (player == this.player) {
          button.disabled = true;
        } else {
          button.addEventListener("click", (e) => {
            e.preventDefault();

            let coordX = button.dataset.x;
            let coordY = button.dataset.y;

            button.disabled = true;

            if (this.cpu.gameboard.receiveAttack(coordX, coordY)) {
              button.classList = "hit";
            } else {
              button.classList = "miss";
            }

            if (this.cpu.gameboard.allSunk()) {
              this.winnerContainer.textContent = "Player wins!";
              this.finishGame();
            }

            setTimeout(() => {
              this.cpuTurn();
            }, 200);
          });
        }

        player.boardContainer.appendChild(button);
      }
    }
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  cpuTurn() {
    while (true) {
      let coordX = this.getRandomInt(0, 10);
      let coordY = this.getRandomInt(0, 10);

      if (
        !this.player.gameboard.attacks.some(
          ([x, y]) => x === coordX && y === coordY,
        )
      ) {
        let button = this.player.boardContainer.querySelector(
          `[data-x="${coordX}"][data-y="${coordY}"]`,
        );

        if (this.player.gameboard.receiveAttack(coordX, coordY)) {
          button.classList = "hit";
        } else {
          button.classList = "miss";
        }

        if (this.player.gameboard.allSunk()) {
          this.winnerContainer.textContent = "CPU wins!";
          this.finishGame();
        }
        break;
      }
    }
  }

  finishGame() {
    this.updatePlayerBoard(this.cpu);
    let allButtons = this.radar.querySelectorAll("button");
    allButtons.forEach((element) => {
      element.disabled = true;
    });
  }
  updatePlayerBoard(player) {
    const shipSymbols = ["O", "*", ">", "<", "-"];

    player.gameboard.locations.forEach((location, index) => {
      for (let i = 0; i < location.ship.length; i++) {
        let coordX = location.x;
        let coordY = location.y;
        if (location.horizontal) {
          coordX += i;
        } else {
          coordY += i;
        }
        let attributes = `[data-x="${coordX}"][data-y="${coordY}"]`;

        let button = player.boardContainer.querySelector(attributes);

        button.textContent = shipSymbols[index];
      }
    });
  }
}
