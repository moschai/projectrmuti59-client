import React from "react";
import { Layout } from "antd";

import LayoutFooter from "../LayoutFooter";
import Container from "../Container";
import LayoutHeaderAdmin from "./LayoutHeaderAdmin";

const { Content } = Layout;
export default function BaseLayoutAdmin({ children, activeMenu }) {
  return (
    <>
      <Layout className="min-h-100">
        <LayoutHeaderAdmin activeMenu={activeMenu} />
        <Container>
          <Content style={{ minHeight: "88vh" }}>{children}</Content>
        </Container>
        <LayoutFooter />
      </Layout>
    </>
  );
}
