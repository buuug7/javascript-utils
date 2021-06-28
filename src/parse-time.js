/**
 * parse Date instance
 * @param {Date} time
 * @return {{seconds: string, month: string, hour: string, year: string, minutes: string, day: string}}
 */
function parseTime(time) {
  const year = time.getFullYear().toString();
  const month = (time.getMonth() + 1).toString().replace(/^(\d)$/, "0$1");
  const day = time
    .getDate()
    .toString()
    .replace(/^(\d)$/, "0$1");
  const hour = time
    .getHours()
    .toString()
    .replace(/^(\d)$/, "0$1");
  const minutes = time
    .getMinutes()
    .toString()
    .replace(/^(\d)$/, "0$1");

  const seconds = time.getSeconds().toString();

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
