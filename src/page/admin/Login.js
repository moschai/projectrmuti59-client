import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Col,
  Row,
  message,
  Image,
  Avatar,
} from "antd";
import { useHistory } from "react-router-dom";
import AuthService from "../../services/AuthService";
import Loading from "../../components/Loading";
import { useSelector, useDispatch } from "react-redux";
import { appPath } from "../../router/path";
import { adminLoginAction } from "../../redux/actions/AuthAdminAction";
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const AdminLoginPage = () => {
  const { isAuthentication, isLoading, errorMessage } = useSelector(
    (state) => state.authAdminState
  );
  const router = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(isAuthentication);
    if (isAuthentication) {
      router.push(appPath.admin.root);
    }
    if (errorMessage) {
      message.error(errorMessage);
    }
  }, [isAuthentication, errorMessage]);

  const onFinish = async (values) => {
    console.log("Success:", values);
    dispatch(adminLoginAction(values));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Form
        {...layout}
        style={{
          minWidth: 400,
          boxShadow: "0 11px 19px 0 rgba(0, 0, 0, 0.1)",
          padding: 20,
        }}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <div className="text-center mt-3 mb-3">
          <Avatar
            src="/RMUTI_KORAT.png"
            alt="logo"
            style={{ width: 100, height: 170 }}
          />
        </div>
        <Row justify="center">
          <Col xs={24} sm={24} san={24}>
            <Form.Item
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              label="ชื่อผู้ใช้"
              name="username"
              rules={[
                {
                  required: true,
                  message: "กรุณาระบุชื่อผู้ใช้!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              label="รหัสผ่าน"
              name="password"
              rules={[
                {
                  required: true,
                  message: "กรุณาระบุรหัสผ่าน!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
          </Col>
        </Row>

        <Row justify="center">
          <Col sm={24} xs={24} className="text-right">
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit" loading={isLoading}>
                เข้าสู่ระบบ
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
export default AdminLoginPage;
