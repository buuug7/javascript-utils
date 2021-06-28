import isEmptyObject from "./is-empty-object";

it("should isEmptyObject worked", function () {
  expect(isEmptyObject({})).toBe(true);
  expect(isEmptyObject({ name: "tom" })).toBe(false);
  expect(() => isEmptyObject(null)).toThrowError();
  expect(() => isEmptyObject(undefined)).toThrowError();
});
