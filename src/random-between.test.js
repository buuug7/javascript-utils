import randomBetween from "./random-between.js";

it("should randomBetween", function () {
  const rs1 = randomBetween(5, 2);
  expect(rs1).toBeGreaterThanOrEqual(2);
  expect(rs1).toBeLessThanOrEqual(5);
});
