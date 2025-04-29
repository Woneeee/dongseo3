export const Commas = (number) => {
  if (number == null) return "";
  if (typeof number !== "number" && isNaN(Number(number))) return number;
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
