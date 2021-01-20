import React, { useState, useEffect } from "react";
import "../../../styles/App.css";
import { lveducationNumberToString } from "../../../helpers/lveducation";
import { dearNumberToString } from "../../../helpers/dear";
import { topicNumberToString } from "../../../helpers/docnine";
import { endpointUrl } from "../../../config";
import { Spin, Button, Divider, Avatar, Table } from "antd";
import { Card, Col, Row, Modal, Form, message } from "antd";
import { useLocation, useHistory } from "react-router-dom";
import { appPath } from "../../../router/path";
import ApproveModal from "../../approve/ApproveModal";
import DocumentNineService from "../../../services/DocumentNineService";

const ApprovedDocSubjectNine = ({ tableId }) => {
  const [isLoading, setLoading] = useState(true);
  const [document, setDocument] = useState({});
  const [isOpen, setOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [form] = Form.useForm();
  const history = useHistory();
  useEffect(() => {
    getDocumentNine();
  }, []);
  const getDocumentNine = async () => {
    try {
      const res = await DocumentNineService.getTableNineById(tableId);
      console.log(res);
      setDocument(res);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  const authorityTableNineApproved = async (values) => {
    setCreating(true);
    try {
      const docSubjectApprovedNineResponse = await DocumentNineService.authorityTableNineApproved(
        values,
        tableId
      );
      console.log(values);

      Modal.success({
        title: "อนุมัติแบบคำร้องสำเร็จ",

        cancelText: false,
      });
      history.push(
        `${appPath.authority.root}${appPath.authority.approvesubjectnine}`
      );

      console.log(docSubjectApprovedNineResponse);
    } catch (error) {
      console.error(error);
      message.error("อนุมัติแบบคำร้องไม่สำเร็จ");
    }
    setCreating(false);
    setOpen(false);
  };

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    authorityTableNineApproved(values);
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
            <Card title="หนังสือรับรองการเข้าเรียน" bordered={false}>
              <span className="FontThick">
                คำร้องขอชำระเงินล่าช้า เรื่อง :{" "}
              </span>
              <span className="FontSize">
                {topicNumberToString(document.type.topic)}
                {"     "}
                {document.type.othermassege}{" "}
              </span>
              <br />
              <span className="FontThick">ภาคการศึกษาที่ : </span>
              <span className="FontSize">{document.type.latepaymentterm}</span>
              {"  "}
              <span className="FontThick">ปีการศึกษา : </span>
              <span className="FontSize">{document.type.latepaymentyear}</span>
              <br />
              <span className="FontThick">เรียน : </span>
              <span className="FontSize">
                {dearNumberToString(document.type.dear)}
              </span>
              <br />
              <span className="FontThick">มีความประสงค์ ชำระเงินล่าช้า </span>
              <span className="FontThick">ภาคการศึกษาที่ : </span>
              <span className="FontSize">{document.type.latepaymentterm}</span>
              {"  "}
              <span className="FontThick">ปีการศึกษา : </span>
              <span className="FontSize">{document.type.latepaymentyear}</span>
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

export default ApprovedDocSubjectNine;
