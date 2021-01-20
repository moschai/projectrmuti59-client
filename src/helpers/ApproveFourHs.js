export const ApproveFourHs = (number) => {
  if (number == "1") {
    return "นักศึกษาลงทะเบียนต่ำกว่าเกณฑ์";
  } else if (number == "2") {
    return "นักศึกษาลงทะเบียนเกินกว่าเกณฑ์เป็นครั้งแรก";
  } else if (number == "3") {
    return "นักศึกษาเคยลงทะเบียนเกินกว่าเกณฑ์แล้ว แต่เป็นภาคการศึกษาสุดท้ายที่จะสำเร็จการศึกษา";
  } else {
    return "";
  }
};
