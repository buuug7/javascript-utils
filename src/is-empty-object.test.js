import isEmptyObject from "./is-empty-object";

it("should worked as expected", function () {
  expect(isEmptyObject({})).toBe(true);
  expect(isEmptyObject({ name: "tom" })).toBe(false);
  expect(() => isEmptyObject(null)).toThrow(/is undefined or null/);
  expect(() => isEmptyObject(undefined)).toThrowError();
});
