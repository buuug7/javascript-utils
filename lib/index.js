(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.utils = {}));
})(this, (function (exports) { 'use strict';

  /**
   * parse Date instance
   * @param {Date | number} time
   * @return {{year: string, month: string, day: string, hour: string, minutes: string, seconds: string}}
   */
  function parseTime(time) {
    const date = new Date(time);
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().replace(/^(\d)$/, "0$1");
    const day = date.getDate().toString().replace(/^(\d)$/, "0$1");
    const hour = date.getHours().toString().replace(/^(\d)$/, "0$1");
    const minutes = date.getMinutes().toString().replace(/^(\d)$/, "0$1");
    const seconds = date.getSeconds().toString();
    return {
      year,
      month,
      day,
      hour,
      minutes,
      seconds
    };
  }

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

  /**
   * random a number between max and min
   * @param {number} max
   * @param {number} min
   * @return {number}
   */
  function randomBetween(max, min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * dynamic load script into html
   * @param {string} url
   */
  function loadScript(url) {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    document.body.appendChild(script);
  }

  /**
   * dynamic load style
   * @param url
   */
  function loadStyle(url) {
    const link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = url;
    document.head.appendChild(link);
  }

  /**
   * The callback is executed N seconds after the event is triggered.
   * If it is triggered again in this N seconds, the timer will be re timed.
   *
   * 在事件被触发 n 秒后再执行回调，如果在这 n 秒内又被触发，则重新计时。
   * @param {Function} fn
   * @param {number} wait
   * @return {(function(): void)|*}
   */
  function debounce(fn, wait) {
    let time = null;
    return function () {
      if (time) {
        clearTimeout(time);
      }
      time = setTimeout(() => fn(...arguments), wait);
    };
  }

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
  function throttle(fn, wait) {
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

  /**
   * base64 to blob
   * @param base64
   * @param type
   * @return {Promise<Blob | Promise<Blob>>}
   */
  function base64ToBlob(base64) {
    let type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "application/octet-stream";
    return fetch(`data:${type};base64,${base64}`).then(res => res.blob());
  }

  exports.base64ToBlob = base64ToBlob;
  exports.debounce = debounce;
  exports.isEmptyObject = isEmptyObject;
  exports.loadScript = loadScript;
  exports.loadStyle = loadStyle;
  exports.parseTime = parseTime;
  exports.randomBetween = randomBetween;
  exports.throttle = throttle;

}));
