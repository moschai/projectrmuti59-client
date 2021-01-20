import React, { useState } from "react";
import { Form, Input, Col, Row, Divider, Button, message, Tag } from "antd";
import DocumentService from "../../services/DocumentService";
import { RenderDocumentType } from "../authority/ForAuthorityTable";
import DownloadDocumnetOnePDF from "./DocumentOnePDF";
import { lveducationNumberToString } from "../../helpers/lveducation";
import { approveStatus } from "../../helpers/approvestatus";
import { tableStatusApprove } from "../../helpers/tableStatus";
const DocumentTagTen = ({ document }) => {
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

              <span className="FontThick">เกรดเฉลี่ยสะสม : </span>
              <span className="FontSize">
                {document.type_ten.cumulativeGpa}
              </span>
              <br />

              <span className="FontThick">เบอร์โทรศัพท์ : </span>
              <span className="FontSize">
                {document.student.phone_std}
                {"  "}
              </span>

              <span className="FontThick">E-mail : </span>
              <span className="FontSize">{document.student.email_std}</span>
              <Divider />

              <span className="FontThick">ข้อมูลรายวิชา</span>
              {document.type_ten.tables.map((table) => {
                return (
                  <div key={table.idtable}>
                    <span className="FontThick">รหัสวิชา : </span>
                    <span className="FontSize">
                      {table.id_subject.id_subject}
                      {"    "}
                    </span>

                    <span className="FontThick">ชื่อวิชา : </span>
                    <span className="FontSize">
                      {" "}
                      {table.id_subject.name_subject}
                      {"    "}
                    </span>

                    <span className="FontThick">หน่วยกิต : </span>
                    <span className="FontSize">
                      {" "}
                      {table.id_subject.unit_subject}
                      {"    "}
                    </span>
                    <br />

                    <span className="FontThick">รหัสวิชา : </span>
                    <span className="FontSize">
                      {table.id_subjectnew.id_subject}
                      {"    "}
                    </span>

                    <span className="FontThick">ชื่อวิชา : </span>
                    <span className="FontSize">
                      {" "}
                      {table.id_subjectnew.name_subject}
                      {"    "}
                    </span>

                    <span className="FontThick">หน่วยกิต : </span>
                    <span className="FontSize">
                      {" "}
                      {table.id_subjectnew.unit_subject}
                      {"    "}
                    </span>

                    <span className="FontThick">สถานะการอนุมัติ : </span>
                    <span className="FontSize">
                      {" "}
                      {tableStatusApprove(table.is_success)}
                    </span>
                    <br />
                  </div>
                );
              })}
              <Divider />
              <span className="FontThick">
                สถานะการอนุมัติ คณะกรรมการประจำหลักสูตรคนที่ 1 :{" "}
              </span>
              <span className="FontSize">
                {approveStatus(
                  document.type_ten.signature.boardsubjectone_status_sig
                )}
              </span>
              <br />
              <span className="FontThick">
                สถานะการอนุมัติ คณะกรรมการประจำหลักสูตรคนที่ 2 :{" "}
              </span>
              <span className="FontSize">
                {approveStatus(
                  document.type_ten.signature.boardsubjecttwo_status_sig
                )}
              </span>
              <br />
              <span className="FontThick">
                สถานะการอนุมัติ คณะกรรมการประจำหลักสูตรคนที่ 3 :{" "}
              </span>
              <span className="FontSize">
                {approveStatus(
                  document.type_ten.signature.boardsubjectthree_status_sig
                )}
              </span>
              <br />
              <span className="FontThick">
                สถานะการอนุมัติ คณะกรรมการประจำหลักสูตรคนที่ 4 :{" "}
              </span>
              <span className="FontSize">
                {approveStatus(
                  document.type_ten.signature.boardsubjectfour_status_sig
                )}
              </span>
              <br />
              <span className="FontThick">
                สถานะการอนุมัติ อาจารย์ที่ปรึกษา :{" "}
              </span>
              <span className="FontSize">
                {approveStatus(document.type_ten.signature.advisor_status_sig)}
              </span>
              <br />
              <span className="FontThick">
                สถานะการอนุมัติ หัวหน้าสาขาวิชา :{" "}
              </span>
              <span className="FontSize">
                {approveStatus(
                  document.type_ten.signature.mastersubject_status_sig
                )}
              </span>
              <br />
              <span className="FontThick">
                สถานะการอนุมัติ หัวหน้างานบริการการศึกษา/หัวหน้างานสำนักงานคณบดี
                :{" "}
              </span>
              <span className="FontSize">
                {approveStatus(
                  document.type_ten.signature
                    .head_service_or_deanoffice_status_sig
                )}
              </span>
              <br />
              <span className="FontThick">
                สถานะการอนุมัติ รองคณบดีฝ่ายวิชาการและวิจัย :{" "}
              </span>
              <span className="FontSize">
                {approveStatus(
                  document.type_ten.signature.deputy_dean_research_status_sig
                )}
              </span>
              <br />
              <span className="FontThick">สถานะการอนุมัติ คณบดี : </span>
              <span className="FontSize">
                {approveStatus(document.type_ten.signature.dean_status_sig)}
              </span>
              <br />
              <Divider />
            </Col>
            สถานะ :{"   "}
            {document.isAllSignature && document.isAllTableSignature ? (
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
export default DocumentTagTen;
