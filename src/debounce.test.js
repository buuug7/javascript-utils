import debounce from "./debounce";

it("should worked as expected", function () {
  jest.useFakeTimers();
  const cb = jest.fn();
  cb.mockReturnValue("invoked");

  const invokeFn = debounce(cb, 1000);
  invokeFn();
  invokeFn();
  invokeFn();

  expect(cb).not.toBeCalled();
  jest.runAllTimers();
  expect(cb).toBeCalled();
  expect(cb.mock.calls.length).toBe(1);
  expect(cb.mock.results[0].value).toBe("invoked");
});
