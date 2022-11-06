export const fixDate = (str) => {
  const [year, month, day] = str.split("-");
  const properDay = parseInt(day) < 10 ? `0${day}` : day;
  const properMonth =
    month == "0" ? "01" : parseInt(month) < 10 ? `0${month}` : month;

  return [year, properMonth, properDay].join("-");
};
