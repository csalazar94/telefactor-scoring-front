import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Puntaje bancarizados sin deuda, sin deterioro vigente y sin deterioro últimos 3 meses - Telefactor",
  description: "Plataforma de scoring telefactor",
};

export default function ScoreSettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
