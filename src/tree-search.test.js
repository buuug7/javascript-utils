import treeSearch from "./tree-search";

const tree = {
  name: "root",
  key: 1,
  children: [
    {
      name: "level1 name1",
      key: 2,
    },
    {
      name: "level1 name2",
      key: 3,
      children: [
        {
          name: "level1 name1",
          key: 4,
        },
      ],
    },
  ],
};

it("should work as expected", function () {
  const result = treeSearch(tree, 4);
  expect(result.name).toEqual("level1 name1");
});
