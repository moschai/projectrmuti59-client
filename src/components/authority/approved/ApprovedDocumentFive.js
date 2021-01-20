import React, { useState, useEffect } from "react";
import DocumentFiveService from "../../../services/DocumentFiveService";
import { endpointUrl } from "../../../config";
import { Spin, Button, Divider, Avatar } from "antd";
import { Card, Col, Row, Modal, Form, message } from "antd";
import "../../../styles/App.css";
import { dearNumberToString } from "../../../helpers/dear";
import { takeleaveNumberToString } from "../../../helpers/docfive";
import { lveducationNumberToString } from "../../../helpers/lveducation";
import { useLocation, useHistory } from "react-router-dom";
import { appPath } from "../../../router/path";
import ApproveModal from "../../approve/ApproveModal";
import { useSelector } from "react-redux";
import ApproveFormDocFiveHs from "../../approve/ApproveFormDocFiveHS";
import { ApproveFiveHs } from "../../../helpers/ApproveFiveHs";

const ApprovedDocFive = ({ documentId }) => {
  const [isLoading, setLoading] = useState(true);
  const [document, setDocument] = useState({});
  const [isOpen, setOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [form] = Form.useForm();
  const history = useHistory();
  const [notApproved, setNotApproved] = useState(false);
  const { profile } = useSelector((state) => state.authState);
  useEffect(() => {
    getDocumentFive();
  }, []);
  const getDocumentFive = async () => {
    try {
      const res = await DocumentFiveService.getDocumentFiveByDocumentId(
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

  const approvedDocumentFive = async (values) => {
    setCreating(true);
    try {
      const documentApprovedFiveResponse = await DocumentFiveService.approvedDocumentFive(
        values,
        documentId
      );
      console.log(values);

      Modal.success({
        title: "ดำเนินการสำเร็จ",

        cancelText: false,
      });
      history.push(`${appPath.authority.root}${appPath.authority.document}`);

      console.log(documentApprovedFiveResponse);
    } catch (error) {
      console.error(error);
      message.error("ดำเนินการไม่สำเร็จ");
    }
    setCreating(false);
    setOpen(false);
  };

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    approvedDocumentFive(values);
  };

  const handleAppove = () => {
    setNotApproved(false);
    setOpen(true);
  };

  const handleNotApproved = () => {
    setNotApproved(true);
    setOpen(true);
  };

  const renderButtonNotAppoved = () => {
    if (profile.position_authority === "คณะบดี") {
      return (
        <Button
          onClick={handleNotApproved}
          loading={creating}
          disabled={creating}
          type="primary"
          danger
        >
          ไม่อนุมัติ
        </Button>
      );
    }
    return null;
  };
  if (isLoading) {
    return <Spin tip="loading..." />;
  } else {
    return (
      <div className="blackground">
        {profile.position_authority ===
        "หัวหน้างานบริการหรือหัวหน้างานสำนักคณะบดี" ? (
          <ApproveFormDocFiveHs
            isOpen={isOpen}
            finish={onFinish}
            loading={creating}
            setLoading={setCreating}
            notApproved={notApproved}
            form={form}
            onClose={() => {
              setOpen(false);
            }}
          />
        ) : (
          <ApproveModal
            notApproved={notApproved}
            isOpen={isOpen}
            finish={onFinish}
            loading={creating}
            setLoading={setCreating}
            form={form}
            onClose={() => {
              setOpen(false);
            }}
          />
        )}
        <Row gutter={16}>
          <Col span={11}>
            <Card
              title="ใบคำร้องขอลาพักการศึก/ขอรักษาสถานภาพการเป็นนักศึกษา"
              bordered={false}
            >
              <span className="FontThick">คำร้อง : </span>
              <span className="FontSize">
                {takeleaveNumberToString(document.type_five.maintaintake)}
              </span>
              <br />
              <span className="FontThick">ภาคการศึกษาที่ : </span>
              <span className="FontSize">
                {document.type_five.takeleaveterm}
              </span>
              {"  "}
              <span className="FontThick">ปีการศึกษา : </span>
              <span className="FontSize">
                {document.type_five.takeleaveyear}
              </span>
              <br />
              <span className="FontThick">เรียน : </span>
              <span className="FontSize">
                {dearNumberToString(document.type_five.dear)}
              </span>
              <br />
              <span className="FontThick">มีความประสงค์ขอลงทะเบียน : </span>
              <span className="FontSize">
                {takeleaveNumberToString(document.type_five.maintaintake)}
              </span>
              <br />
              <span className="FontThick">ในภาคการศึกษาที่ : </span>
              <span className="FontSize">
                {document.type_five.takeleaveterm}
              </span>
              {"  "}
              <span className="FontThick">ปีการศึกษา : </span>
              <span className="FontSize">
                {document.type_five.takeleaveyear}
              </span>
              {"  "}
              <span className="FontThick">ครั้งที่ : </span>
              <span className="FontSize">{document.type_five.takeleaveno}</span>
              <br />
              <span className="FontThick">เนื่องจาก : </span>
              <span className="FontSize">{document.type_five.since}</span>
              <br />
            </Card>
          </Col>
          <Col span={13}>
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
              <span className="FontThick">เกรดเฉลี่ยสะสม : </span>
              <span className="FontSize">
                {document.type_five.cumulativeGpa}
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
                    {document.type_five.signature.advisor_comment}
                  </div>
                  <div className="text-center">
                    <Avatar
                      style={{
                        width: 100,
                        height: 40,
                      }}
                      src={`${endpointUrl}upload/signature/${document.type_five.signature.advisor_path_sig}`}
                      alt="signature"
                    />
                  </div>

                  <Divider />
                  <div>
                    ความคิดเห็นหัวหน้าสาขาวิชา:{" "}
                    {document.type_five.signature.mastersubject_comment}
                  </div>
                  <div className="text-center">
                    <Avatar
                      style={{
                        width: 100,
                        height: 40,
                      }}
                      src={`${endpointUrl}upload/signature/${document.type_five.signature.mastersubject_path_sig}`}
                      alt="signature"
                    />
                  </div>

                  <Divider />
                  <div>
                    ความคิดเห็นหัวหน้างานบริการการศึกษา/หัวหน้าสำนักงานคณบดี:{" "}
                    {ApproveFiveHs(
                      document.type_five.signature.selectapprovefive
                    )}
                    {document.type_five.signature.otherapprovefive}
                  </div>
                  <div className="text-center">
                    <Avatar
                      style={{
                        width: 100,
                        height: 40,
                      }}
                      src={`${endpointUrl}upload/signature/${document.type_five.signature.head_service_or_deanoffice_path_sig}`}
                      alt="signature"
                    />
                  </div>

                  <Divider />
                  <div>
                    ความคิดเห็นรองคณบดีฝ่ายวิชาการและวิจัย:{" "}
                    {document.type_five.signature.deputy_dean_research_comment}
                  </div>
                  <div className="text-center">
                    <Avatar
                      style={{
                        width: 100,
                        height: 40,
                      }}
                      src={`${endpointUrl}upload/signature/${document.type_five.signature.deputy_dean_research_path_sig}`}
                      alt="signature"
                    />
                  </div>

                  <Divider />
                  <div>
                    อนุมัติ/ไม่อนุมัติ:{" "}
                    {document.type_five.signature.dean_approve}
                  </div>

                  <div>
                    เนื่องจาก: {document.type_five.signature.dean_since}
                  </div>
                  <div className="text-center">
                    <Avatar
                      style={{
                        width: 100,
                        height: 40,
                      }}
                      src={`${endpointUrl}upload/signature/${document.type_five.signature.dean_path_sig}`}
                      alt="signature"
                    />
                  </div>
                </div>
              )}

              <Row justify="end">
                {renderButtonNotAppoved()}
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

export default ApprovedDocFive;
