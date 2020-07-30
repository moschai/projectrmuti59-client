import React, { useState, useEffect } from "react";
import DocumentTenService from "../../../services/DocumentTenService";
import { Spin } from "antd";
import { Card, Col, Row } from "antd";
import { dearNumberToString } from "../../../helpers/dear";
import { lveducationNumberToString } from "../../../helpers/lveducation";
import "../../../styles/App.css";

const ApprovedDocTen = ({ documentId }) => {
  const [isLoading, setLoading] = useState(true);
  const [document, setDocument] = useState({});
  useEffect(() => {
    getDocumentTen();
  }, []);
  const getDocumentTen = async () => {
    try {
      const res = await DocumentTenService.getDocumentTenByDocumentId(
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
            <Card title="ใบคำร้องขอลงทะเบียนเรียนเทียบรายวิชา" bordered={false}>
              <span className="FontThick">
                คำขอลงทะเบียนเรียนเทียบรายวิชา ภาคเรียนที่ :{" "}
              </span>
              <span className="FontSize">{document.type_ten.compareterm}</span>
              {"  "}
              <span className="FontThick">ปีการศึกษา : </span>
              <span className="FontSize">{document.type_ten.compareyeat}</span>
              <br />
              <span className="FontThick">เรียน : </span>
              <span className="FontSize">
                {dearNumberToString(document.type_ten.dear)}
              </span>
              <br />
              <span className="FontThick">
                มีความประสงค์ขอลงทะเบียนเรียนเทียบรายวิชา :{" "}
              </span>
              <span className="FontSize">
                {document.type_four.sumorremainunit}
                {" หน่วยกิต"}
              </span>
              <br />
              <span className="FontThick">เนื่องจาก : </span>
              <span className="FontSize">
                {document.type_four.overlowstandardsince}
              </span>
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
                {document.type_ten.cumulativeGpa}
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

export default ApprovedDocTen;
