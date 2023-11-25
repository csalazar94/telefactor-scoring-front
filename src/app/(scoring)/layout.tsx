import { Metadata } from "next";
import MainLayout from "./components/main-layout";

export const metadata: Metadata = {
  title: "Telefactor scoring",
  description: "Plataforma de scoring telefactor",
};

export default function ScoringLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout>{children}</MainLayout>;
}
