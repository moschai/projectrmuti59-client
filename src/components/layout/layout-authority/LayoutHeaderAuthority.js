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
        {/* <Menu.Item key="/">
          <HomeOutlined />
          หน้าแรก
        </Menu.Item> */}
        <Menu.Item key="document">
          {" "}
          <span className="submenu-title-wrapper">
            <FormOutlined />
            ตารางแบบคำร้องนักศึกษา
          </span>
        </Menu.Item>

        <Menu.SubMenu
          title={
            <span className="submenu-title-wrapper">
              <FormOutlined />
              ตารางแบบคำร้องอาจารย์ประจำวิชา
            </span>
          }
        >
          <Menu.Item key="docauthsubjectsix">
            แบบคำร้องเพิ่ม/ถอนราย วิชาล่าช้า
          </Menu.Item>

          <Menu.Item key="docauthsubjectseven">
            แบบคำร้องขอลงทะเบียนเรียน
          </Menu.Item>
          <Menu.Item key="docauthsubjecteight">
            แบบคำร้องขอเปลี่ยนกลุ่มเรียน
          </Menu.Item>
          <Menu.Item key="docauthsubjectnine">
            หนังสือรับรองการเข้าเรียน
          </Menu.Item>
          <Menu.Item key="docauthsubjectten">
            คำร้องขอลงทะเบียนเรียนเทียบรายวิชา
          </Menu.Item>
          {/* <Menu.Item key="docauthsubjectsnotsameteen">
            คำร้องขอแก้ไขหมวดวิชาตามโครงสร้างหลักสูตร
          </Menu.Item> */}
        </Menu.SubMenu>

        {isAuthentication && (
          <Menu.Item className="ml-auto">
            {profile.name_authority} {profile.surname_authority}
          </Menu.Item>
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
