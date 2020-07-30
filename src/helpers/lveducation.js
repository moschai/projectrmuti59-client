export const lveducationNumberToString = (number) => {
  if (number == "10") {
    return "ปวช.";
  } else if (number == "11") {
    return "ปวส.";
  } else if (number == "12") {
    return "ปริญญาตรี";
  } else if (number == "13") {
    return "ปริญญาโท";
  } else if (number == "14") {
    return "ปริญญาเอก";
  } else {
    return "";
  }
};
