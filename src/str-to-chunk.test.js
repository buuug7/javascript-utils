import strToChunk from "./str-to-chunk";

it("should work as expected", () => {
  const rs1 = strToChunk("abcdef");
  expect(rs1.length).toEqual(6);
  expect(rs1[0]).toEqual("a");
  expect(rs1[rs1.length - 1]).toEqual("f");

  const rs2 = strToChunk("abcdef", 2);
  expect(rs2.length).toEqual(3);
  expect(rs2[0]).toEqual("ab");
  expect(rs2[rs2.length - 1]).toEqual("ef");
});
