export const fixDate = (str) => {
  const [year, month, day] = str.split("-");
  const properDay = parseInt(day) < 10 ? `0${day}` : day;
  return [year, month, properDay].join("-");
};
