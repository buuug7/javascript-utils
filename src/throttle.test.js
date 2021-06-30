import throttle from "./throttle";

it("should worked as expected", function () {
  jest.useFakeTimers();
  const cb = jest.fn();
  cb.mockReturnValue("invoked")

  const throttleFn = throttle(cb, 1000)
  throttleFn();
  throttleFn();
  throttleFn();

  expect(cb).not.toBeCalled();
  jest.runAllTimers();
  expect(cb).toBeCalled();
  expect(cb.mock.calls.length).toBe(1)
  expect(cb.mock.results[0].value).toBe('invoked')
});
