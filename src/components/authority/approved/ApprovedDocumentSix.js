import React, { useState, useEffect } from "react";
import DocumentSixService from "../../../services/DocumentSixService";
import { Spin, Divider, Table, Button, Avatar } from "antd";
import { Card, Col, Row, Modal, Form, message, List } from "antd";
import { endpointUrl } from "../../../config";
import "../../../styles/App.css";
import { dearNumberToString } from "../../../helpers/dear";
import { lveducationNumberToString } from "../../../helpers/lveducation";
import { plsoverlowNumberToString } from "../../../helpers/docsix";
import { useLocation, useHistory } from "react-router-dom";
import { appPath } from "../../../router/path";
import ApproveModal from "../../approve/ApproveModal";
import ApproveFormDocSixHs from "../../approve/ApproveFromDocSixHS";
import { useSelector } from "react-redux";
import { ApproveSixHs } from "../../../helpers/ApproveSixHs";

const ApprovedDocSix = ({ documentId }) => {
  const [isLoading, setLoading] = useState(true);
  const [document, setDocument] = useState({});
  const [isOpen, setOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [form] = Form.useForm();
  const history = useHistory();
  const [notApproved, setNotApproved] = useState(false);
  const { profile } = useSelector((state) => state.authState);
  useEffect(() => {
    getDocumentSix();
  }, []);
  const getDocumentSix = async () => {
    try {
      const res = await DocumentSixService.getDocumentSixByDocumentId(
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
  const approvedDocumentSix = async (values) => {
    setCreating(true);
    try {
      const documentApprovedSixResponse = await DocumentSixService.approvedDocumentSix(
        values,
        documentId
      );
      console.log(values);

      Modal.success({
        title: "ดำเนินการสำเร็จ",

        cancelText: false,
      });
      history.push(`${appPath.authority.root}${appPath.authority.document}`);

      console.log(documentApprovedSixResponse);
    } catch (error) {
      console.error(error);
      message.error("ดำเนินการไม่สำเร็จ");
    }
    setCreating(false);
    setOpen(false);
  };

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    approvedDocumentSix(values);
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
          <ApproveFormDocSixHs
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
          <Col span={8}>
            <Card title="ใบคำร้องเพิ่ม/ถอน รายวิชาล่าช้า" bordered={false}>
              <span className="FontThick">คำร้อง : </span>
              <span className="FontSize">
                {plsoverlowNumberToString(document.type_six.PlsRegisOverLow)}
              </span>
              <br />
              <span className="FontThick">ภาคการศึกษาที่ : </span>
              <span className="FontSize">{document.type_six.termregister}</span>
              {"  "}
              <span className="FontThick">ปีการศึกษา : </span>
              <span className="FontSize">{document.type_six.yearregister}</span>
              <br />
              <span className="FontThick">เรียน : </span>
              <span className="FontSize">
                {dearNumberToString(document.type_six.dear)}
              </span>
              <br />
              <span className="FontThick">มีความประสงค์ : </span>
              <span className="FontSize">
                {plsoverlowNumberToString(document.type_six.PlsRegisOverLow)}
              </span>
              <br />
              <span className="FontThick">
                ในภาคการศึกษานี้ ข้าพเจ้าได้ลงทะเบียนไปแล้ว <br /> จำนวน :{" "}
              </span>
              <span className="FontSize">
                {document.type_six.termtotalunit}
                {" หน่วยกิต"}
              </span>
              <br />
              <span className="FontThick">เนื่องจาก : </span>
              <span className="FontSize">{document.type_six.since}</span>
              <br />
              <Divider />
              <span className="FontThick">ข้อมูลรายวิชา</span>
              {document.type_six.tables.map((table) => {
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
                    <span className="FontThick">กลุ่มเรียน : </span>
                    <span className="FontSize"> {table.groupstudy}</span>
                    <br />

                    <div className="text-left">
                      <span className="FontThick">ผู้สอนลงนาม : </span>
                      <Avatar
                        style={{
                          width: 100,
                          height: 40,
                        }}
                        src={`${endpointUrl}upload/signature/${table.path_signature}`}
                        alt="signature"
                      />
                    </div>
                  </div>
                );
              })}
            </Card>
          </Col>
          <Col span={16}>
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
              <span className="FontSize">{document.type_six.classyear}</span>
              <br />
              <span className="FontThick">ระยะเวลาการศึกษา : </span>
              <span className="FontSize">
                {document.type_six.timestudy}
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
                    {document.type_six.signature.advisor_comment}
                  </div>
                  <div className="text-center">
                    <Avatar
                      style={{
                        width: 100,
                        height: 40,
                      }}
                      src={`${endpointUrl}upload/signature/${document.type_six.signature.advisor_path_sig}`}
                      alt="signature"
                    />
                  </div>

                  <Divider />
                  <div>
                    ความคิดเห็นหัวหน้าสาขาวิชา:{" "}
                    {document.type_six.signature.mastersubject_comment}
                  </div>
                  <div className="text-center">
                    <Avatar
                      style={{
                        width: 100,
                        height: 40,
                      }}
                      src={`${endpointUrl}upload/signature/${document.type_six.signature.mastersubject_path_sig}`}
                      alt="signature"
                    />
                  </div>

                  <Divider />
                  <div>
                    ความคิดเห็นหัวหน้างานบริการการศึกษา/หัวหน้าสำนักงานคณบดี:{" "}
                    {ApproveSixHs(document.type_six.signature.selectapprovesix)}
                    {document.type_six.signature.otherapprovesix}
                  </div>
                  <div className="text-center">
                    <Avatar
                      style={{
                        width: 100,
                        height: 40,
                      }}
                      src={`${endpointUrl}upload/signature/${document.type_six.signature.head_service_or_deanoffice_path_sig}`}
                      alt="signature"
                    />
                  </div>

                  <Divider />
                  <div>
                    ความคิดเห็นรองคณบดีฝ่ายวิชาการและวิจัย:{" "}
                    {document.type_six.signature.deputy_dean_research_comment}
                  </div>
                  <div className="text-center">
                    <Avatar
                      style={{
                        width: 100,
                        height: 40,
                      }}
                      src={`${endpointUrl}upload/signature/${document.type_six.signature.deputy_dean_research_path_sig}`}
                      alt="signature"
                    />
                  </div>

                  <Divider />
                  <div>
                    อนุมัติ/ไม่อนุมัติ:{" "}
                    {document.type_six.signature.dean_approve}
                  </div>

                  <div>เนื่องจาก: {document.type_six.signature.dean_since}</div>
                  <div className="text-center">
                    <Avatar
                      style={{
                        width: 100,
                        height: 40,
                      }}
                      src={`${endpointUrl}upload/signature/${document.type_six.signature.dean_path_sig}`}
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
          <Divider />

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
export default ApprovedDocSix;
