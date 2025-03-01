(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.utils = {}));
})(this, (function (exports) { 'use strict';

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

  function getCookie(name) {
    const regex = new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)");
    const matches = document.cookie.match(regex);
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }
  function setCookie(name, value) {
    let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    options = {
      path: "/",
      ...options
    };
    if (options.expires instanceof Date) {
      options.expires = options.expires.toUTCString();
    }
    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
    for (const optionKey in options) {
      updatedCookie += "; " + optionKey;
      const optionValue = options[optionKey];
      if (optionValue !== true) {
        updatedCookie += "=" + optionValue;
      }
    }
    document.cookie = updatedCookie;
  }
  function deleteCookie(name) {
    setCookie(name, "", {
      "max-age": -1
    });
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

  function EventBus() {
    const message = {};

    /**
     * listen event by name
     * @param {string} name
     * @param {Function} fn
     * @returns
     */
    function on(name, fn) {
      if (message[name]) {
        message[name].push(fn);
        return;
      }
      message[name] = [fn];
    }

    /**
     * off event by event name and fn
     * @param {string} name
     * @param {Function} fn
     */
    function off(name, fn) {
      const tasks = message[name];
      if (tasks) {
        message[name] = tasks.filter(it => it !== fn);
      }
    }

    /**
     * emit event
     * @param {string} name
     * @param  {...any} args
     */
    function emit(name) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }
      const tasks = message[name];
      if (tasks) {
        tasks.forEach(it => it(...args));
      }
    }

    /**
     * emit event and return thenable promise
     * you can control return promise with waitUntil function
     * @param {string} eventName
     * @param  {...any} rest
     * @return {Promise}
     */
    function emitThen(eventName) {
      const event = {
        defaultPrevent: false,
        preventDefault() {
          this.defaultPrevent = true;
        },
        waitUntil(p) {
          this.wait = p.then(data => {
            event.resolveData = data;
            return event;
          });
        }
      };
      event.wait = Promise.resolve(event);
      for (var _len2 = arguments.length, rest = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        rest[_key2 - 1] = arguments[_key2];
      }
      emit(eventName, event, ...rest);
      return event.wait;
    }
    return {
      on,
      off,
      emit,
      emitThen
    };
  }

  /**
   * generate short UID
   * @returns
   */
  function generateShortUID() {
    // I generate the UID from two parts here
    // to ensure the random number provide enough bits.
    let firstPart = Math.random() * 46656 | 0;
    let secondPart = Math.random() * 46656 | 0;
    firstPart = ("000" + firstPart.toString(36)).slice(-3);
    secondPart = ("000" + secondPart.toString(36)).slice(-3);
    return firstPart + secondPart;
  }

  /**
   * group array by key
   * @param {Array} arr
   * @param {string} key
   * @returns
   */
  function groupBy(arr, key) {
    return arr.reduce((group, item) => {
      const value = item[key];
      group[value] = group[value] ? [...group[value], item] : [item];
      return group;
    }, {});
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
   * 金额大小写
   * number to upper case
   * @param {*} n
   * @returns
   */
  function numberToUpper(n) {
    const fraction = ["角", "分"];
    const digit = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"];
    const unit = [["元", "万", "亿"], ["", "拾", "佰", "仟"]];
    const head = n < 0 ? "欠" : "";
    n = Math.abs(n);
    let s = "";
    // 小数部分映射
    for (let is = 0; is < fraction.length; is++) {
      s += (digit[getNthDecimal(n, is)] + fraction[is]).replace(/零./, "");
    }
    s = s || "整";
    n = Math.floor(n);
    // 整数部分映射
    for (let i = 0; i < unit[0].length && n > 0; i++) {
      let p = "";
      for (let j = 0; j < unit[1].length && n > 0; j++) {
        p = digit[n % 10] + unit[1][j] + p;
        n = Math.floor(n / 10);
      }
      s = p.replace(/(零.)*零$/, "").replace(/^$/, "零") + unit[0][i] + s;
    }
    return head + s.replace(/(零.)*零元/, "元").replace(/(零.)+/g, "零").replace(/^整$/, "零元整");
  }

  // 取小数第几位，解决js乘法精度问题
  function getNthDecimal(num, Nth) {
    const numberInString = num.toString();
    const dotIndex = numberInString.indexOf(".");
    const result = dotIndex + Nth + 1;
    // 无小数部分 或者 没有更多的小数(OutOfIndex)
    if (dotIndex === -1 || result === numberInString.length) return 0;
    return parseInt(numberInString[result]);
  }

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
   * random a number between max and min
   * @param {number} max
   * @param {number} min
   * @return {number}
   */
  function randomBetween(max, min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * wait ms second
   * @param {*} ms seconds for wait
   * @returns
   */
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * split str to chunk with n length
   * @param {string} str
   * @param {number} n
   * @returns {string[]}
   */
  function strToChunk(str) {
    let n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    const reg = new RegExp(`.{1,${n}}`, "g");
    return str.match(reg);
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
   * search tree
   *
   * @param {object} tree
   * @param {string} searchKey
   * @returns
   */
  function treeSearch(tree, searchKey) {
    if (tree.key === searchKey) {
      return tree;
    } else if (tree.children?.length) {
      let result = null;
      for (let i = 0; i < tree.children.length; i++) {
        result = treeSearch(tree.children[i], searchKey);
        if (result) {
          break;
        }
      }
      return result;
    }
    return null;
  }

  exports.EventBus = EventBus;
  exports.base64ToBlob = base64ToBlob;
  exports.debounce = debounce;
  exports.deleteCookie = deleteCookie;
  exports.generateShortUID = generateShortUID;
  exports.getCookie = getCookie;
  exports.groupBy = groupBy;
  exports.isEmptyObject = isEmptyObject;
  exports.loadScript = loadScript;
  exports.loadStyle = loadStyle;
  exports.numberToUpper = numberToUpper;
  exports.parseTime = parseTime;
  exports.randomBetween = randomBetween;
  exports.setCookie = setCookie;
  exports.sleep = sleep;
  exports.strToChunk = strToChunk;
  exports.throttle = throttle;
  exports.treeSearch = treeSearch;

}));
