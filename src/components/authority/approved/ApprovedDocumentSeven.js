import React, { useState, useEffect } from "react";
import DocumentSevenService from "../../../services/DocumentSevenService";
import { Spin } from "antd";
import { Card } from "antd";
import "../../../styles/App.css";

const ApprovedDocSeven = ({ documentId }) => {
  const [isLoading, setLoading] = useState(true);
  const [document, setDocument] = useState({});
  useEffect(() => {
    getDocumentSeven();
  }, []);
  const getDocumentSeven = async () => {
    try {
      const res = await DocumentSevenService.getDocumentSevenByDocumentId(
        documentId
      );
      console.log(res);
      setDocument(res);
      console.log(document);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  if (isLoading) {
    return <Spin tip="loading..." />;
  } else {
    return (
      <div>
        <Card
          title="ใบคำร้องถอนรายวิชาล่าช้า "
          bordered={false}
          style={{ width: 1121 }}
        >
          <span className="FontThick">ชื่อ-นามสกุล : </span>
          <span>
            {document.student.name_std} {document.student.surname_std}{" "}
          </span>
          <span className="FontThick">รหัสนักศึกษา : </span>
          <span>{document.student.id_std}</span>{" "}
          <span className="FontThick">คณะ : </span>
          <span>{document.student.lveducation}</span> <br />
          <span className="FontThick">สาขาวิชา : </span>
          <span>{document.student.major}</span>
          {""}
        </Card>
      </div>
    );
  }
};

export default ApprovedDocSeven;
