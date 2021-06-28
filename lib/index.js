(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.utils = {}));
}(this, (function (exports) { 'use strict';

  /**
   * parse Date instance
   * @param {Date} time
   * @return {{seconds: string, month: string, hour: string, year: string, minutes: string, day: string}}
   */
  function parseTime(time) {
    const year = time.getFullYear().toString();
    const month = (time.getMonth() + 1).toString().replace(/^(\d)$/, "0$1");
    const day = time.getDate().toString().replace(/^(\d)$/, "0$1");
    const hour = time.getHours().toString().replace(/^(\d)$/, "0$1");
    const minutes = time.getMinutes().toString().replace(/^(\d)$/, "0$1");
    const seconds = time.getSeconds().toString();
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

  exports.isEmptyObject = isEmptyObject;
  exports.parseTime = parseTime;
  exports.randomBetween = randomBetween;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
