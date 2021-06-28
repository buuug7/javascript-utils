(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.utils = {}));
}(this, (function (exports) { 'use strict';

  class parseTime {
    /**
     * parse Date instance
     * @param {Date} time
     * @return {{seconds: string, month: string, hour: string, year: string, minutes: string, day: string}}
     */
    constructor(time) {
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

  }

  exports.parseTime = parseTime;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
