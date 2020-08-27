import {Tournament} from "./tournament";

describe("Tournament", () => {
  test("total cost", () => {
    const tournament = new Tournament({1: 3, 2: 5, 5: 8}, {cost: 3.3});
    expect(tournament.totalCost).toBe(16 * 3.3);
  });

  test("gross returns", () => {
    const tournament = new Tournament(
      {1: 3, 2: 5, 5: 8},
      {1: 4.5, 2: 2.75, 3: 1}
    );
    expect(tournament.grossReturns).toBe(3 * 4.5 + 5 * 2.75);
  });
});
