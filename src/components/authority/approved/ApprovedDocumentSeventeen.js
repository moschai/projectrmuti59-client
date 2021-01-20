import React, { useState, useEffect } from "react";
import DocumentSeventeenService from "../../../services/DocumentSeventeenService";
import { endpointUrl } from "../../../config";
import { Spin, Button, Divider, Avatar } from "antd";
import { Card, Col, Row, Modal, Form, message } from "antd";
import "../../../styles/App.css";
import { lveducationNumberToString } from "../../../helpers/lveducation";
import { useLocation, useHistory } from "react-router-dom";
import { appPath } from "../../../router/path";
import ApproveModal from "../../approve/ApproveModal";

const ApprovedDocSeventeen = ({ documentId }) => {
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
      const res = await DocumentSeventeenService.getDocumentSeventeenByDocumentId(
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

  const approvedDocumentSeventeen = async (values) => {
    setCreating(true);
    try {
      const documentApprovedSeventeenResponse = await DocumentSeventeenService.approvedDocumentSeventeen(
        values,
        documentId
      );
      console.log(values);

      Modal.success({
        title: "อนุมัติแบบคำร้องสำเร็จ",

        cancelText: false,
      });
      history.push(`${appPath.authority.root}${appPath.authority.document}`);

      console.log(documentApprovedSeventeenResponse);
    } catch (error) {
      console.error(error);
      message.error("อนุมัติแบบคำร้องไม่สำเร็จ");
    }
    setCreating(false);
    setOpen(false);
  };

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    approvedDocumentSeventeen(values);
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
              title="ใบคำร้องขอแก้ไขหมวดวิชาตามโครงสร้างหลักสูตร"
              bordered={false}
            >
              <span className="FontThick">
                มีความประสงค์ : ขอแจ้งแก้ไขหมวดวิชาเพื่อให้ถูกต้องตาม
                <br />
                โครงสร้างหลักสูตร
              </span>
              <Divider />
              <span className="FontThick">ข้อมูลรายวิชา</span>
              {document.type_seventeen.tables.map((table) => {
                return (
                  <div key={table.idtable}>
                    <span className="FontThick">รหัสวิชา : </span>
                    <span className="FontSize">
                      {table.id_subject.id_subject}
                      {"    "}
                    </span>
                    <br />
                    <span className="FontThick">ชื่อวิชา : </span>
                    <span className="FontSize">
                      {" "}
                      {table.id_subject.name_subject}
                      {"    "}
                    </span>
                    <br />
                    <span className="FontThick">หน่วยกิต : </span>
                    <span className="FontSize">
                      {" "}
                      {table.id_subject.unit_subject}
                      {"    "}
                    </span>
                    <br />
                    <span className="FontThick">หมวดวิชาเดิม : </span>
                    <span className="FontSize"> {table.groupsub}</span>
                    <br />
                    <span className="FontThick">
                      หมวดวิชาตามโครงสร้างหลักสูตร :{" "}
                    </span>
                    <span className="FontSize"> {table.groupsubstruct}</span>
                  </div>
                );
              })}
            </Card>
          </Col>
          <Col span={14}>
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
              <span className="FontThick">เบอร์โทรศัพท์ : </span>
              <span className="FontSize">{document.student.phone_std}</span>
              <br />

              <span className="FontThick">E-mail : </span>
              <span className="FontSize">{document.student.email_std}</span>

              <Divider />
              {document.number_sig > 0 && (
                <div>
                  <Divider />
                  <div>
                    ความคิดเห็นอาจารย์ที่ปรึกษา:{" "}
                    {document.type_seventeen.signature.advisor_comment}
                  </div>
                  <div className="text-center">
                    <Avatar
                      style={{
                        width: 100,
                        height: 40,
                      }}
                      src={`${endpointUrl}upload/signature/${document.type_seventeen.signature.advisor_path_sig}`}
                      alt="signature"
                    />
                  </div>
                </div>
              )}
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

export default ApprovedDocSeventeen;
