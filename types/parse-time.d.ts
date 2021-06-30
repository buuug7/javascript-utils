export default parseTime;
/**
 * parse Date instance
 * @param {Date | number} time
 * @return {{year: string, month: string, day: string, hour: string, minutes: string, seconds: string}}
 */
declare function parseTime(time: Date | number): {
    year: string;
    month: string;
    day: string;
    hour: string;
    minutes: string;
    seconds: string;
};
