export const ApproveFiveHs = (number) => {
  if (number == "1") {
    return "นักศึกษาเข้ารับราชการทหาร";
  } else if (number == "2") {
    return "นักศึกษาลาพักการศึกษา/รักษาสภาพการเป็นนักศึกษาครั้งแรก";
  } else if (number == "3") {
    return " นักศึกษาลาพักศึกษาเกิน 2 ภาคการศึกษาติดต่อกันแล้ว";
  } else {
    return "";
  }
};
