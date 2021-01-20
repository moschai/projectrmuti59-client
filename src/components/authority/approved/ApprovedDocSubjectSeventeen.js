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
import DocumentSeventeenService from "../../../services/DocumentSeventeenService";

const ApprovedDocSubjectSeventeen = ({ tableId }) => {
  const [isLoading, setLoading] = useState(true);
  const [document, setDocument] = useState({});
  const [isOpen, setOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [form] = Form.useForm();
  const history = useHistory();
  useEffect(() => {
    getDocumentSeventeen();
  }, []);
  const getDocumentSeventeen = async () => {
    try {
      const res = await DocumentSeventeenService.getTableSeventeenById(tableId);
      console.log(res);
      setDocument(res.type.document);
      console.log(document);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  const authorityTableSeventeenApproved = async (values) => {
    setCreating(true);
    try {
      const docSubjectApprovedSeventeenResponse = await DocumentSeventeenService.authorityTableSeventeenApproved(
        values,
        tableId
      );
      console.log(values);

      Modal.success({
        title: "อนุมัติแบบคำร้องสำเร็จ",

        cancelText: false,
      });
      history.push(`${appPath.authority.root}${appPath.authority.document}`);

      console.log(docSubjectApprovedSeventeenResponse);
    } catch (error) {
      console.error(error);
      message.error("อนุมัติแบบคำร้องไม่สำเร็จ");
    }
    setCreating(false);
    setOpen(false);
  };

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    authorityTableSeventeenApproved(values);
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
          <Col xs={24} sm={24} md={24} lg={8}>
            <Card
              title="ใบคำร้องแก้ไขหมวดวิชาตามโครงสร้างหลักสูตร "
              bordered={false}
            >
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

export default ApprovedDocSubjectSeventeen;
