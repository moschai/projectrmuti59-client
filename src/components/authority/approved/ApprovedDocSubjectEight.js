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
import DocumentEightService from "../../../services/DocumentEightService";
import { sinceNumberToString } from "../../../helpers/doceight";

const ApprovedDocSubjectEight = ({ tableId }) => {
  const [isLoading, setLoading] = useState(true);
  const [document, setDocument] = useState({});
  const [isOpen, setOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [form] = Form.useForm();
  const history = useHistory();
  useEffect(() => {
    getDocumentEight();
  }, []);
  const getDocumentEight = async () => {
    try {
      const res = await DocumentEightService.getTableEightById(tableId);
      console.log(res);
      setDocument(res);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  const authorityTableEightApproved = async (values) => {
    setCreating(true);
    try {
      const docSubjectApprovedEightResponse = await DocumentEightService.authorityTableEightApproved(
        values,
        tableId
      );
      console.log(values);

      Modal.success({
        title: "อนุมัติแบบคำร้องสำเร็จ",

        cancelText: false,
      });
      history.push(
        `${appPath.authority.root}${appPath.authority.approvesubjecteight}`
      );

      console.log(docSubjectApprovedEightResponse);
    } catch (error) {
      console.error(error);
      message.error("อนุมัติแบบคำร้องไม่สำเร็จ");
    }
    setCreating(false);
    setOpen(false);
  };

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    authorityTableEightApproved(values);
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
            <Card
              title="ใบคำร้องเปลี่ยนกลุ่มเรียน(รายวิชาที่ลงทะเบียนเรียน)"
              bordered={false}
            >
              <span className="FontThick">ภาคการศึกษาที่ : </span>
              <span className="FontSize">{document.type.termstudy}</span>
              {"  "}
              <span className="FontThick">ปีการศึกษา : </span>
              <span className="FontSize">{document.type.yearstudy}</span>
              <br />
              <span className="FontThick">
                มีความประสงค์ ขอเปลี่ยนกลุ่มเรียน ภาคการศึกษาที่:{" "}
              </span>
              <span className="FontSize">{document.type.movinggroupterm}</span>
              {"  "} <span className="FontThick">ปีการศึกษา : </span>
              <span className="FontSize">{document.type.movinggroupyear}</span>
              <br />
              <span className="FontThick">เนื่องจาก : </span>
              <span className="FontSize">
                {sinceNumberToString(document.type.since)}{" "}
                {document.type.othermassege}
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

export default ApprovedDocSubjectEight;
