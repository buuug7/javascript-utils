/**
 * split str to chunk with n length
 * @param {string} str
 * @param {number} n
 * @returns {string[]}
 */
export default function strToChunk(str, n = 1) {
  const reg = new RegExp(`.{1,${n}}`, "g");
  return str.match(reg);
}
