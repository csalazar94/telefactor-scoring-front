import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Categorías de puntaje - Telefactor",
  description: "Plataforma de scoring telefactor",
};

export default function ScoreCategorySettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
