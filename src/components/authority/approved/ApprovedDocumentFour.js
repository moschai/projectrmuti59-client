import React, { useState, useEffect } from "react";
import DocumentFourService from "../../../services/DocumentFourService";
import { endpointUrl } from "../../../config";
import { Spin, Button, Divider, Avatar } from "antd";
import { Card, Col, Row, Modal, Form, message, Radio } from "antd";
import "../../../styles/App.css";
import { dearNumberToString } from "../../../helpers/dear";
import { lveducationNumberToString } from "../../../helpers/lveducation";
import { overlowNumberToString } from "../../../helpers/docfour";
import ApproveModal from "../../approve/ApproveModal";
import { useLocation, useHistory } from "react-router-dom";
import { appPath } from "../../../router/path";
import { useSelector } from "react-redux";
import ApproveFormDocFourHs from "../../approve/ApproveFormDocFourHS";
import { ApproveFourHs } from "../../../helpers/ApproveFourHs";

const ApprovedDocFour = ({ documentId }) => {
  const [isLoading, setLoading] = useState(true);
  const [document, setDocument] = useState({});
  const [isOpen, setOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [form] = Form.useForm();
  const history = useHistory();
  const [notApproved, setNotApproved] = useState(false);
  const { profile } = useSelector((state) => state.authState);
  useEffect(() => {
    getDocumentFour();
  }, []);
  const getDocumentFour = async () => {
    try {
      const res = await DocumentFourService.getDocumentFourByDocumentId(
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

  const approvedDocumentFour = async (values) => {
    setCreating(true);
    try {
      const documentApprovedFourResponse = await DocumentFourService.approvedDocumentFour(
        values,
        documentId
      );
      console.log(values);

      Modal.success({
        title: "ดำเนินการสำเร็จ",

        cancelText: false,
      });
      history.push(`${appPath.authority.root}${appPath.authority.document}`);

      console.log(documentApprovedFourResponse);
    } catch (error) {
      console.error(error);
      message.error("ดำเนินการไม่สำเร็จ");
    }
    setCreating(false);
    setOpen(false);
  };

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    approvedDocumentFour(values);
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
          <ApproveFormDocFourHs
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
          <Col span={10}>
            <Card
              title="ใบคำร้องขอลงทะเบียนเรียนต่ำ-เกินกว่าหน่วยกิตที่กำหนด"
              bordered={false}
            >
              <span className="FontThick">ภาคเรียนที่ : </span>
              <span className="FontSize">{document.type_four.termstudy}</span>
              {"  "}
              <span className="FontThick">ปีการศึกษา : </span>
              <span className="FontSize">{document.type_four.yearstudy}</span>
              <br />
              <span className="FontThick">เรียน : </span>
              <span className="FontSize">
                {dearNumberToString(document.type_four.dear)}
              </span>
              <br />
              <span className="FontThick">มีความประสงค์ขอลงทะเบียน : </span>
              <span className="FontSize">
                {overlowNumberToString(document.type_four.overlowstandard)}
                {"  :"}
              </span>
              <span className="FontSize">
                {document.type_four.sumorremainunit}
                {" หน่วยกิต"}
              </span>
              <br />
              <span className="FontThick">เนื่องจาก : </span>
              <span className="FontSize">
                {document.type_four.overlowstandardsince}
              </span>
              <br />
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
              <span className="FontThick">เกรดเฉลี่ยสะสม : </span>
              <span className="FontSize">
                {document.type_four.cumulativeGpa}
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
                    {document.type_four.signature.advisor_comment}
                  </div>
                  <div className="text-center">
                    <Avatar
                      style={{
                        width: 100,
                        height: 40,
                      }}
                      src={`${endpointUrl}upload/signature/${document.type_four.signature.advisor_path_sig}`}
                      alt="signature"
                    />
                  </div>

                  <Divider />
                  <div>
                    ความคิดเห็นหัวหน้าสาขาวิชา:{" "}
                    {document.type_four.signature.mastersubject_comment}
                  </div>
                  <div className="text-center">
                    <Avatar
                      style={{
                        width: 100,
                        height: 40,
                      }}
                      src={`${endpointUrl}upload/signature/${document.type_four.signature.mastersubject_path_sig}`}
                      alt="signature"
                    />
                  </div>

                  <Divider />
                  <div>
                    ความคิดเห็นหัวหน้างานบริการการศึกษา/หัวหน้าสำนักงานคณบดี:{" "}
                    {ApproveFourHs(
                      document.type_four.signature.selectcondition
                    )}
                    {document.type_four.signature.othercondition}
                  </div>
                  <div className="text-center">
                    <Avatar
                      style={{
                        width: 100,
                        height: 40,
                      }}
                      src={`${endpointUrl}upload/signature/${document.type_four.signature.head_service_or_deanoffice_path_sig}`}
                      alt="signature"
                    />
                  </div>

                  <Divider />
                  <div>
                    ความคิดเห็นรองคณบดีฝ่ายวิชาการและวิจัย:{" "}
                    {document.type_four.signature.deputy_dean_research_comment}
                  </div>
                  <div className="text-center">
                    <Avatar
                      style={{
                        width: 100,
                        height: 40,
                      }}
                      src={`${endpointUrl}upload/signature/${document.type_four.signature.deputy_dean_research_path_sig}`}
                      alt="signature"
                    />
                  </div>

                  <Divider />
                  <div>
                    อนุมัติ/ไม่อนุมัติ:{" "}
                    {document.type_four.signature.dean_approve}
                  </div>

                  <div>
                    เนื่องจาก: {document.type_four.signature.dean_since}
                  </div>
                  <div className="text-center">
                    <Avatar
                      style={{
                        width: 100,
                        height: 40,
                      }}
                      src={`${endpointUrl}upload/signature/${document.type_four.signature.dean_path_sig}`}
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

export default ApprovedDocFour;
