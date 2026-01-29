import { Gameboard } from "./gameboard";

export class Player {
  constructor(cpu, boardContainer) {
    this.cpu = cpu;
    this.gameboard = new Gameboard();
    this.boardContainer = boardContainer;
  }
}
