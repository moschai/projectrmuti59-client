import React, { useState, useEffect } from "react";
import DocumentSixteenService from "../../../services/DocumentSixteenService";
import { Spin } from "antd";
import { Card, Col, Row } from "antd";
import { lveducationNumberToString } from "../../../helpers/lveducation";
import { dearNumberToString } from "../../../helpers/dear";
import "../../../styles/App.css";

const ApprovedDocSixteen = ({ documentId }) => {
  const [isLoading, setLoading] = useState(true);
  const [document, setDocument] = useState({});
  useEffect(() => {
    getDocumentSixteen();
  }, []);
  const getDocumentSixteen = async () => {
    try {
      const res = await DocumentSixteenService.getDocumentSixteenByDocumentId(
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
            <Card title="ใบคำร้องขอสำเร็จการศึกษาล่าช้า " bordered={false}>
              <span className="FontThick">
                คำร้องขอสำเร็จการศึกษา ภาคเรียนที่ :{" "}
              </span>
              <span className="FontSize">
                {document.type_sixteen.delaygraduationterm}
              </span>
              {"  "}
              <span className="FontThick">ปีการศึกษา : </span>
              <span className="FontSize">
                {document.type_sixteen.delaygraduationyear}
              </span>
              <br />
              <span className="FontThick">เรื่อง ขอสำเร็จการศึกษาล่าช้า</span>
              <br />
              <span className="FontThick">เรียน : </span>
              <span className="FontSize">
                {dearNumberToString(document.type_sixteen.dear)}
              </span>
              <br />
              <span className="FontThick">
                มีความประสงค์ ขอสำเร็จการศึกษาล่าช้า ภาคการศึกษาที่:{" "}
              </span>
              <span className="FontSize">
                {document.type_sixteen.delaygraduationterm}
              </span>
              {"  "}
              <span className="FontThick">ปีการศึกษา : </span>
              <span className="FontSize">
                {document.type_sixteen.delaygraduationyear}
              </span>
              <br />
              <span className="FontThick">เนื่องจาก : </span>
              <span className="FontSize">{document.type_sixteen.since}</span>
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
              <span className="FontSize">
                {document.type_sixteen.classyear}
              </span>
              <br />

              <span className="FontThick">ระยะเวลาการศึกษา : </span>
              <span className="FontSize">
                {document.type_sixteen.timestudy}
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

export default ApprovedDocSixteen;
