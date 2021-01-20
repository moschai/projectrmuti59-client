import React, { useState, useEffect } from "react";
import DocumentFourteenService from "../../../services/DocumentFourteenService";
import { endpointUrl } from "../../../config";
import { Spin, Button, Divider, Avatar } from "antd";
import { Card, Col, Row, Modal, Form, message } from "antd";
import { lveducationNumberToString } from "../../../helpers/lveducation";
import { dearNumberToString } from "../../../helpers/dear";
import "../../../styles/App.css";
import { useLocation, useHistory } from "react-router-dom";
import { appPath } from "../../../router/path";
import ApproveModal from "../../approve/ApproveModal";
import { useSelector } from "react-redux";

const ApprovedDocFourteen = ({ documentId }) => {
  const [isLoading, setLoading] = useState(true);
  const [document, setDocument] = useState({});
  const [isOpen, setOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [form] = Form.useForm();
  const history = useHistory();
  const [notApproved, setNotApproved] = useState(false);
  const { profile } = useSelector((state) => state.authState);
  useEffect(() => {
    getDocumentFourteen();
  }, []);
  const getDocumentFourteen = async () => {
    try {
      const res = await DocumentFourteenService.getDocumentFourteenByDocumentId(
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

  const approvedDocumentFourteen = async (values) => {
    setCreating(true);
    try {
      const documentApprovedFourteenResponse = await DocumentFourteenService.approvedDocumentFourteen(
        values,
        documentId
      );
      console.log(values);

      Modal.success({
        title: "ดำเนินการสำเร็จ",

        cancelText: false,
      });
      history.push(`${appPath.authority.root}${appPath.authority.document}`);

      console.log(documentApprovedFourteenResponse);
    } catch (error) {
      console.error(error);
      message.error("ดำเนินการไม่สำเร็จ");
    }
    setCreating(false);
    setOpen(false);
  };

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    approvedDocumentFourteen(values);
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
        <Row gutter={16}>
          <Col span={12}>
            <Card title="ใบคำร้องขอหนังสือรับรองความประพฤติ " bordered={false}>
              <span className="FontThick">เรียน : </span>
              <span className="FontSize">
                {dearNumberToString(document.type_fourteen.dear)}
              </span>
              <br />
              <span className="FontThick">
                มีความประสงค์ : ขอหนังสือรับรองความประพฤติ เพื่อนำไปใช้ในการ
                <br />
                (ระบุเหตุผล) :
              </span>
              <span className="FontSize">
                {document.type_fourteen.behavioralreceipt}
              </span>
            </Card>
          </Col>
          <Col span={12}>
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
              <span className="FontSize">
                {document.type_fourteen.classyear}
              </span>
              <br />

              <span className="FontThick">ระยะเวลาการศึกษา : </span>
              <span className="FontSize">
                {document.type_fourteen.timestudy}
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
                    {document.type_fourteen.signature.advisor_comment}
                  </div>
                  <div className="text-center">
                    <Avatar
                      style={{
                        width: 100,
                        height: 40,
                      }}
                      src={`${endpointUrl}upload/signature/${document.type_fourteen.signature.advisor_path_sig}`}
                      alt="signature"
                    />
                  </div>
                  <div className="text-center">
                    ({" "}
                    {document.type_fourteen.signature.advisor_id.name_authority}{" "}
                    {
                      document.type_fourteen.signature.advisor_id
                        .surname_authority
                    }
                    )
                  </div>

                  <Divider />
                  <div>
                    ความคิดเห็นหัวหน้าสาขาวิชา:{" "}
                    {document.type_fourteen.signature.mastersubject_comment}
                  </div>
                  <div className="text-center">
                    <Avatar
                      style={{
                        width: 100,
                        height: 40,
                      }}
                      src={`${endpointUrl}upload/signature/${document.type_fourteen.signature.mastersubject_path_sig}`}
                      alt="signature"
                    />
                  </div>
                  <div className="text-center">
                    ({" "}
                    {
                      document.type_fourteen.signature.mastersubject_id
                        .name_authority
                    }{" "}
                    {
                      document.type_fourteen.signature.mastersubject_id
                        .surname_authority
                    }
                    )
                  </div>

                  <Divider />
                  <div>
                    ความคิดเห็นหัวหน้าแผนกงานพัฒนานักศึกษาประจำคณะ :{" "}
                    {
                      document.type_fourteen.signature
                        .head_student_development_comment
                    }
                  </div>
                  <div className="text-center">
                    <Avatar
                      style={{
                        width: 100,
                        height: 40,
                      }}
                      src={`${endpointUrl}upload/signature/${document.type_fourteen.signature.head_student_development_path_sig}`}
                      alt="signature"
                    />
                  </div>
                  <div className="text-center">
                    ({" "}
                    {
                      document.type_fourteen.signature
                        .head_student_development_id.name_authority
                    }{" "}
                    {
                      document.type_fourteen.signature
                        .head_student_development_id.surname_authority
                    }
                    )
                  </div>

                  <Divider />
                  <div>
                    ความคิดเห็นรองคณบดีฝ่ายพัฒนานักศึกษาประจำคณะ{" "}
                    {
                      document.type_fourteen.signature
                        .deputy_dean_student_development_comment
                    }
                  </div>
                  <div className="text-center">
                    <Avatar
                      style={{
                        width: 100,
                        height: 40,
                      }}
                      src={`${endpointUrl}upload/signature/${document.type_fourteen.signature.deputy_dean_student_development_path_sig}`}
                      alt="signature"
                    />
                  </div>
                  <div className="text-center">
                    ({" "}
                    {
                      document.type_fourteen.signature
                        .deputy_dean_student_development_id.name_authority
                    }{" "}
                    {
                      document.type_fourteen.signature
                        .deputy_dean_student_development_id.surname_authority
                    }
                    )
                  </div>

                  <Divider />
                  <div>
                    อนุมัติ/ไม่อนุมัติ:{" "}
                    {document.type_fourteen.signature.dean_approve}
                  </div>

                  <div>
                    เนื่องจาก: {document.type_fourteen.signature.dean_since}
                  </div>
                  <div className="text-center">
                    <Avatar
                      style={{
                        width: 100,
                        height: 40,
                      }}
                      src={`${endpointUrl}upload/signature/${document.type_fourteen.signature.dean_path_sig}`}
                      alt="signature"
                    />
                  </div>
                  <div className="text-center">
                    ( {document.type_fourteen.signature.dean_id.name_authority}{" "}
                    {document.type_fourteen.signature.dean_id.surname_authority}
                    )
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

export default ApprovedDocFourteen;
