import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Puntaje bancarizados sin deterioro vigente pero con deterioro últimos 3 meses - Telefactor",
  description: "Plataforma de scoring telefactor",
};

export default function ScoreSettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
