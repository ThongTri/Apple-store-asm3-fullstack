export function formatNumber(str) {
  let number = "";
  let count = 0;
  for (let i = str.length - 1; i >= 0; i--) {
    number = str[i] + number;
    count++;
    if (count % 3 === 0 && i !== 0) {
      number = "." + number;
    }
  }
  return number + " VND";
}
