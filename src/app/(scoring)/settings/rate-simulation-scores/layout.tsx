import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Puntajes para simulaciones de tasas",
  description: "Plataforma de scoring telefactor",
};

export default function ScoreSettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
