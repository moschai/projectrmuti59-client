export const convertToThaiYear = (dateString = "") => {
  return dateString.replace(/(\d{4})/, (year) => Number(year) + 543);
};
