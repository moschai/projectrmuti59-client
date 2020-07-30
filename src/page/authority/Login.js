import React, { useState, useEffect } from "react";
import { Form, Input, Button, Checkbox, Col, Row, message } from "antd";
import { useHistory } from "react-router-dom";
import AuthService from "../../services/AuthService";
import Loading from "../../components/Loading";
import { useSelector, useDispatch } from "react-redux";
import { appPath } from "../../router/path";
import { authorityLoginAction } from "../../redux/actions/AuthAction";
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

const AuthorityLoginPage = () => {
  const { isAuthentication, isLoading, errorMessage } = useSelector(
    (state) => state.authState
  );
  const router = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(isAuthentication);
    if (isAuthentication) {
      router.push(appPath.authority.root);
    }
    if (errorMessage) {
      message.error(errorMessage);
    }
  }, [isAuthentication, errorMessage]);

  const onFinish = async (values) => {
    console.log("Success:", values);
    dispatch(authorityLoginAction(values));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Row gutter={[8]}>
        <Col xs={24} sm={24} md={12} span={12}>
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
export default AuthorityLoginPage;
