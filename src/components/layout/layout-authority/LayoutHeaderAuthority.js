import React, { useState } from 'react'
import Container from '../Container';
import { Menu } from 'antd';
import { HomeOutlined,FormOutlined,TagsOutlined } from '@ant-design/icons';

export default function LayoutHeaderAuthority() {
    const [current,setCurrent] = useState('student');

    const   handleClick = e => {
          console.log('click ', e);
          setCurrent(e.key)
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
               ตารางใบคำร้องนักศึกษา
              </span>
            }
          >
              <Menu.Item key="setting:1">Option 1</Menu.Item>
              <Menu.Item key="setting:2">Option 2</Menu.Item>
          </Menu.SubMenu>
          <Menu.Item key="mail">
          <TagsOutlined />
           ติดตามแบบคำร้อง
          </Menu.Item>
        </Menu>

        </Container>
      )
}
