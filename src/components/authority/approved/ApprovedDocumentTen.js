import React, { useState, useEffect } from "react";
import DocumentTenService from "../../../services/DocumentTenService";
import { endpointUrl } from "../../../config";
import { Spin, Button, Divider, Avatar } from "antd";
import { Card, Col, Row, Modal, Form, message } from "antd";
import { dearNumberToString } from "../../../helpers/dear";
import { lveducationNumberToString } from "../../../helpers/lveducation";
import "../../../styles/App.css";
import { useLocation, useHistory } from "react-router-dom";
import { appPath } from "../../../router/path";
import ApproveModal from "../../approve/ApproveModal";
import { useSelector } from "react-redux";

const ApprovedDocTen = ({ documentId }) => {
  const [isLoading, setLoading] = useState(true);
  const [document, setDocument] = useState({});
  const [isOpen, setOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [form] = Form.useForm();
  const history = useHistory();
  const [notApproved, setNotApproved] = useState(false);
  const { profile } = useSelector((state) => state.authState);
  useEffect(() => {
    getDocumentTen();
  }, []);
  const getDocumentTen = async () => {
    try {
      const res = await DocumentTenService.getDocumentTenByDocumentId(
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

  const approvedDocumentTen = async (values) => {
    setCreating(true);
    try {
      const documentApprovedTenResponse = await DocumentTenService.approvedDocumentTen(
        values,
        documentId
      );
      console.log(values);

      Modal.success({
        title: "ดำเนินการสำเร็จ",

        cancelText: false,
      });
      history.push(`${appPath.authority.root}${appPath.authority.document}`);

      console.log(documentApprovedTenResponse);
    } catch (error) {
      console.error(error);
      message.error("ดำเนินการไม่สำเร็จ");
    }
    setCreating(false);
    setOpen(false);
  };

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    approvedDocumentTen(values);
  };

  const handleAppove = () => {
    setNotApproved(false);
    setOpen(true);
  };

  const handleNotApproved = () => {
    setNotApproved(true);
    setOpen(true);
  };

  const renderButtonNotAppovedDeputy = () => {
    if (profile.position_authority === "รองคณะบดีผ่ายวิชาการและวิจัย") {
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
          <Col span={10}>
            <Card title="ใบคำร้องขอลงทะเบียนเรียนเทียบรายวิชา" bordered={false}>
              <span className="FontThick">
                คำขอลงทะเบียนเรียนเทียบรายวิชา <br /> ภาคเรียนที่ :{" "}
              </span>
              <span className="FontSize">{document.type_ten.compareterm}</span>
              {"  "}
              <span className="FontThick">ปีการศึกษา : </span>
              <span className="FontSize">{document.type_ten.compareyeat}</span>
              <br />
              <span className="FontThick">เรียน : </span>
              <span className="FontSize">
                {dearNumberToString(document.type_ten.dear)}
              </span>
              <br />
              <Divider />
              <span className="FontThick">ข้อมูลรายวิชา</span>
              {document.type_ten.tables.map((table) => {
                return (
                  <div key={table.idtable}>
                    <span className="FontThick">
                      รายวิชาตามโครงสร้างหลักสูตรของนักศึกษา{" "}
                    </span>
                    <br />
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
                    <span className="FontThick">
                      รายวิชาตามโครงสร้างหลักสูตรที่ต้องการลงทะเบียน{" "}
                    </span>
                    <br />
                    <span className="FontThick">รหัสวิชา : </span>
                    <span className="FontSize">
                      {table.id_subjectnew.id_subject}
                      {"    "}
                    </span>
                    <br />
                    <span className="FontThick">ชื่อวิชา : </span>
                    <span className="FontSize">
                      {" "}
                      {table.id_subjectnew.name_subject}
                      {"    "}
                    </span>
                    <br />
                    <span className="FontThick">หน่วยกิต : </span>
                    <span className="FontSize">
                      {" "}
                      {table.id_subjectnew.unit_subject}
                      {"    "}
                    </span>
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
                {document.type_ten.cumulativeGpa}
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
                  <div>ผลการพิจารณาของคณะกรรมการประจำหลักสูตร 1: </div>
                  <div className="text-center">
                    <Avatar
                      style={{
                        width: 100,
                        height: 40,
                      }}
                      src={`${endpointUrl}upload/signature/${document.type_ten.signature.boardsubjectone_path_sig}`}
                      alt="signature"
                    />
                  </div>

                  <Divider />
                  <div>ผลการพิจารณาของคณะกรรมการประจำหลักสูตร 2: </div>
                  <div className="text-center">
                    <Avatar
                      style={{
                        width: 100,
                        height: 40,
                      }}
                      src={`${endpointUrl}upload/signature/${document.type_ten.signature.boardsubjecttwo_path_sig}`}
                      alt="signature"
                    />
                  </div>

                  <Divider />
                  <div>ผลการพิจารณาของคณะกรรมการประจำหลักสูตร 3: </div>
                  <div className="text-center">
                    <Avatar
                      style={{
                        width: 100,
                        height: 40,
                      }}
                      src={`${endpointUrl}upload/signature/${document.type_ten.signature.boardsubjectthree_path_sig}`}
                      alt="signature"
                    />
                  </div>

                  <Divider />
                  <div>ผลการพิจารณาของคณะกรรมการประจำหลักสูตร 4: </div>
                  <div className="text-center">
                    <Avatar
                      style={{
                        width: 100,
                        height: 40,
                      }}
                      src={`${endpointUrl}upload/signature/${document.type_ten.signature.boardsubjectfour_path_sig}`}
                      alt="signature"
                    />
                  </div>

                  <Divider />
                  <div>
                    ความคิดเห็นอาจารย์ที่ปรึกษา:{" "}
                    {document.type_ten.signature.advisor_comment}
                  </div>
                  <div className="text-center">
                    <Avatar
                      style={{
                        width: 100,
                        height: 40,
                      }}
                      src={`${endpointUrl}upload/signature/${document.type_ten.signature.advisor_path_sig}`}
                      alt="signature"
                    />
                  </div>

                  <Divider />
                  <div>
                    ความคิดเห็นหัวหน้าสาขาวิชา:{" "}
                    {document.type_ten.signature.mastersubject_comment}
                  </div>
                  <div className="text-center">
                    <Avatar
                      style={{
                        width: 100,
                        height: 40,
                      }}
                      src={`${endpointUrl}upload/signature/${document.type_ten.signature.mastersubject_path_sig}`}
                      alt="signature"
                    />
                  </div>

                  <Divider />
                  <div>
                    ความคิดเห็นหัวหน้างานบริการการศึกษา/หัวหน้าสำนักงานคณบดี :{" "}
                    {
                      document.type_ten.signature
                        .head_service_or_deanoffice_comment
                    }
                  </div>
                  <div className="text-center">
                    <Avatar
                      style={{
                        width: 100,
                        height: 40,
                      }}
                      src={`${endpointUrl}upload/signature/${document.type_ten.signature.head_service_or_deanoffice_path_sig}`}
                      alt="signature"
                    />
                  </div>

                  <Divider />
                  <div>
                    ความคิดเห็นรองคณบดีฝ่ายวิชาการและวิจัย
                    เห็นควรอนุมัติ/ไม่อนุมัติ :{" "}
                    {document.type_ten.signature.deputy_dean_research_aprrove}
                  </div>
                  <div className="text-center">
                    <Avatar
                      style={{
                        width: 100,
                        height: 40,
                      }}
                      src={`${endpointUrl}upload/signature/${document.type_ten.signature.deputy_dean_research_path_sig}`}
                      alt="signature"
                    />
                  </div>

                  <Divider />
                  <div>
                    ผลการพิจารณาของคณบดี อนุมัติ/ไม่อนุมัติ:{" "}
                    {document.type_ten.signature.dean_aprrove}
                  </div>

                  <div className="text-center">
                    <Avatar
                      style={{
                        width: 100,
                        height: 40,
                      }}
                      src={`${endpointUrl}upload/signature/${document.type_ten.signature.dean_path_sig}`}
                      alt="signature"
                    />
                  </div>
                </div>
              )}

              <Row justify="end">
                {renderButtonNotAppoved()}
                {renderButtonNotAppovedDeputy()}
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

export default ApprovedDocTen;
