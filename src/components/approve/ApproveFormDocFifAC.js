import React, { useRef, useState } from "react";
import {
  Modal,
  Button,
  Input,
  Form,
  Row,
  Avatar,
  Radio,
  Checkbox,
  Upload,
} from "antd";
import { ClearOutlined, SaveOutlined } from "@ant-design/icons";
import SignaturePad from "react-signature-canvas";
import { useForm } from "antd/lib/form/util";
import UploadService from "../../services/Upload";
import { useSelector } from "react-redux";

const ApproveFormDocFifAC = ({
  isOpen,
  onClose,
  loading,
  setLoading,
  finish,
  hideComment,
  notApproved,
}) => {
  const ref = useRef();
  const [showother_activityst, setShowother_activityst] = useState(false);
  const [showother_activitystone, setShowother_activitystone] = useState(false);
  const [showother_activitysttwo, setShowother_activitysttwo] = useState(false);
  const [showother_activitystthree, setShowother_activitystthree] = useState(
    false
  );
  const [form] = useForm();
  const { profile } = useSelector((state) => state.authState);
  console.log(profile);
  const clear = () => {
    console.log(ref.current.isEmpty());
    ref.current.clear();
    console.log(ref.current.isEmpty());
  };

  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  function beforeUpload(file) {
    getBase64(file, (imageUrl) => {
      ref.current.fromDataURL(imageUrl);
    });
    return false;
  }

  const onFinish = (values) => {
    if (ref.current.isEmpty()) {
      return Modal.error({ title: "กรุณาเซ็น" });
    }
    const signatureDataUrl = ref.current
      .getTrimmedCanvas()
      .toDataURL("image/png");

    fetch(signatureDataUrl)
      .then((res) => res.blob())
      .then(async (blob) => {
        var fd = new FormData();
        fd.append("signature", blob, "signature.jpg");
        setLoading(true);
        const response = await UploadService.uploadSignature(fd);
        values.filename = response.filename;
        values.notApproved = notApproved;
        console.log(response);

        finish(values);
        // Upload
        // fetch('upload', {method: 'POST', body: fd})
      });

    console.log(values);
  };
  console.log(notApproved);

  return (
    <Modal
      title={notApproved ? "ไม่อนุมัติ" : "อนุมัติคำร้อง"}
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
          danger={notApproved}
        >
          ยืนยัน
        </Button>,
      ]}
      visible={isOpen}
      onCancel={onClose}
    >
      <Form onFinish={onFinish} form={form} id="approveForm">
        <Form.Item name="std_notorpass_activity" label="ความคิดเห็น">
          <Radio.Group>
            <Radio value="1">นักศึกษาได้ผ่านกิจกรรมเป็นที่เรียบร้อยแล้ว</Radio>
          </Radio.Group>
        </Form.Item>

        <div style={{ paddingLeft: 10 }}>
          <Form.Item
            name="other_activityst"
            label="นักศึกษายังไม่ผ่านกิจกรรมจำนวน "
          >
            <Checkbox
              onChange={(e) => {
                setShowother_activityst(e.target.checked);
              }}
            />
          </Form.Item>

          {showother_activityst && (
            <div style={{ paddingLeft: 10 }}>
              <Form.Item
                style={{ marginLeft: 5 }}
                name="std_activityunit"
                className="ml-3"
                rules={[{ required: true, message: "ระบุจำนวนหน่วยกิต" }]}
              >
                <Input />
              </Form.Item>
            </div>
          )}
        </div>

        <div style={{ paddingLeft: 10 }}>
          <Form.Item name="other_activitystone" label=" ">
            <Checkbox
              onChange={(e) => {
                setShowother_activitystone(e.target.checked);
              }}
            />
          </Form.Item>

          {showother_activitystone && (
            <div style={{ paddingLeft: 10 }}>
              <Form.Item
                style={{ marginLeft: 5 }}
                name="commentone_activity"
                className="ml-3"
                rules={[{ required: true, message: "ระบุ" }]}
              >
                <Input />
              </Form.Item>
            </div>
          )}
        </div>
        <div style={{ paddingLeft: 10 }}>
          <Form.Item name="other_activitysttwo" label=" ">
            <Checkbox
              onChange={(e) => {
                setShowother_activitysttwo(e.target.checked);
              }}
            />
          </Form.Item>

          {showother_activitysttwo && (
            <div style={{ paddingLeft: 10 }}>
              <Form.Item
                style={{ marginLeft: 5 }}
                name="commenttwo_activity"
                className="ml-3"
                rules={[{ required: true, message: "ระบุ" }]}
              >
                <Input />
              </Form.Item>
            </div>
          )}
        </div>
        <div style={{ paddingLeft: 10 }}>
          <Form.Item name="other_activitystthree" label=" ">
            <Checkbox
              onChange={(e) => {
                setShowother_activitystthree(e.target.checked);
              }}
            />
          </Form.Item>

          {showother_activitystthree && (
            <div style={{ paddingLeft: 10 }}>
              <Form.Item
                style={{ marginLeft: 5 }}
                name="commentthree_activity"
                className="ml-3"
                rules={[{ required: true, message: "ระบุจำนวนหน่วยกิต" }]}
              >
                <Input />
              </Form.Item>
            </div>
          )}
        </div>

        {/* {!hideComment && (
          <Form.Item
            label="ความคิดเห็น"
            name="comment"
            rules={[{ required: true, message: "กรุณาระบุความคิดเห็น" }]}
          >
            <Input.TextArea autoSize placeholder="ความคิดเห็น" />
          </Form.Item>
        )} */}

        <div style={{ border: "1px solid gray" }} className="mt-3">
          <SignaturePad ref={ref} canvasProps={{ style: { width: "100%" } }} />

          <Row justify="end">
            <Button icon={<ClearOutlined />} onClick={clear} />
          </Row>
        </div>
        <Upload
          name="avatar"
          listType="picture"
          showUploadList={false}
          beforeUpload={beforeUpload}
        >
          <Button>Upload Signature</Button>
        </Upload>
      </Form>
    </Modal>
  );
};
export default ApproveFormDocFifAC;
