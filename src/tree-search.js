/**
 * search tree
 *
 * @param {object} tree
 * @param {string} searchKey
 * @returns
 */
function treeSearch(tree, searchKey) {
  if (tree.key === searchKey) {
    return tree;
  } else if (tree.children?.length) {
    let result = null;
    for (let i = 0; i < tree.children.length; i++) {
      result = treeSearch(tree.children[i], searchKey);
      if (result) {
        break;
      }
    }
    return result;
  }
  return null;
}

export default treeSearch;
