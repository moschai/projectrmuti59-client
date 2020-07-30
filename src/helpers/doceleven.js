export const purposeNumberToString = (number) => {
  if (number == "10") {
    return "ขอเปลี่ยนชื่อนักศึกษา";
  } else if (number == "11") {
    return "ค่าลาพัก/ขอเปลี่ยนชื่อ-นามสกุล";
  } else if (number == "12") {
    return "ขอเปลี่ยนชื่อ-สกุลภาษาอังกฤษ";
  } else if (number == "13") {
    return "ขอเปลี่ยนนามสกุลนักศึกษา";
  } else if (number == "14") {
    return "ขอเปลี่ยนคำนำหน้าชื่อ";
  } else if (number == "15") {
    return "แก้ไขที่อยู่นักศึกษา";
  } else {
    return "";
  }
};
