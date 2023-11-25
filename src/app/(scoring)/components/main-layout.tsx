"use client";

import { LoadingOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { signOut, useSession } from "next-auth/react";
import { redirect, usePathname, useRouter } from "next/navigation";
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
  const router = useRouter();

  const items: MenuProps["items"] = [
    {
      key: "/dashboard",
      label: "Dashboard",
    },
    {
      key: "/settings",
      label: "Configuración",
      children: [
        {
          key: "/settings/score-categories",
          label: "Categorías de puntaje",
        },
        {
          key: "/settings/score-bds",
          label: "Puntaje bancarizados con deterioro",
        },
        {
          key: "/settings/score-bndd3ms",
          label:
            "Puntaje bancarizados sin deterioro vigente pero con deterioro últimos 3 meses",
        },
      ],
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

  const openKeys = "/" + pathname.split("/")[1];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout>
        <Sider collapsible collapsedWidth={50} breakpoint="md">
          <Menu
            theme="dark"
            mode="inline"
            items={items}
            selectedKeys={[pathname]}
            defaultOpenKeys={[openKeys]}
            onClick={({ key }) => {
              if (key === "/logout") signOut({ callbackUrl: "/login" });
              router.push(key);
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
