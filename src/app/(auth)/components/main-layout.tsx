"use client";

import { LoadingOutlined } from "@ant-design/icons";
import { Layout } from "antd";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const { Content } = Layout;

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status, data } = useSession();

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

  if (data && !data.error) {
    redirect("/");
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content className="flex justify-center content-center">
        {children}
      </Content>
    </Layout>
  );
}
