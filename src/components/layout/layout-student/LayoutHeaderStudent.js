import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import { HomeOutlined, FormOutlined, TagsOutlined } from "@ant-design/icons";
import { withRouter } from "react-router-dom";

import Container from "../Container";

function LayoutHeaderStudent({ history }) {
  const pathname = history.location.pathname.replace("/", "");
  const [current, setCurrent] = useState(pathname);

  const handleClick = (e) => {
    history.push(`/${e.key}`);
    setCurrent(e.key);
  };

  return (
    <Container>
      <Menu onClick={handleClick} selectedKeys={current} mode="horizontal">
        <Menu.Item key="student">
          <HomeOutlined />
          หน้าแรก
        </Menu.Item>
        <Menu.SubMenu
          title={
            <span className="submenu-title-wrapper">
              <FormOutlined />
              สร้างแบบคำร้อง
            </span>
          }
        >
          <Menu.Item key="generalrequest">แบบคำร้องทั่วไป</Menu.Item>
          <Menu.Item key="returntostudy">แบบคำร้องขอกลับเข้าศึกษา</Menu.Item>
          <Menu.Item key="pleasestatus">
            แบบคำร้องขอคืนสภาพการเป็นนักศึกษา(เนื่องจากถูกถอนชื่อจากการเป็นนักศึกษา)
          </Menu.Item>
          <Menu.Item key="enrollmentlow">
            แบบคำร้องขอลงทะเบียน เกิน/ต่ำกว่าเกณฑ์
          </Menu.Item>
          <Menu.Item key="maintainstatus">
            คำร้องขอลาพักการเรียน/รักษาสภาพเพื่อรอสำเร็จการศึกษา
          </Menu.Item>
          <Menu.Item key="adddelay">แบบคำร้องขอลงทะเบียนเพิ่มล่าช้า</Menu.Item>
          <Menu.Item key="withdrawdelay">แบบคำร้องขอถอนรายวิชาล่าช้า</Menu.Item>
          <Menu.Item key="grouptransfer">แบบคำร้องขอย้ายกลุ่มเรียนน</Menu.Item>
          <Menu.Item key="latepayment">แบบคำร้องขอชำระเงินล่าช้า</Menu.Item>
          <Menu.Item key="coursecomparison">
            แบบคำร้องขอลงทะเบียนเรียนเทียบรายวิชา
          </Menu.Item>
          <Menu.Item key="changedata">
            แบบคำร้องขอเปลี่ยนข้อมูลประวัติ
          </Menu.Item>
          <Menu.Item key="resignstudent">
            แบบคำร้องขอลาออกจากการเป็นนักศึกษา
          </Menu.Item>
          <Menu.Item key="studydocument">
            แบบคำร้องขอเอกสารทางการศึกษา
          </Menu.Item>
          <Menu.Item key="behaviorcertify">
            แบบคำร้องขอใบรับรองความประพฤติ
          </Menu.Item>
          <Menu.Item key="graduation">แบบคำร้องขอสำเร็จการศึกษา</Menu.Item>
          <Menu.Item key="soccessdelay">
            แบบคำร้องขอสำเร็จการศึกษาล่าช้า
          </Menu.Item>
          <Menu.Item key="requestmoreseats">แบบคำร้องขอเพิ่มที่นั่ง</Menu.Item>
          <Menu.Item key="document-eighteen">
            แบบคำร้องขอเพิ่มที่นั่ง(สำรอง)
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.Item key="tagDocument">
          <TagsOutlined />
          ติดตามแบบคำร้อง
        </Menu.Item>
      </Menu>
    </Container>
  );
}
export default withRouter(LayoutHeaderStudent);
