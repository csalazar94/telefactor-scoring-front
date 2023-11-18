"use client";

import { Layout } from "antd";

const { Sider, Content } = Layout;

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout>
        <Sider collapsible></Sider>
        <Layout>
          <Content className="m-4">{children}</Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
