import numberToUpper from "./numberToUpper";

it("should worked as expected", function () {
  const n33 = numberToUpper(33);
  const n33dot99 = numberToUpper(33.99)
  expect(n33).toEqual('叁拾叁元整')
  expect(n33dot99).toEqual('叁拾叁元玖角玖分')
});
