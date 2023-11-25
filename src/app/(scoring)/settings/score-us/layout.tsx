import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Puntaje no bancarizados - Telefactor",
  description: "Plataforma de scoring telefactor",
};

export default function ScoreSettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
