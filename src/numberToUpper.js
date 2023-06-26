/**
 * 金额大小写
 * number to upper case
 * @param {*} n
 * @returns
 */
export default function numberToUpper(n) {
  const fraction = ["角", "分"];
  const digit = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"];
  const unit = [
    ["元", "万", "亿"],
    ["", "拾", "佰", "仟"],
  ];
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
  return (
    head +
    s
      .replace(/(零.)*零元/, "元")
      .replace(/(零.)+/g, "零")
      .replace(/^整$/, "零元整")
  );
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
