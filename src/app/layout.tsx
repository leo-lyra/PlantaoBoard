import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

// src/app/layout.tsx
export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "https://plantao-board.vercel.app"),
  title: "PlantãoBoard - Gestão de Plantões Médicos",
  description:
    "Controle seus plantões, seus recebimentos e planeje o futuro financeiro com dashboards profissionais e automação inteligente.",
  alternates: {
    canonical: "/landing",
  },
  openGraph: {
    title: "PlantãoBoard - Gestão de Plantões Médicos",
    description:
      "O sistema que médicos precisam para controlar plantões",
    url: "/landing",
    siteName: "PlantãoBoard",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PlantãoBoard" }],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PlantãoBoard - Gestão de Plantões Médicos",
    description:
      "Controle plantões, maximize dados.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
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
        {children}
      </body>
    </html>
  );
}