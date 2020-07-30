import React, { useState, useEffect } from "react";
import DocumentThreeService from "../../../services/DocumentThreeService";
import { Spin } from "antd";
import { Card, Col, Row } from "antd";

import "../../../styles/App.css";
import { lveducationNumberToString } from "../../../helpers/lveducation";

const ApprovedDocThree = ({ documentId }) => {
  const [isLoading, setLoading] = useState(true);
  const [document, setDocument] = useState({});
  useEffect(() => {
    getDocumentThree();
  }, []);
  const getDocumentThree = async () => {
    try {
      const res = await DocumentThreeService.getDocumentThreeByDocumentId(
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
            <Card title="ใบคำร้องขอคืนสถานภาพการเป็นนักศึกษา " bordered={false}>
              <span className="FontThick">ภาคเรียนที่ : </span>
              <span className="FontSize">{document.type_three.returnterm}</span>
              <br />
              <span className="FontThick">ปีการศึกษา : </span>
              <span className="FontSize">{document.type_three.returnyear}</span>
              <br />
              <span className="FontThick">เรียน : </span>
              <span className="FontSize">{"คณบดีประจำวิทยาเขตขอนแก่น"}</span>
              <br />

              <span className="FontThick">
                มีความประสงค์: ขอคืนสภาพนักศึกษา
                เนื่องจากถูกถอนชื่อออกจากทะเบียนนักศึกษา
                <br />
                ภาคการศึกษาที่:{" "}
              </span>
              <span className="FontSize">{document.type_three.leaveterm}</span>
              {"  "}
              <span className="FontThick">ปีการศึกษา : </span>
              <span className="FontSize">{document.type_three.leaveyear}</span>
              <br />
              <span className="FontThick">
                ทั้งนี้ข้าพเจ้า ขอคืนสถานภาพการเป็นนักศึกษา เพื่อกลับเข้าศึกษา
                <br />
                ในภาคการศึกษาที่:{" "}
              </span>
              <span className="FontSize">{document.type_three.returnterm}</span>
              {"  "}
              <span className="FontThick">ปีการศึกษา : </span>
              <span className="FontSize">{document.type_three.returnyear}</span>
              {"  "}
              <span className="FontThick">
                ซึ่งยังไม่พ้นกำหนดระยะเวลา 1 ปี
                นับตั้งแต่ถูกถอนชื่อออกจากทะเบียนนักศึกษา
                <br />
                ตามข้อบังคับของมหาวิทยาลัยเทคโนโลยีราชมงคลอีสาน
              </span>
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
              <span className="FontSize">{document.type_three.classyear}</span>
              <br />

              <span className="FontThick">ระยะเวลาการศึกษา : </span>
              <span className="FontSize">
                {document.type_three.timestudy}
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

export default ApprovedDocThree;
