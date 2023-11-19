"use client";

import { LoadingOutlined } from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";
import { signOut, useSession } from "next-auth/react";
import { redirect, usePathname } from "next/navigation";

const { Sider, Content, Header } = Layout;

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status, data } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/login");
    },
  });
  const pathname = usePathname();

  const items = [
    {
      key: "/dashboard",
      label: "Dashboard",
    },
  ];

  if (status === "loading") {
    return (
      <div className="flex justify-center content-center min-h-screen">
        <LoadingOutlined className="text-8xl" style={{ color: "blue" }} />
      </div>
    );
  }

  if (data?.error) {
    redirect("/login");
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout>
        <Sider collapsible>
          <Menu
            theme="dark"
            mode="vertical"
            items={items}
            selectedKeys={[pathname]}
          />
        </Sider>
        <Layout>
          <Header>
            <Button
              type="link"
              onClick={() => signOut({ callbackUrl: "/login" })}
            >
              Cerrar sesión
            </Button>
          </Header>
          <Content className="m-4">{children}</Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
