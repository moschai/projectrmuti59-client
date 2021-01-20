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
import DocumentTenService from "../../../services/DocumentTenService";

const ApprovedDocSubjectTen = ({ tableId }) => {
  const [isLoading, setLoading] = useState(true);
  const [document, setDocument] = useState({});
  const [isOpen, setOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [form] = Form.useForm();
  const history = useHistory();
  useEffect(() => {
    getDocumentTen();
  }, []);
  const getDocumentTen = async () => {
    try {
      const res = await DocumentTenService.getTableTenById(tableId);
      console.log(res);
      setDocument(res);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  const authorityTableTenApproved = async (values) => {
    setCreating(true);
    try {
      const docSubjectApprovedTenResponse = await DocumentTenService.authorityTableTenApproved(
        values,
        tableId
      );
      console.log(values);

      Modal.success({
        title: "อนุมัติแบบคำร้องสำเร็จ",

        cancelText: false,
      });
      history.push(
        `${appPath.authority.root}${appPath.authority.approvesubjectten}`
      );

      console.log(docSubjectApprovedTenResponse);
    } catch (error) {
      console.error(error);
      message.error("อนุมัติแบบคำร้องไม่สำเร็จ");
    }
    setCreating(false);
    setOpen(false);
  };

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    authorityTableTenApproved(values);
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
          <Col span={12}>
            <Card title="ใบคำร้องขอลงทะเบียนเรียนเทียบรายวิชา" bordered={false}>
              <span className="FontThick">
                คำขอลงทะเบียนเรียนเทียบรายวิชา ภาคเรียนที่ :{" "}
              </span>
              <span className="FontSize">{document.type.compareterm}</span>
              {"  "}
              <span className="FontThick">ปีการศึกษา : </span>
              <span className="FontSize">{document.type.compareyeat}</span>
              <br />
              <span className="FontThick">เรียน : </span>
              <span className="FontSize">
                {dearNumberToString(document.type.dear)}
              </span>
              <br />
            </Card>
          </Col>
          <Col span={12}>
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
              </span>{" "}
              <br />
              {""}
              <span className="FontThick">ระดับการศึกษา : </span>
              <span className="FontSize">
                {lveducationNumberToString(
                  document.type.document.student.lveducation
                )}
              </span>
              <br />
              <span className="FontThick">เกรดเฉลี่ยสะสม : </span>
              <span className="FontSize">{document.type.cumulativeGpa}</span>
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

export default ApprovedDocSubjectTen;
