import React, { useState, useEffect } from "react";
import "../../../styles/App.css";
import { lveducationNumberToString } from "../../../helpers/lveducation";
import { dearNumberToString } from "../../../helpers/dear";
import { endpointUrl } from "../../../config";
import { Spin, Button, Divider, Avatar, Table } from "antd";
import { Card, Col, Row, Modal, Form, message } from "antd";
import { useLocation, useHistory } from "react-router-dom";
import { appPath } from "../../../router/path";
import ApproveModal from "../../approve/ApproveModal";
import DocumentSixService from "../../../services/DocumentSixService";
import { plsoverlowNumberToString } from "../../../helpers/docsix";
import SizeContext from "antd/lib/config-provider/SizeContext";

const ApprovedDocSubjectSix = ({ tableId }) => {
  const [isLoading, setLoading] = useState(true);
  const [document, setDocument] = useState({});
  const [isOpen, setOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [form] = Form.useForm();
  const history = useHistory();

  useEffect(() => {
    getDocumentSix();
  }, []);

  const getDocumentSix = async () => {
    try {
      const res = await DocumentSixService.getTableSixById(tableId);
      console.log(res);
      setDocument(res);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  const authorityTableSixApproved = async (values) => {
    setCreating(true);
    try {
      const docSubjectApprovedSixResponse = await DocumentSixService.authorityTableSixApproved(
        values,
        tableId
      );
      console.log(values);

      Modal.success({
        title: "อนุมัติแบบคำร้องสำเร็จ",

        cancelText: false,
      });
      history.push(
        `${appPath.authority.root}${appPath.authority.approvesubjectsix}`
      );

      console.log(docSubjectApprovedSixResponse);
    } catch (error) {
      console.error(error);
      message.error("อนุมัติแบบคำร้องไม่สำเร็จ");
    }
    setCreating(false);
    setOpen(false);
  };

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    authorityTableSixApproved(values);
  };
  const handleAppove = () => {
    setOpen(true);
  };

  if (isLoading) {
    return <Spin tip="loading..." />;
  } else {
    return (
      <div className="blackground">
        <ApproveModal
          hideComment={true}
          isOpen={isOpen}
          finish={onFinish}
          loading={creating}
          setLoading={setCreating}
          form={form}
          onClose={() => {
            setOpen(false);
          }}
        />

        <Row gutter={16}>
          <Col span={10}>
            <Card title="ใบคำร้องเพิ่ม/ถอน รายวิชาล่าช้า" bordered={false}>
              <span className="FontThick">คำร้อง : </span>
              <span className="FontSize">
                {plsoverlowNumberToString(document.type.PlsRegisOverLow)}
              </span>
              <br />
              <span className="FontThick">ภาคการศึกษาที่ : </span>
              <span className="FontSize">{document.type.termregister}</span>
              {"  "}
              <span className="FontThick">ปีการศึกษา : </span>
              <span className="FontSize">{document.type.yearregister}</span>
              <br />
              <span className="FontThick">เรียน : </span>
              <span className="FontSize">
                {dearNumberToString(document.type.dear)}
              </span>
              <br />
              <span className="FontThick">มีความประสงค์ : </span>
              <span className="FontSize">
                {plsoverlowNumberToString(document.type.PlsRegisOverLow)}
              </span>
              <br />
              <span className="FontThick">
                ในภาคการศึกษานี้ ข้าพเจ้าได้ลงทะเบียนไปแล้ว จำนวน :{" "}
              </span>
              <span className="FontSize">
                {document.type.termtotalunit}
                {" หน่วยกิต"}
              </span>
              <br />
            </Card>
          </Col>

          <Col span={14}>
            <Card title="" bordered={false}>
              <span className="FontThick">ชื่อ-นามสกุล : </span>
              <span className="FontSize">
                {document.type.document.student.name_std}{" "}
                {document.type.document.student.surname_std}
              </span>
              <br />
              <span className="FontThick">รหัสนักศึกษา : </span>
              <span className="FontSize">
                {document.type.document.student.id_std}
              </span>
              <br />
              <span className="FontThick">คณะ : </span>
              <span className="FontSize">
                {document.type.document.student.major.faculty.name_faculty}
              </span>
              <br />
              <span className="FontThick">สาขาวิชา : </span>
              <span className="FontSize">
                {document.type.document.student.major.name_major}
              </span>
              <br />
              {""}
              <span className="FontThick">ระดับการศึกษา : </span>
              <span className="FontSize">
                {lveducationNumberToString(
                  document.type.document.student.lveducation
                )}
              </span>
              <br />
              <span className="FontThick">ชั้นปีที่ : </span>
              <span className="FontSize">{document.type.classyear}</span>
              <br />
              <span className="FontThick">ระยะเวลาการศึกษา : </span>
              <span className="FontSize">
                {document.type.timestudy}
                {"ปี"}
              </span>
              <br />
              <span className="FontThick">เบอร์โทรศัพท์ : </span>
              <span className="FontSize">
                {document.type.document.student.phone_std}
              </span>
              <br />

              <span className="FontThick">E-mail : </span>
              <span className="FontSize">
                {document.type.document.student.email_std}
              </span>
              <br />

              <Row justify="end">
                <Button
                  onClick={handleAppove}
                  loading={creating}
                  disabled={creating}
                >
                  อนุมัติ
                </Button>
              </Row>
            </Card>
          </Col>
          <Divider />
        </Row>
      </div>
    );
  }
};

export default ApprovedDocSubjectSix;
