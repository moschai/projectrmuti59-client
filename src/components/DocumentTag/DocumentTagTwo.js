import React, { useState } from "react";
import { Form, Input, Col, Row, Divider, Button, message, Tag } from "antd";
import DocumentService from "../../services/DocumentService";
import { RenderDocumentType } from "../authority/ForAuthorityTable";
import DownloadDocumnetOnePDF from "./DocumentOnePDF";
import { lveducationNumberToString } from "../../helpers/lveducation";
import { approveStatus } from "../../helpers/approvestatus";
const DocumentTagTwo = ({ document }) => {
  return (
    <div style={{ backgroundColor: "#fff", padding: 10 }}>
      {document && (
        <>
          <Divider />
          <Row justify="center">
            <Col sm={24} className="text-center">
              <h2>
                <RenderDocumentType type={document.type_document} />
              </h2>
            </Col>
            <Col sm={24} className="text-center">
              <span className="FontThick">ชื่อ-นามสกุล : </span>
              <span className="FontSize">
                {document.student.name_std} {document.student.surname_std}
                {"  "}
              </span>

              <span className="FontThick">รหัสนักศึกษา : </span>
              <span className="FontSize">
                {document.student.id_std}
                {"  "}
              </span>

              <span className="FontThick">คณะ : </span>
              <span className="FontSize">
                {document.student.major
                  ? document.student.major.faculty.name_faculty
                  : ""}
                {"  "}
              </span>
              <br />
              <span className="FontThick">สาขาวิชา : </span>
              <span className="FontSize">
                {document.student.major
                  ? document.student.major.name_major
                  : ""}
                {"  "}
              </span>

              {""}
              <span className="FontThick">ระดับการศึกษา : </span>
              <span className="FontSize">
                {lveducationNumberToString(document.student.lveducation)}
                {"  "}
              </span>

              <span className="FontThick">ชั้นปีที่ : </span>
              <span className="FontSize">{document.type_two.classyear}</span>
              <br />
              <span className="FontThick">ระยะเวลาการศึกษา : </span>
              <span className="FontSize">
                {document.type_two.timestudy}
                {"  "}
                {"ปี"}
                {"  "}
              </span>

              <span className="FontThick">เบอร์โทรศัพท์ : </span>
              <span className="FontSize">
                {document.student.phone_std}
                {"  "}
              </span>

              <span className="FontThick">E-mail : </span>
              <span className="FontSize">{document.student.email_std}</span>
              <Divider />
              <span className="FontThick">
                สถานะการอนุมัติ อาจารย์ที่ปรึกษา :{" "}
              </span>
              <span className="FontSize">
                {approveStatus(document.type_two.signature.advisor_status_sig)}
              </span>
              <br />
              <span className="FontThick">
                สถานะการอนุมัติ หัวหน้าสาขาวิชา :{" "}
              </span>
              <span className="FontSize">
                {approveStatus(
                  document.type_two.signature.mastersubject_status_sig
                )}
              </span>
              <br />
              <span className="FontThick">
                สถานะการอนุมัติ หัวหน้างานบริการการศึกษา/หัวหน้างานสำนักงานคณบดี
                :{" "}
              </span>
              <span className="FontSize">
                {approveStatus(
                  document.type_two.signature
                    .head_service_or_deanoffice_status_sig
                )}
              </span>
              <br />
              <span className="FontThick">
                สถานะการอนุมัติ รองคณบดีฝ่ายวิชาการและวิจัย :{" "}
              </span>
              <span className="FontSize">
                {approveStatus(
                  document.type_two.signature.deputy_dean_research_status_sig
                )}
              </span>
              <br />
              <span className="FontThick">สถานะการอนุมัติ คณบดี : </span>
              <span className="FontSize">
                {approveStatus(document.type_two.signature.dean_status_sig)}
              </span>
              <br />
              <Divider />
            </Col>
            สถานะ :{"   "}
            {document.isAllSignature ? (
              <Tag color="success">
                ดำเนินการในส่วนของคณะครุศาสตร์อุตสาหกรรมสำเร็จ <br />
                โปรดบันทึกไฟล์ใบคำร้องของท่านที่ปุ่ม(ดาวโหลดแบบคำร้อง)เพื่อดำเนินการต่อในขั้นตอนต่อไป
              </Tag>
            ) : (
              <Tag color="warning">
                อยู่ระหว่างการดำเนินการในส่วนของคณะครุศาสตร์อุตสาหกรรม
              </Tag>
            )}
          </Row>
        </>
      )}
    </div>
  );
};
export default DocumentTagTwo;
