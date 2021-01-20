export const approveStatus = (number) => {
  if (number == "0") {
    return "อยู่ระหว่างดำเนินการ";
  } else if (number == "2") {
    return "ดำเนินการเสร็จสิ้น";
  } else if (number == "3") {
    return "ดำเนินการเสร็จสิ้น";
  }
};
