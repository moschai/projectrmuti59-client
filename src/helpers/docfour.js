export const overlowNumberToString = (number) => {
  if (number == "10") {
    return "เกินหน่วยกิตที่กำหนด โดยมีจำนวนหน่วยกิตรวมทั้งสิ้น";
  } else if (number == "11") {
    return "ต่ำกว่าหน่วยกิตที่กำหนด โดยมีจำนวนหน่วยกิตรวมทั้งสิ้น";
  } else {
    return "";
  }
};
