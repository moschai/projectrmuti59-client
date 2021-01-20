import React, { useState, useEffect } from "react";
import DocumentTwelveService from "../../../services/DocumentTwelveService";
import { endpointUrl } from "../../../config";
import { Spin, Button, Divider, Avatar } from "antd";
import { Card, Col, Row, Modal, Form, message } from "antd";
import "../../../styles/App.css";
import { lveducationNumberToString } from "../../../helpers/lveducation";
import { useLocation, useHistory } from "react-router-dom";
import { appPath } from "../../../router/path";
import ApproveModal from "../../approve/ApproveModal";

const ApprovedDocTwelve = ({ documentId }) => {
  const [isLoading, setLoading] = useState(true);
  const [document, setDocument] = useState({});
  const [isOpen, setOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [form] = Form.useForm();
  const history = useHistory();
  useEffect(() => {
    getDocumentTwelve();
  }, []);
  const getDocumentTwelve = async () => {
    try {
      const res = await DocumentTwelveService.getDocumentTwelveByDocumentId(
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

  const approvedDocumentTwelve = async (values) => {
    setCreating(true);
    try {
      const documentApprovedTwelveResponse = await DocumentTwelveService.approvedDocumentTwelve(
        values,
        documentId
      );
      console.log(values);

      Modal.success({
        title: "อนุมัติแบบคำร้องสำเร็จ",

        cancelText: false,
      });
      history.push(`${appPath.authority.root}${appPath.authority.document}`);

      console.log(documentApprovedTwelveResponse);
    } catch (error) {
      console.error(error);
      message.error("อนุมัติแบบคำร้องไม่สำเร็จ");
    }
    setCreating(false);
    setOpen(false);
  };

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    approvedDocumentTwelve(values);
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
          <Col span={14}>
            <Card title="ใบคำร้องขอลาออกจากการเป็นนักศึกษา" bordered={false}>
              <span className="FontThick">
                เรียน : รองอธิการบดีประจำวิทยาเขตขอนแก่น
              </span>
              <br />
              <span className="FontThick">
                มีความประสงค์ขอลาออกจากการเป็นนักศึกษาของมหาวิทยาลัย
                เทคโนโลยีราชมงคลอีสาน <br /> วิทยาเขตขอนแก่น เนื่องจาก :
              </span>
              <span className="FontSize">
                {document.type_twelve.resignsince}
              </span>
              <br />
            </Card>
          </Col>
          <Col span={10}>
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

              <span className="FontThick">เกิดวันที่ : </span>
              <span className="FontSize">
                {document.type_twelve.dayborn}
                {"  "}
              </span>

              <span className="FontThick">เดือน : </span>
              <span className="FontSize">
                {document.type_twelve.monthborn}
                {"  "}
              </span>

              <span className="FontThick">พ.ศ : </span>
              <span className="FontSize">
                {document.type_twelve.yearborn}
                {"  "}
              </span>

              <span className="FontThick">อายุ : </span>
              <span className="FontSize">
                {document.type_twelve.ageborn}
                {" ปี"}
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
                    {document.type_twelve.signature.advisor_comment}
                  </div>
                  <div className="text-center">
                    <Avatar
                      style={{
                        width: 100,
                        height: 40,
                      }}
                      src={`${endpointUrl}upload/signature/${document.type_twelve.signature.advisor_path_sig}`}
                      alt="signature"
                    />
                  </div>

                  <Divider />
                  <div>
                    ความคิดเห็นหัวหน้าสาขาวิชา:{" "}
                    {document.type_twelve.signature.mastersubject_comment}
                  </div>
                  <div className="text-center">
                    <Avatar
                      style={{
                        width: 100,
                        height: 40,
                      }}
                      src={`${endpointUrl}upload/signature/${document.type_twelve.signature.mastersubject_path_sig}`}
                      alt="signature"
                    />
                  </div>

                  <Divider />
                  <div>
                    ความคิดเห็นหัวหน้างานบริการการศึกษา/หัวหน้าสำนักงานคณบดี:{" "}
                    {
                      document.type_twelve.signature
                        .head_service_or_deanoffice_comment
                    }
                  </div>
                  <div className="text-center">
                    <Avatar
                      style={{
                        width: 100,
                        height: 40,
                      }}
                      src={`${endpointUrl}upload/signature/${document.type_twelve.signature.head_service_or_deanoffice_path_sig}`}
                      alt="signature"
                    />
                  </div>

                  <Divider />
                  <div>
                    ความคิดเห็นรองคณบดีฝ่ายวิชาการและวิจัย:{" "}
                    {
                      document.type_twelve.signature
                        .deputy_dean_research_comment
                    }
                  </div>
                  <div className="text-center">
                    <Avatar
                      style={{
                        width: 100,
                        height: 40,
                      }}
                      src={`${endpointUrl}upload/signature/${document.type_twelve.signature.deputy_dean_research_path_sig}`}
                      alt="signature"
                    />
                  </div>

                  <Divider />
                  <div>
                    ความคิดของคณบดี:{" "}
                    {document.type_twelve.signature.dean_comment}
                  </div>
                  <div className="text-center">
                    <Avatar
                      style={{
                        width: 100,
                        height: 40,
                      }}
                      src={`${endpointUrl}upload/signature/${document.type_twelve.signature.dean_path_sig}`}
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

export default ApprovedDocTwelve;
