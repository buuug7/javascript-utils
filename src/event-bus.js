export default function EventBus() {
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
      message[name] = tasks.filter((it) => it !== fn);
    }
  }

  /**
   * off event by name
   * @param {string} name
   */
  function offByName(name) {
    message[name] = [];
  }

  /**
   * emit event
   * @param {string} name
   * @param  {...any} args
   */
  function emit(name, ...args) {
    const tasks = message[name];
    if (tasks) {
      tasks.forEach((it) => it(...args));
    }
  }

  /**
   * emit event and return thenable promise
   * you can control return promise with waitUntil function
   * @param {string} eventName
   * @param  {...any} rest
   * @returns
   */
  function emitThen(eventName, ...rest) {
    const event = {
      defaultPrevent: false,
      preventDefault() {
        this.defaultPrevent = true;
      },
      waitUntil(p) {
        this.wait = p.then((data) => {
          event.resolveData = data;
          return event;
        });
      },
    };

    event.wait = Promise.resolve(event);
    emit(eventName, event, ...rest);
    return event.wait;
  }

  return {
    on,
    off,
    emit,
    emitThen,
  };
}
