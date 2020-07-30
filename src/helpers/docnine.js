export const topicNumberToString = (number) => {
  if (number == "10") {
    return "ค่าลงทะเบียนรายวิชา";
  } else if (number == "11") {
    return "ค่าลาพัก/รักษาสถานภาพ";
  } else if (number == "12") {
    return "ค่าเพิ่มรายวิชา";
  } else if (number == "13") {
    return "ค่าถอนรายวิชา";
  } else {
    return "";
  }
};
