import EventBus from "./event-bus";

describe("event bus test", () => {
  it("emit should work as expected", (done) => {
    const eventBus = EventBus();
    eventBus.on("eventA", (evt) => {
      expect(evt).toHaveProperty("data");
      expect(evt.data).toEqual("hello world");
      done();
    });
    eventBus.emit("eventA", { data: "hello world" });
  });

  it("emitThen should work as expected", (done) => {
    const eventBus = EventBus();
    eventBus.on("eventA", (evt) => {
      evt.waitUntil(
        new Promise((resolve) => {
          setTimeout(() => {
            resolve("world");
          }, 2000);
        })
      );
    });

    eventBus.emitThen("eventA", { data: "hello" }).then((evt) => {
      expect(evt.resolveData).toEqual("world");
      done();
    });
  });
});
