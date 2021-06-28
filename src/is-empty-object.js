/**
 * determine whether the given object is {}
 * @param {Object} obj
 * @return {boolean}
 */
function isEmptyObject(obj) {
  if (!obj) {
    throw new Error("obj is undefined or null");
  }
  return Object.keys(obj).length === 0;
}

export default isEmptyObject;
