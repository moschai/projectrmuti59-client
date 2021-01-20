import React, { useState } from "react";
import { Form, Input, Col, Row, Divider, Button, message, Tag } from "antd";
import DocumentService from "../../services/DocumentService";
import { RenderDocumentType } from "../authority/ForAuthorityTable";
import DocumentTagOne from "./DocumentTagOne";
import DownloadDocumentOnePDF from "./DocumentOnePDF";
import DownloadDocumentTwoPDF from "./DocumentTwoPDF";
import DownloadDocumentThreePDF from "./DocumentThreePDF";
import DownloadDocumentFourPDF from "./DocumentFourPDF";
import DownloadDocumentFivePDF from "./DocumentFivePDF";
import DownloadDocumentSixPDF from "./DocumentSixPDF";
import DownloadDocumentSevenPDF from "./DocumentSevenPDF";
import DownloadDocumentNinePDF from "./DocumentNinePDF";
import DownloadDocumentTenPDF from "./DocumentTenPDF";
import DownloadDocumentElevenPDF from "./DocumentElevenPDF";
import DownloadDocumentTwelvePDF from "./DocumentTwelvePDF";
import DownloadDocumentThirteenPDF from "./DocumentThirteenPDF";
import DownloadDocumentFourteenPDF from "./DocumentFourteenPDF";
import DownloadDocumentFifteenPDF from "./DocumentFifteenPDF";
import DownloadDocumentSixteenPDF from "./DocumentSixteenPDF";
import DownloadDocumentSeventeenPDF from "./DocumentSeventeenPDF";
import DocumentTagTwo from "./DocumentTagTwo";
import DocumentTagThree from "./DocumentTagThree";
import DocumentTagFour from "./DocumentTagFour";
import DocumentTagFive from "./DocumentTagFive";
import DocumentTagSix from "./DocumentTagSix";
import DocumentTagSeven from "./DocumentTagSeven";
import DocumentTagEight from "./DocumentTagEight";
import DocumentTagNine from "./DocumentTagNine";
import DocumentTagTen from "./DocumentTagTen";
import DocumentTagEleven from "./DocumentTagEleven";
import DocumentTagTwelve from "./DocumentTagTwelve";
import DocumentTagThirteen from "./DocumentTagThirteen";
import DocumentTagFourteen from "./DocumentTagFourteen";
import DocumentTagFifteen from "./DocumentTagFifteen";
import DocumentTagSixteen from "./DocumentTagSixteen";
import DocumentTagSeventeen from "./DocumentTagSeventeen";

