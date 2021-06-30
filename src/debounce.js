/**
 * The callback is executed N seconds after the event is triggered.
 * If it is triggered again in this N seconds, the timer will be re timed.
 *
 * 在事件被触发 n 秒后再执行回调，如果在这 n 秒内又被触发，则重新计时。
 * @param {Function} fn
 * @param {number} wait
 * @return {(function(): void)|*}
 */
export default function debounce(fn, wait) {
  let time = null;

  return function () {
    if (time) {
      clearTimeout(time);
    }
    time = setTimeout(() => fn(...arguments), wait);
  };
}
