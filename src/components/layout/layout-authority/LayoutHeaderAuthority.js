import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Container from "../Container";
import { Menu } from "antd";
import { HomeOutlined, FormOutlined, TagsOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { authorityLogoutAction } from "../../../redux/actions/AuthAction";

export default function LayoutHeaderAuthority({ activeMenu }) {
  const { profile, isAuthentication } = useSelector((state) => state.authState);
  const [current, setCurrent] = useState(activeMenu);
  const dispatch = useDispatch();
  const router = useHistory();

  const handleClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
    if (e.key === "/") {
      router.push("/authority");
    } else {
      router.push(`/authority/${e.key}`);
    }
  };

  return (
    <Container>
      <Menu
        onClick={handleClick}
        selectedKeys={current}
        className="d-flex"
        mode="horizontal"
      >
        <Menu.Item key="/">
          <HomeOutlined />
          หน้าแรก
        </Menu.Item>
        <Menu.Item key="document">
          {" "}
          <span className="submenu-title-wrapper">
            <FormOutlined />
            ตารางใบคำร้องนักศึกษา
          </span>
        </Menu.Item>
        <Menu.Item key="mail">
          <TagsOutlined />
          ติดตามแบบคำร้อง
        </Menu.Item>

        {isAuthentication && (
          <Menu.Item className="ml-auto">{profile.name_authority}</Menu.Item>
        )}

        {isAuthentication && (
          <Menu.Item
            className="ml-auto"
            onClick={() => dispatch(authorityLogoutAction())}
          >
            ออกจากระบบ
          </Menu.Item>
        )}
      </Menu>
    </Container>
  );
}
