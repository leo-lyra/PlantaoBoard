import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { MockAuthProvider } from "@/contexts/MockAuthContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PlantãoMed - Gestão de Plantões Médicos",
  description: "Sistema completo para gestão financeira de plantões médicos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <MockAuthProvider>
          {children}
        </MockAuthProvider>
      </body>
    </html>
  );
}