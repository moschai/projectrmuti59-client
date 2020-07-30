export const dearNumberToString = (number) => {
  if (number == "10") {
    return "รองอธิการบดีประจำวิทยาเขตขอนแก่น";
  } else if (number == "11") {
    return "คณบดี";
  } else if (number == "12") {
    return "คณบดีคณะวิศวกรรมศาสตร์";
  } else if (number == "13") {
    return "คณบดีคณะครุศาสตร์อุตสาหกรรม";
  } else if (number == "14") {
    return "คณบดีคณะบริหารธุรกิจและเทคโนโลยีสารสนเทศ";
  } else {
    return "";
  }
};
