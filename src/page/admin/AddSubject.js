import { useEffect, useState } from "react";
import React from "react";
import {
  Form,
  Radio,
  Button,
  Row,
  Col,
  Input,
  Modal,
  Select,
  Divider,
  message,
} from "antd";

import AdminService from "../../services/AdminService";

const AddSubject = ({ title }) => {
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {}, []);
  const createSubject = async (values) => {
    setLoading(true);
    try {
      const createSubjectResponse = await AdminService.createSubject(values);

      Modal.success({
        title: "เพิ่มข้อมูลรายวิชาสำเร็จ",
      });
      console.log(createSubjectResponse);
    } catch (error) {
      console.error(error);
      message.error("เพิ่มข้อมูลรายวิชาไม่สำเร็จ");
    }
    setLoading(false);
  };
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    createSubject(values);
  };

  return (
    <Form
      name="validate_other"
      className="mt-3 doc-form"
      onFinish={onFinish}
      initialValues={{
        "input-number": 3,
        "checkbox-group": ["A", "B"],
        rate: 3.5,
      }}
    >
      <h2 className="text-center">เพิ่มข้อมูลรายละเอียดวิชา</h2>

      <Row gutter={[16]}>
        <Col span={8}>
          <Form.Item
            label="รหัสวิชา"
            name="id_subject"
            rules={[{ required: true, message: "กรุณากรอกชื่อ" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="ชื่อวิชา"
            name="name_subject"
            rules={[{ required: true, message: "กรุณากรอกนามสกุล" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={5}>
          <Form.Item
            label="หน่วยกิต"
            name="unit_subject"
            rules={[{ required: true, message: "กรุณากรอกรหัสนักศึกษา" }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <div className="text-right">
        <Button
          type="primary"
          htmlType="submit"
          loading={isLoading}
          disabled={isLoading}
        >
          ยืนยัน
        </Button>
      </div>
    </Form>
  );
};
export default AddSubject;
