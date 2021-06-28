/**
 * random a number between max and min
 * @param {number} max
 * @param {number} min
 * @return {number}
 */
function randomBetween(max, min) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default randomBetween;
