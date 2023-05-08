/**
 * group array by key
 * @param {Array} arr
 * @param {string} key
 * @returns
 */
export default function groupBy(arr, key) {
  return arr.reduce((group, item) => {
    const value = item[key];
    group[value] = group[value] ? [...group[value], item] : [item];
    return group;
  }, {});
}
