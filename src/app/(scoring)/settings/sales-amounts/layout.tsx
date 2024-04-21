import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ventas mensuales - Telefactor",
  description: "Plataforma de scoring telefactor",
};

export default function SalesAmountSettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
