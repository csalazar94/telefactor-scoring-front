"use client";

import { LoadingOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { signOut, useSession } from "next-auth/react";
import { redirect, usePathname } from "next/navigation";
import type { MenuProps } from "antd";

const { Sider, Content } = Layout;

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

  const items: MenuProps["items"] = [
    {
      key: "/dashboard",
      label: "Dashboard",
    },
    {
      type: "divider",
    },
    {
      key: "/logout",
      label: "Cerrar sesión",
    },
  ];

  if (status === "loading") {
    return (
      <div className="flex justify-center content-center min-h-screen">
        <LoadingOutlined
          className="text-8xl h-full self-center"
          style={{ color: "blue" }}
        />
      </div>
    );
  }

  if (data?.error) {
    redirect("/login");
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout>
        <Sider collapsible collapsedWidth={50} breakpoint="md">
          <Menu
            theme="dark"
            mode="vertical"
            items={items}
            selectedKeys={[pathname]}
            onClick={({ key }) => {
              if (key === "/logout") signOut({ callbackUrl: "/login" });
            }}
          />
        </Sider>
        <Layout>
          <Content className="m-4">{children}</Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
