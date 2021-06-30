export default parseTime;
/**
 * parse Date instance
 * @param {Date} time
 * @return {{seconds: string, month: string, hour: string, year: string, minutes: string, day: string}}
 */
declare function parseTime(time: Date): {
    seconds: string;
    month: string;
    hour: string;
    year: string;
    minutes: string;
    day: string;
};
