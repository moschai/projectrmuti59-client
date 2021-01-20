import React, { useState, useEffect } from "react";
import DocumentThreeService from "../../../services/DocumentThreeService";
import { endpointUrl } from "../../../config";
import { Spin, Button, Divider, Avatar } from "antd";
import { Card, Col, Row, Modal, Form, message } from "antd";
import { useLocation, useHistory } from "react-router-dom";
import { appPath } from "../../../router/path";
import ApproveModal from "../../approve/ApproveModal";

import "../../../styles/App.css";
import { lveducationNumberToString } from "../../../helpers/lveducation";

const ApprovedDocThree = ({ documentId }) => {
  const [isLoading, setLoading] = useState(true);
  const [document, setDocument] = useState({});
  const [isOpen, setOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [form] = Form.useForm();
  const history = useHistory();
  useEffect(() => {
    getDocumentThree();
  }, []);
  const getDocumentThree = async () => {
    try {
      const res = await DocumentThreeService.getDocumentThreeByDocumentId(
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

  const approvedDocumentThree = async (values) => {
    setCreating(true);
    try {
      const documentApprovedThreeResponse = await DocumentThreeService.approvedDocumentThree(
        values,
        documentId
      );
      console.log(values);

      Modal.success({
        title: "อนุมัติแบบคำร้องสำเร็จ",

        cancelText: false,
      });
      history.push(`${appPath.authority.root}${appPath.authority.document}`);

      console.log(documentApprovedThreeResponse);
    } catch (error) {
      console.error(error);
      message.error("อนุมัติแบบคำร้องไม่สำเร็จ");
    }
    setCreating(false);
    setOpen(false);
  };

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    approvedDocumentThree(values);
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
            <Card title="ใบคำร้องขอคืนสถานภาพการเป็นนักศึกษา " bordered={false}>
              <span className="FontThick">ภาคเรียนที่ : </span>
              <span className="FontSize">{document.type_three.returnterm}</span>
              <br />
              <span className="FontThick">ปีการศึกษา : </span>
              <span className="FontSize">{document.type_three.returnyear}</span>
              <br />
              <span className="FontThick">เรียน : </span>
              <span className="FontSize">{"คณบดีประจำวิทยาเขตขอนแก่น"}</span>
              <br />

              <span className="FontThick">
                มีความประสงค์: ขอคืนสภาพนักศึกษา
                <br />
                เนื่องจากถูกถอนชื่อออกจากทะเบียนนักศึกษา
                <br />
                ภาคการศึกษาที่:{" "}
              </span>
              <span className="FontSize">{document.type_three.leaveterm}</span>
              {"  "}
              <span className="FontThick">ปีการศึกษา : </span>
              <span className="FontSize">{document.type_three.leaveyear}</span>
              <br />
              <span className="FontThick">
                ทั้งนี้ข้าพเจ้า ขอคืนสถานภาพการเป็นนักศึกษา
                <br /> เพื่อกลับเข้าศึกษา ในภาคการศึกษาที่:{" "}
              </span>
              <span className="FontSize">{document.type_three.returnterm}</span>
              {"  "}
              <span className="FontThick">ปีการศึกษา : </span>
              <span className="FontSize">{document.type_three.returnyear}</span>
              {"  "}
              <br />
              <span className="FontThick">
                ซึ่งยังไม่พ้นกำหนดระยะเวลา 1 ปี
                <br />
                นับตั้งแต่ถูกถอนชื่อออกจากทะเบียนนักศึกษา
                <br />
                ตามข้อบังคับของมหาวิทยาลัยเทคโนโลยีราชมงคลอีสาน
              </span>
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
              <span className="FontThick">ชั้นปีที่ : </span>
              <span className="FontSize">{document.type_three.classyear}</span>
              <br />

              <span className="FontThick">ระยะเวลาการศึกษา : </span>
              <span className="FontSize">
                {document.type_three.timestudy}
                {"ปี"}
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
                    {document.type_three.signature.advisor_comment}
                  </div>
                  <div className="text-center">
                    <Avatar
                      style={{
                        width: 100,
                        height: 40,
                      }}
                      src={`${endpointUrl}upload/signature/${document.type_three.signature.advisor_path_sig}`}
                      alt="signature"
                    />
                  </div>

                  <Divider />
                  <div>
                    ความคิดเห็นหัวหน้าสาขาวิชา:{" "}
                    {document.type_three.signature.mastersubject_comment}
                  </div>
                  <div className="text-center">
                    <Avatar
                      style={{
                        width: 100,
                        height: 40,
                      }}
                      src={`${endpointUrl}upload/signature/${document.type_three.signature.mastersubject_path_sig}`}
                      alt="signature"
                    />
                  </div>

                  <Divider />
                  <div>
                    ความคิดเห็นหัวหน้างานบริการการศึกษา/หัวหน้าสำนักงานคณบดี:{" "}
                    {
                      document.type_three.signature
                        .head_service_or_deanoffice_comment
                    }
                  </div>
                  <div className="text-center">
                    <Avatar
                      style={{
                        width: 100,
                        height: 40,
                      }}
                      src={`${endpointUrl}upload/signature/${document.type_three.signature.head_service_or_deanoffice_path_sig}`}
                      alt="signature"
                    />
                  </div>

                  <Divider />
                  <div>
                    ความคิดเห็นรองคณบดีฝ่ายวิชาการและวิจัย:{" "}
                    {document.type_three.signature.deputy_dean_research_comment}
                  </div>
                  <div className="text-center">
                    <Avatar
                      style={{
                        width: 100,
                        height: 40,
                      }}
                      src={`${endpointUrl}upload/signature/${document.type_three.signature.deputy_dean_research_path_sig}`}
                      alt="signature"
                    />
                  </div>

                  <Divider />
                  <div>
                    ความคิดของคณบดี:{" "}
                    {document.type_three.signature.dean_comment}
                  </div>
                  <div className="text-center">
                    <Avatar
                      style={{
                        width: 100,
                        height: 40,
                      }}
                      src={`${endpointUrl}upload/signature/${document.type_three.signature.dean_path_sig}`}
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
          </Card>
        </Col> */}
        </Row>
      </div>
    );
  }
};

export default ApprovedDocThree;
