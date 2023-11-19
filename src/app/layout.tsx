import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StyledComponentsRegistry from "../lib/AntdRegistry";
import NextAuthProvider from "./(auth)/providers/next-auth.provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Telefactor",
  description: "Informes de riesgo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <NextAuthProvider>
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        </NextAuthProvider>
      </body>
    </html>
  );
}
