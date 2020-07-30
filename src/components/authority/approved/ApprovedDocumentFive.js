import React, { useState, useEffect } from "react";
import DocumentFiveService from "../../../services/DocumentFiveService";
import { Spin } from "antd";
import { Card, Col, Row } from "antd";
import "../../../styles/App.css";
import { dearNumberToString } from "../../../helpers/dear";
import { takeleaveNumberToString } from "../../../helpers/docfive";
import { lveducationNumberToString } from "../../../helpers/lveducation";

const ApprovedDocFive = ({ documentId }) => {
  const [isLoading, setLoading] = useState(true);
  const [document, setDocument] = useState({});
  useEffect(() => {
    getDocumentFive();
  }, []);
  const getDocumentFive = async () => {
    try {
      const res = await DocumentFiveService.getDocumentFiveByDocumentId(
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
          <Col span={12}>
            <Card
              title="ใบคำร้องขอลาพักการศึก/ขอรักษาสถานภาพการเป็นนักศึกษา"
              bordered={false}
            >
              <span className="FontThick">คำร้อง : </span>
              <span className="FontSize">
                {takeleaveNumberToString(document.type_five.maintaintake)}
              </span>
              <br />
              <span className="FontThick">ภาคการศึกษาที่ : </span>
              <span className="FontSize">
                {document.type_five.takeleaveterm}
              </span>
              {"  "}
              <span className="FontThick">ปีการศึกษา : </span>
              <span className="FontSize">
                {document.type_five.takeleaveyear}
              </span>
              <br />
              <span className="FontThick">เรียน : </span>
              <span className="FontSize">
                {dearNumberToString(document.type_five.dear)}
              </span>
              <br />
              <span className="FontThick">มีความประสงค์ขอลงทะเบียน : </span>
              <span className="FontSize">
                {takeleaveNumberToString(document.type_five.maintaintake)}
              </span>
              <br />
              <span className="FontThick">ในภาคการศึกษาที่ : </span>
              <span className="FontSize">
                {document.type_five.takeleaveterm}
              </span>
              {"  "}
              <span className="FontThick">ปีการศึกษา : </span>
              <span className="FontSize">
                {document.type_five.takeleaveyear}
              </span>
              {"  "}
              <span className="FontThick">ครั้งที่ : </span>
              <span className="FontSize">{document.type_five.takeleaveno}</span>
              <br />
              <span className="FontThick">เนื่องจาก : </span>
              <span className="FontSize">{document.type_five.since}</span>
              <br />
            </Card>
          </Col>
          <Col span={12}>
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
              <span className="FontThick">เกรดเฉลี่ยสะสม : </span>
              <span className="FontSize">
                {document.type_five.cumulativeGpa}
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

export default ApprovedDocFive;
