import React, { useState, useEffect } from "react";
import { Table, Radio, Divider } from "antd";
import DocumentService from "../../services/DocumentService";
import Modal from "antd/lib/modal/Modal";
import moment from "moment";
import { Link } from "react-router-dom";
import { appPath } from "../../router/path";

const RenderDocumentType = ({ type }) => {
  if (type === 1) {
    return "แบบคำร้องทั่วไป";
  } else if (type === 2) {
    return "แบบคำร้องขอกลับเข้าศึกษา";
  } else if (type === 3) {
    return "แบบคำร้องขอคืนสภาพการเป็นนักศึกษา(เนื่องจากถูกถอนชื่อจากการเป็นนักศึกษา)";
  } else if (type === 4) {
    return "แบบคำร้องขอลงทะเบียน เกิน/ต่ำกว่าเกฑ์ที่กำหนด";
  } else if (type === 5) {
    return "คำร้องขอลาพักการเรียนรักษาสภาพเพื่อรอสำเร็จการศึกาษา";
  } else if (type === 6) {
    return "แบบคำร้องขอลงทะเบียนเพิ่ม/ถอนรายวิชาล่าช้า";
  } else if (type === 7) {
    return "แบบคำร้องขอลงทะเบียนเรียน";
  } else if (type === 8) {
    return "แบบคำร้องขอย้ายกลุ่มเรียน";
  } else if (type === 9) {
    return "แบบคำร้องขอชำระเงินล่าช้า";
  } else if (type === 10) {
    return "แบบคำร้องขอลงทะเบียนเรียนเทียบรายวิชา";
  } else if (type === 11) {
    return "แบบคำร้องขอเปลี่ยนข้อมูลประวัติ";
  } else if (type === 12) {
    return "แบบคำร้องขอลาออกจากการเป็นนักศึกษา";
  } else if (type === 13) {
    return "แบบคำร้องขอเอกสารทางการศึกษา";
  } else if (type === 14) {
    return "แบบคำร้องขอใบรับรองความประพฤติ";
  } else if (type === 15) {
    return "แบบคำร้องขอสำเร็จการศึกษา";
  } else if (type === 16) {
    return "แบบคำร้องขอสำเร็จการรศึกษาล่าช้า";
  } else if (type === 17) {
    return "แบบคำร้องแก้ไขหมวดวิชาตามโครงสร้างหลักสูตร";
  } else {
    return "ไม่ตรง";
  }
};

const columns = [
  {
    title: "รหัสใบคำร้อง",
    dataIndex: "id",
    align: "center",
  },
  {
    title: "ประเภทใบคำร้อง",
    dataIndex: "type_document",
    align: "center",
    render: (type) => (
      <span>
        <RenderDocumentType type={type} />
      </span>
    ),
  },
  {
    title: "ชื่อ",
    dataIndex: "student",
    render: (student) => {
      return <span>{student.name_std}</span>;
    },
  },
  {
    title: "นามสกุล",
    dataIndex: "student",
    render: (student) => {
      return <span>{student.surname_std}</span>;
    },
  },
  {
    title: "เวลา",
    dataIndex: "created",
    align: "center",
    render: (date) => <span>{moment(date).format("DD/MM/YYYY HH:mm")}</span>,
  },
  {
    title: "รายละเอียด",
    align: "center",
    render: (document) => (
      <Link
        to={`${appPath.authority.root}${appPath.authority.approve}/${document.id}?type=${document.type_document}`}
      >
        รายละเอียด
      </Link>
    ),
  },
];

const ForAuthorityTable = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    getDocument();
  }, []);

  const getDocument = async () => {
    try {
      const res = await DocumentService.getDocumentForAuthority();
      setData(res.data);
      console.log(res);
    } catch (error) {}
  };

  return (
    <div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default ForAuthorityTable;
