/**
 * wait ms second
 * @param {*} ms seconds for wait
 * @returns
 */
export default function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
