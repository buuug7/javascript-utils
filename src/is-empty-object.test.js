import isEmptyObject from "./is-empty-object";

it("should worked as expected", function () {
  expect(isEmptyObject({})).toBe(true);
  expect(isEmptyObject({ name: "tom" })).toBe(false);
  expect(() => isEmptyObject(null)).toThrowError();
  expect(() => isEmptyObject(undefined)).toThrowError();
});