const DocumentTag = () => {
  const [document, setdocument] = useState();
  const onFinish = async (values) => {
    console.log("Received values of form: ", values);
    try {
      const res = await DocumentService.getDocumentByStudent(
        values.documentId,
        values.studentId
      );
      setdocument(res);
      console.log(res);
    } catch (error) {
      message.error("ไม่พบข้อมูล");
    }
  };

  return (
    <div style={{ backgroundColor: "#fff", padding: 10 }}>
      <Form onFinish={onFinish}>
        <Row justify="center">
          <Col xs={24} sm={24} md={12} span={12}>
            <Form.Item
              label="ระบุรหัสใบคำร้อง"
              name="documentId"
              rules={[
                {
                  required: true,
                  message: "กรุณาระบุรหัสใบคำร้องที่ต้องการตรวจสอบสถานะ!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="ระบุรหัสนักศึกษา"
              name="studentId"
              rules={[
                {
                  required: true,
                  message: "กรุณาระบุรหัสใบคำร้องที่ต้องการตรวจสอบสถานะ!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row justify="center">
          <Button htmlType="submit">ตรวจสอบ</Button>
        </Row>
      </Form>
      {document && (
        <>
          <Row justify="center">
            {document.type_document === 1 && (
              <DocumentTagOne document={document} />
            )}
            {document.type_document === 2 && (
              <DocumentTagTwo document={document} />
            )}
            {document.type_document === 3 && (
              <DocumentTagThree document={document} />
            )}
            {document.type_document === 4 && (
              <DocumentTagFour document={document} />
            )}
            {document.type_document === 5 && (
              <DocumentTagFive document={document} />
            )}
            {document.type_document === 6 && (
              <DocumentTagSix document={document} />
            )}
            {document.type_document === 7 && (
              <DocumentTagSeven document={document} />
            )}
            {document.type_document === 8 && (
              <DocumentTagEight document={document} />
            )}
            {document.type_document === 9 && (
              <DocumentTagNine document={document} />
            )}
            {document.type_document === 10 && (
              <DocumentTagTen document={document} />
            )}
            {document.type_document === 11 && (
              <DocumentTagEleven document={document} />
            )}
            {document.type_document === 12 && (
              <DocumentTagTwelve document={document} />
            )}
            {document.type_document === 13 && (
              <DocumentTagThirteen document={document} />
            )}

            {document.type_document === 14 && (
              <DocumentTagFourteen document={document} />
            )}

            {document.type_document === 15 && (
              <DocumentTagFifteen document={document} />
            )}

            {document.type_document === 16 && (
              <DocumentTagSixteen document={document} />
            )}

            {document.type_document === 17 && (
              <DocumentTagSeventeen document={document} />
            )}

            {/* <Col xs={24} className="text-center">
              สถานะ :{" "}
              {document.isAllSignature ? (
                document.type_document === 1 ||
                document.type_document === 2 ||
                document.type_document === 3 ||
                (document.type_document === 6 &&
                  document.isAllTableSignature) ||
                (document.type_document === 7 &&
                  document.isAllTableSignature) ||
                (document.type_document === 8 &&
                  document.isAllTableSignature) ? (
                  <>
                    <Tag color="success">
                      ดำเนินการในส่วนของคณะครุศาสตร์อุตสาหกรรมสำเร็จ <br />
                      โปรดบันทึกไฟล์ใบคำร้องของท่านที่ปุ่ม(ดาวโหลดแบบคำร้อง)เพื่อดำเนินการต่อในขั้นตอนต่อไป
                    </Tag>
                  </>
                ) : (
                  <Tag color="warning">
                    อยู่ระหว่างการดำเนินการในส่วนของคณะครุศาสตร์อุตสาหกรรม
                  </Tag>
                )
              ) : (
                <Tag color="warning">
                  อยู่ระหว่างการดำเนินการในส่วนของคณะครุศาสตร์อุตสาหกรรม
                </Tag>
              )}
            </Col> */}
            <Col sm={24} className="text-center">
              {document.type_document === 1 && document.isAllSignature && (
                <DownloadDocumentOnePDF document={document} />
              )}
              {document.type_document === 2 && document.isAllSignature && (
                <DownloadDocumentTwoPDF document={document} />
              )}
              {document.type_document === 3 && document.isAllSignature && (
                <DownloadDocumentThreePDF document={document} />
              )}
              {document.type_document === 4 && document.isAllSignature && (
                <DownloadDocumentFourPDF document={document} />
              )}
              {document.type_document === 5 && document.isAllSignature && (
                <DownloadDocumentFivePDF document={document} />
              )}
              {document.type_document === 11 && document.isAllSignature && (
                <DownloadDocumentElevenPDF document={document} />
              )}
              {document.type_document === 12 && document.isAllSignature && (
                <DownloadDocumentTwelvePDF document={document} />
              )}
              {document.type_document === 13 && (
                <DownloadDocumentThirteenPDF document={document} />
              )}
              {document.type_document === 14 && document.isAllSignature && (
                <DownloadDocumentFourteenPDF document={document} />
              )}
              {document.type_document === 15 && document.isAllSignature && (
                <DownloadDocumentFifteenPDF document={document} />
              )}
              {document.type_document === 16 && document.isAllSignature && (
                <DownloadDocumentSixteenPDF document={document} />
              )}
              {document.type_document === 17 && document.isAllSignature && (
                <DownloadDocumentSeventeenPDF document={document} />
              )}

              {document.type_document === 6 &&
                document.isAllSignature &&
                document.isAllTableSignature && (
                  <DownloadDocumentSixPDF document={document} />
                )}
              {document.type_document === 7 &&
                document.isAllSignature &&
                document.isAllTableSignature && (
                  <DownloadDocumentSevenPDF document={document} />
                )}

              {document.type_document === 9 &&
                document.isAllSignature &&
                document.isAllTableSignature && (
                  <DownloadDocumentNinePDF document={document} />
                )}

              {document.type_document === 10 &&
                document.isAllSignature &&
                document.isAllTableSignature && (
                  <DownloadDocumentTenPDF document={document} />
                )}
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};
export default DocumentTag;
