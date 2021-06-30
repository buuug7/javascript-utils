/**
 *
 * The function can only be triggered once in a unit time.
 * If this function is triggered multiple times per unit time,
 * it will only take effect once.
 *
 * 规定在一个单位时间内，只能触发一次函数。
 * 如果这个单位时间内触发多次函数，只有一次生效。
 *
 * @param {Function} fn
 * @param {number} wait
 * @return {Function}
 */
export default function throttle(fn, wait) {
  let time = null;
  function invokeFn() {
    if (!time) {
      time = setTimeout(() => {
        fn(arguments);
        time = null;
      }, wait);
    }
  }

  return invokeFn;
}
