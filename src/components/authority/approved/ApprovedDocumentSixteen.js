import React, { useState, useEffect } from "react";
import DocumentSixteenService from "../../../services/DocumentSixteenService";
import { endpointUrl } from "../../../config";
import { Spin, Button, Divider, Avatar } from "antd";
import { Card, Col, Row, Modal, Form, message } from "antd";
import { lveducationNumberToString } from "../../../helpers/lveducation";
import { dearNumberToString } from "../../../helpers/dear";
import "../../../styles/App.css";
import { useLocation, useHistory } from "react-router-dom";
import { appPath } from "../../../router/path";
import ApproveModal from "../../approve/ApproveModal";

const ApprovedDocSixteen = ({ documentId }) => {
  const [isLoading, setLoading] = useState(true);
  const [document, setDocument] = useState({});
  const [isOpen, setOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [form] = Form.useForm();
  const history = useHistory();
  useEffect(() => {
    getDocumentSixteen();
  }, []);
  const getDocumentSixteen = async () => {
    try {
      const res = await DocumentSixteenService.getDocumentSixteenByDocumentId(
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

  const approvedDocumentSixteen = async (values) => {
    setCreating(true);
    try {
      const documentApprovedSixteenResponse = await DocumentSixteenService.approvedDocumentSixteen(
        values,
        documentId
      );
      console.log(values);

      Modal.success({
        title: "อนุมัติแบบคำร้องสำเร็จ",

        cancelText: false,
      });
      history.push(`${appPath.authority.root}${appPath.authority.document}`);

      console.log(documentApprovedSixteenResponse);
    } catch (error) {
      console.error(error);
      message.error("อนุมัติแบบคำร้องไม่สำเร็จ");
    }
    setCreating(false);
    setOpen(false);
  };

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    approvedDocumentSixteen(values);
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
          <Col span={12}>
            <Card title="ใบคำร้องขอสำเร็จการศึกษาล่าช้า " bordered={false}>
              <span className="FontThick">
                คำร้องขอสำเร็จการศึกษา ภาคเรียนที่ :{" "}
              </span>
              <span className="FontSize">
                {document.type_sixteen.delaygraduationterm}
              </span>
              {"  "}
              <span className="FontThick">ปีการศึกษา : </span>
              <span className="FontSize">
                {document.type_sixteen.delaygraduationyear}
              </span>
              <br />
              <span className="FontThick">เรื่อง ขอสำเร็จการศึกษาล่าช้า</span>
              <br />
              <span className="FontThick">เรียน : </span>
              <span className="FontSize">
                {dearNumberToString(document.type_sixteen.dear)}
              </span>
              <br />
              <span className="FontThick">
                มีความประสงค์ ขอสำเร็จการศึกษาล่าช้า ภาคการศึกษาที่:{" "}
              </span>
              <span className="FontSize">
                {document.type_sixteen.delaygraduationterm}
              </span>
              {"  "}
              <span className="FontThick">ปีการศึกษา : </span>
              <span className="FontSize">
                {document.type_sixteen.delaygraduationyear}
              </span>
              <br />
              <span className="FontThick">เนื่องจาก : </span>
              <span className="FontSize">{document.type_sixteen.since}</span>
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
                {document.type_sixteen.classyear}
              </span>
              <br />

              <span className="FontThick">ระยะเวลาการศึกษา : </span>
              <span className="FontSize">
                {document.type_sixteen.timestudy}
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
                    {document.type_sixteen.signature.advisor_comment}
                  </div>
                  <div className="text-center">
                    <Avatar
                      style={{
                        width: 100,
                        height: 40,
                      }}
                      src={`${endpointUrl}upload/signature/${document.type_sixteen.signature.advisor_path_sig}`}
                      alt="signature"
                    />
                  </div>

                  <Divider />
                  <div>
                    ความคิดเห็นหัวหน้าสาขาวิชา:{" "}
                    {document.type_sixteen.signature.mastersubject_comment}
                  </div>
                  <div className="text-center">
                    <Avatar
                      style={{
                        width: 100,
                        height: 40,
                      }}
                      src={`${endpointUrl}upload/signature/${document.type_sixteen.signature.mastersubject_path_sig}`}
                      alt="signature"
                    />
                  </div>

                  <Divider />
                  <div>
                    ความคิดเห็นหัวหน้างานบริการการศึกษา/หัวหน้าสำนักงานคณบดี:{" "}
                    {
                      document.type_sixteen.signature
                        .head_service_or_deanoffice_comment
                    }
                  </div>
                  <div className="text-center">
                    <Avatar
                      style={{
                        width: 100,
                        height: 40,
                      }}
                      src={`${endpointUrl}upload/signature/${document.type_sixteen.signature.head_service_or_deanoffice_path_sig}`}
                      alt="signature"
                    />
                  </div>

                  <Divider />
                  <div>
                    ความคิดเห็นรองคณบดีฝ่ายวิชาการและวิจัย:{" "}
                    {
                      document.type_sixteen.signature
                        .deputy_dean_research_comment
                    }
                  </div>
                  <div className="text-center">
                    <Avatar
                      style={{
                        width: 100,
                        height: 40,
                      }}
                      src={`${endpointUrl}upload/signature/${document.type_sixteen.signature.deputy_dean_research_path_sig}`}
                      alt="signature"
                    />
                  </div>

                  <Divider />
                  <div>
                    ความคิดของคณบดี:{" "}
                    {document.type_sixteen.signature.dean_comment}
                  </div>
                  <div className="text-center">
                    <Avatar
                      style={{
                        width: 100,
                        height: 40,
                      }}
                      src={`${endpointUrl}upload/signature/${document.type_sixteen.signature.dean_path_sig}`}
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

export default ApprovedDocSixteen;
