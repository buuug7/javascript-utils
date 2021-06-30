import parseTime from "./parse-time";

it("should worked as expected", function () {
  const now = new Date();
  const rs = parseTime(now);

  expect(rs).toHaveProperty("year");
  expect(rs).toHaveProperty("month");
  expect(rs).toHaveProperty("day");
  expect(rs).toHaveProperty("hour");
  expect(rs).toHaveProperty("minutes");
  expect(rs).toHaveProperty("seconds");
  expect(rs.year).not.toBeNull();
});
