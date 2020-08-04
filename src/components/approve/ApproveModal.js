import React, { useRef, useState } from "react";
import { Modal, Button, Input, Form, Row, Avatar } from "antd";
import { ClearOutlined, SaveOutlined } from "@ant-design/icons";
import SignaturePad from "react-signature-canvas";

const ApproveModal = ({ isOpen, onClose, loading }) => {
  const ref = useRef();
  const clear = () => {
    console.log(ref.current.isEmpty());
    ref.current.clear();
    console.log(ref.current.isEmpty());
  };
  const [signatureURL, setSignatureURL] = useState("");

  const save = () => {
    const signatureDataUrl = ref.current
      .getTrimmedCanvas()
      .toDataURL("image/png");
    setSignatureURL(signatureDataUrl);
  };
  return (
    <Modal
      title="อนุมัติคำร้อง"
      footer={[
        <Button key="back" onClick={onClose}>
          ยกเลิก
        </Button>,
        <Button
          form="approveForm"
          htmlType="submit"
          key="submit"
          type="primary"
          loading={loading}
        >
          ยืนยันการอนุมติ
        </Button>,
      ]}
      visible={isOpen}
      onCancel={onClose}
    >
      <Form id="approveForm">
        <Form.Item
          label="ความคิดเห็น"
          name="since"
          rules={[{ required: true, message: "กรุณาระบุความคิดเห็น" }]}
        >
          <Input.TextArea autoSize placeholder="ความคิดเห็น" />
        </Form.Item>
        <div style={{ border: "1px solid gray" }} className="mt-3">
          <SignaturePad ref={ref} canvasProps={{ style: { width: "100%" } }} />

          <Row justify="end">
            <Button icon={<ClearOutlined />} onClick={clear} />
            <Button icon={<SaveOutlined />} onClick={save} />
          </Row>
          {signatureURL && (
            <Avatar src={signatureURL} style={{ width: "auto", height: 100 }} />
          )}
        </div>
      </Form>
    </Modal>
  );
};
export default ApproveModal;
