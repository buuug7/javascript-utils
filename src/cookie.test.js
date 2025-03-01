import { getCookie, setCookie } from "./cookie.js";

describe("cookie test", () => {
  beforeAll(() => {
    global.document = {
      cookie:
        "pixelRatio=1.25; _ga=GA1.1.133953676.1723130044; _ym_uid=1719306668617369476; _ym_d=1739439376; _ym_isad=1; _ga_2LWB61WGYJ=GS1.1.1740831764.123.1.1740831765.0.0.0; _ym_visorc=w",
    };
  });

  it("getCookie function should work as expected", function () {
    expect(getCookie("pixelRatio")).toEqual("1.25");
    expect(getCookie("_ym_visorc")).toEqual("w");
  });

  it("setCookie function should work as expected", function () {
    setCookie("user", "testUser");
    expect(getCookie("user")).toEqual("testUser");
  });
});
