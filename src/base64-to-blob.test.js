import base64ToBlob from "./base64-to-blob";

it("should worked as expected", async () => {
  const str = "javascript utils";
  const base64Str = Buffer.from(str).toString("base64");

  const blob = await base64ToBlob(base64Str);
  const buf = await blob.arrayBuffer();
  const decoder = new TextDecoder();
  const result = decoder.decode(buf);
  expect(result).toEqual(str);
});
