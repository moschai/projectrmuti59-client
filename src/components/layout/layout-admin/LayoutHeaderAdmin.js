import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Container from "../Container";
import { Menu } from "antd";
import { HomeOutlined, FormOutlined, TagsOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { authorityLogoutAction } from "../../../redux/actions/AuthAction";
import { adminLogoutAction } from "../../../redux/actions/AuthAdminAction";

export default function LayoutHeaderAdmin({ activeMenu }) {
  const { profile, isAuthentication } = useSelector(
    (state) => state.authAdminState
  );
  const [current, setCurrent] = useState(activeMenu);
  const dispatch = useDispatch();
  const router = useHistory();

  const handleClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
    if (e.key === "/") {
      router.push("/admin");
    } else {
      router.push(`/admin/${e.key}`);
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
        {/* <Menu.Item key="/">
          <HomeOutlined />
          หน้าแรก
        </Menu.Item> */}

        <Menu.Item key="addauthority">
          {" "}
          <span className="submenu-title-wrapper">
            <FormOutlined />
            เพิ่มข้อมูลอาจารย์/เจ้าหน้าที่
          </span>
        </Menu.Item>

        <Menu.Item key="addsubject">
          {" "}
          <span className="submenu-title-wrapper">
            <FormOutlined />
            เพิ่มข้อมูลรายวิชา
          </span>
        </Menu.Item>

        <Menu.Item key="documentdelete">
          {" "}
          <span className="submenu-title-wrapper">
            <FormOutlined />
            ลบข้อมูลใบคำร้อง
          </span>
        </Menu.Item>

        {isAuthentication && (
          <Menu.Item
            className="ml-auto"
            onClick={() => dispatch(adminLogoutAction())}
          >
            ออกจากระบบ
          </Menu.Item>
        )}
      </Menu>
    </Container>
  );
}
