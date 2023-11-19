import { Metadata } from "next";
import MainLayout from "../components/main-layout";

export const metadata: Metadata = {
  title: "Login",
  description: "Iniciar sesión",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout>{children}</MainLayout>;
}
