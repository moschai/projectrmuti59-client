import { useEffect, useState } from "react";
import React from "react";
import { Form, Button, Row, Input, Modal, message, Col } from "antd";

import AdminService from "../../services/AdminService";

const RegisterAuthority = ({ title }) => {
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {}, []);
  const createAuthority = async (values) => {
    setLoading(true);
    try {
      const createAuthorityResponse = await AdminService.createAthority(values);

      Modal.success({
        title: "เพิ่มข้อมูลเจ้าหน้าที่/อาจารย์สำเร็จ",
      });
      console.log(createAuthorityResponse);
    } catch (error) {
      console.error(error);
      message.error("เพิ่มข้อมูลเจ้าหน้าที่/อาจารย์ไม่สำเร็จ");
    }
    setLoading(false);
  };
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    createAuthority(values);
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
      <h2 className="text-center">เพิ่มข้อมูลเจ้าหน้าที่/อาจารย์</h2>

      <Row gutter={[16]}>
        <Col span={8}>
          <Form.Item
            label="ชื่อ"
            name="name_authority"
            rules={[{ required: true, message: "กรุณากรอกชื่อ" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="นามสกุล"
            name="surname_authority"
            rules={[{ required: true, message: "กรุณากรอกนามสกุล" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="ตำแหน่ง"
            name="position_authority"
            rules={[{ required: true, message: "กรุณากรอกตำแหน่ง" }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16]}>
        <Col span={8}>
          <Form.Item
            label="ชื่อผู้ใช้"
            name="username"
            rules={[{ required: true, message: "กรุณากรอกชื่อผู้ใช้งาน" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="รหัสผ่าน"
            name="password"
            rules={[{ required: true, message: "กรุณากรอกรหัสผ่าน" }]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item
            label="รหัสคณะ"
            name="faculty"
            rules={[{ required: true, message: "กรุณากรอกรหัสคณะ" }]}
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
export default RegisterAuthority;
