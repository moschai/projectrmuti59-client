export const tableStatusApprove = (Boolean) => {
  if (Boolean == false) {
    return "อยู่ระหว่างดำเนินการ";
  } else if (Boolean == true) {
    return "ดำเนินการเสร็จสิ้น";
    // } else if (number == "3") {
    //   return "ดำเนินการเสร็จสิ้น";
  }
};
