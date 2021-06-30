/**
 * parse Date instance
 * @param {Date | number} time
 * @return {{year: string, month: string, day: string, hour: string, minutes: string, seconds: string}}
 */
function parseTime(time) {
  const date = new Date(time);
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().replace(/^(\d)$/, "0$1");
  const day = date
    .getDate()
    .toString()
    .replace(/^(\d)$/, "0$1");
  const hour = date
    .getHours()
    .toString()
    .replace(/^(\d)$/, "0$1");
  const minutes = date
    .getMinutes()
    .toString()
    .replace(/^(\d)$/, "0$1");

  const seconds = date.getSeconds().toString();

  return {
    year,
    month,
    day,
    hour,
    minutes,
    seconds,
  };
}

export default parseTime;
