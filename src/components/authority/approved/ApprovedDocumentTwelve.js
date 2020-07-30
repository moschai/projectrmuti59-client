import React, { useState, useEffect } from "react";
import DocumentTwelveService from "../../../services/DocumentTwelveService";
import { Spin } from "antd";
import { Card, Col, Row } from "antd";
import "../../../styles/App.css";
import { lveducationNumberToString } from "../../../helpers/lveducation";

const ApprovedDocTwelve = ({ documentId }) => {
  const [isLoading, setLoading] = useState(true);
  const [document, setDocument] = useState({});
  useEffect(() => {
    getDocumentTwelve();
  }, []);
  const getDocumentTwelve = async () => {
    try {
      const res = await DocumentTwelveService.getDocumentTwelveByDocumentId(
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
            <Card title="ใบคำร้องขอลาออกจากการเป็นนักศึกษา" bordered={false}>
              <span className="FontThick">
                เรียน : รองอธิการบดีประจำวิทยาเขตขอนแก่น
              </span>
              <br />
              <span className="FontThick">
                มีความประสงค์ขอลาออกจากการเป็นนักศึกษาของมหาวิทยาลัย
                เทคโนโลยีราชมงคลอีสาน <br /> วิทยาเขตขอนแก่น เนื่องจาก :
              </span>
              <span className="FontSize">
                {document.type_twelve.resignsince}
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

              <span className="FontThick">เกิดวันที่ : </span>
              <span className="FontSize">
                {document.type_twelve.dayborn}
                {"  "}
              </span>

              <span className="FontThick">เดือน : </span>
              <span className="FontSize">
                {document.type_twelve.monthborn}
                {"  "}
              </span>

              <span className="FontThick">พ.ศ : </span>
              <span className="FontSize">
                {document.type_twelve.yearborn}
                {"  "}
              </span>

              <span className="FontThick">อายุ : </span>
              <span className="FontSize">
                {document.type_twelve.ageborn}
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

export default ApprovedDocTwelve;
