"use client";

import { Layout, Menu } from "antd";

const { Sider, Content } = Layout;

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const items = [
    {
      key: 1,
      label: 'Dashboard',
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout>
        <Sider collapsible>
          <Menu
            theme="dark"
            mode="vertical"
            items={items}
          />
        </Sider>
        <Layout>
          <Content className="m-4">{children}</Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
