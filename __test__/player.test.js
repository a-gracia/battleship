import { Player } from "../src/js/player";

it("is CPU", () => {
  let player = new Player(true);

  expect(player.cpu).toBeTruthy();
});
