import React, { useState, useEffect } from "react";
import DocumentTwoService from "../../../services/DocumentTwoService";
import { Spin } from "antd";
import { Card, Col, Row } from "antd";
import "../../../styles/App.css";
import { lveducationNumberToString } from "../../../helpers/lveducation";
import { dearNumberToString } from "../../../helpers/dear";

const ApprovedDocTwo = ({ documentId }) => {
  const [isLoading, setLoading] = useState(true);
  const [document, setDocument] = useState({});
  useEffect(() => {
    getDocumentTwo();
  }, []);

  const getDocumentTwo = async () => {
    try {
      const res = await DocumentTwoService.getDocumentTwoByDocumentId(
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
            <Card title="ใบคำร้องขอกลับเข้าศึกษา " bordered={false}>
              <span className="FontThick">ภาคเรียนที่ : </span>
              <span className="FontSize">{document.type_two.returnterm}</span>
              {"  "}
              <span className="FontThick">ปีการศึกษา : </span>
              <span className="FontSize">{document.type_two.returnyear}</span>
              <br />
              <span className="FontThick">เรียน : </span>
              <span className="FontSize">
                {dearNumberToString(document.type_two.dear)}
              </span>
              <br />
              <span className="FontThick">
                มีความประสงค์ ขอกลับเข้าศึกษาในมหาวิทยาลัย
                เพื่อลงทะเบียนวิชาเรียนให้ครบตาม
                <br />
                โครงสร้าง หลักสูตรที่มหาวิทยาลัยกำหนด ในภาคการศึกษาที่:{" "}
              </span>
              <span className="FontSize">{document.type_two.returnterm}</span>
              {"  "}
              <span className="FontThick">ปีการศึกษา : </span>
              <span className="FontSize">{document.type_two.returnyear}</span>
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
              <span className="FontSize">{document.type_two.classyear}</span>
              <br />

              <span className="FontThick">ระยะเวลาการศึกษา : </span>
              <span className="FontSize">
                {document.type_two.timestudy}
                {"ปี"}
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
            </Card>
          </Col> */}
        </Row>
      </div>
    );
  }
};

export default ApprovedDocTwo;
