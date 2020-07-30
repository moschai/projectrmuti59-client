import React, { useState, useEffect } from "react";
import DocumentEightService from "../../../services/DocumentEightService";
import { Spin } from "antd";
import { Card, Col, Row } from "antd";
import "../../../styles/App.css";
import { lveducationNumberToString } from "../../../helpers/lveducation";
import { sinceNumberToString } from "../../../helpers/doceight";

const ApprovedDocEight = ({ documentId }) => {
  const [isLoading, setLoading] = useState(true);
  const [document, setDocument] = useState({});
  useEffect(() => {
    getDocumentEight();
  }, []);
  const getDocumentEight = async () => {
    try {
      const res = await DocumentEightService.getDocumentEightByDocumentId(
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
      <div className="blackground">
        <Row gutter={16}>
          <Col span={14}>
            <Card
              title="ใบคำร้องเปลี่ยนกลุ่มเรียน(รายวิชาที่ลงทะเบียนเรียน)"
              bordered={false}
            >
              <span className="FontThick">ภาคการศึกษาที่ : </span>
              <span className="FontSize">{document.type_eight.termstudy}</span>
              {"  "}
              <span className="FontThick">ปีการศึกษา : </span>
              <span className="FontSize">{document.type_eight.yearstudy}</span>
              <br />
              <span className="FontThick">
                มีความประสงค์ ขอเปลี่ยนกลุ่มเรียน ภาคการศึกษาที่:{" "}
              </span>
              <span className="FontSize">
                {document.type_eight.movinggroupterm}
              </span>
              {"  "} <span className="FontThick">ปีการศึกษา : </span>
              <span className="FontSize">
                {document.type_eight.movinggroupyear}
              </span>
              <br />
              <span className="FontThick">เนื่องจาก : </span>
              <span className="FontSize">
                {sinceNumberToString(document.type_eight.since)}{" "}
                {document.type_eight.othermassege}
              </span>
              <br />
            </Card>
          </Col>
          <Col span={10}>
            <Card title="" bordered={false}>
              <span className="FontThick">ชื่อ-นามสกุล : </span>
              <span className="FontSize">
                {document.student.name_std} {document.student.surname_std}
              </span>
              <br />
              <span className="FontThick">รหัสนักศึกษา : </span>
              <span className="FontSize">{document.student.id_std}</span>
              <br />
              <span className="FontThick">คณะ : </span>
              <span className="FontSize">
                {document.student.major
                  ? document.student.major.faculty.name_faculty
                  : ""}
              </span>
              <br />
              <span className="FontThick">สาขาวิชา : </span>
              <span className="FontSize">
                {document.student.major
                  ? document.student.major.name_major
                  : ""}
              </span>
              <br />
              {""}
              <span className="FontThick">ระดับการศึกษา : </span>
              <span className="FontSize">
                {lveducationNumberToString(document.student.lveducation)}
              </span>
              <br />
              <span className="FontThick">ชั้นปีที่ : </span>
              <span className="FontSize">{document.type_eight.classyear}</span>
              <br />
              <span className="FontThick">ระยะเวลาการศึกษา : </span>
              <span className="FontSize">
                {document.type_eight.timestudy}
                {" ปี"}
              </span>
              <br />
              <span className="FontThick">เบอร์โทรศัพท์ : </span>
              <span className="FontSize">{document.student.phone_std}</span>
              <br />

              <span className="FontThick">E-mail : </span>
              <span className="FontSize">{document.student.email_std}</span>
            </Card>
          </Col>
          {/* <Col span={8}>
            <Card title="" bordered={false}>
              Card content
            </Card> */}
          {/* </Col> */}
        </Row>
      </div>
    );
  }
};

export default ApprovedDocEight;
