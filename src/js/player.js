import { Gameboard } from "./gameboard";

export class Player {
  constructor(cpu) {
    this.cpu = cpu;
    this.gameboard = new Gameboard();
  }
}
