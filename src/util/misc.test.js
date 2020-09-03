import {numberSort} from "./misc";

describe("numberSort", () => {
  it("sorts numbers by size, not by lex order", () => {
    const actual = [2, 100, 3, -4].sort(numberSort);
    expect(actual).toMatchObject([-4, 2, 3, 100]);
  });
});
