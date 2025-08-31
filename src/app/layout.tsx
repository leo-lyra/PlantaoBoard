import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

// Fonte global
const inter = Inter({ subsets: ["latin"] });

// SEO básico
export const metadata: Metadata = {
  title: "PlantãoMed",
  description: "Gerencie seus plantões de forma prática e inteligente.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background text-foreground antialiased`}>
        {/* Se você tiver contextos globais (ex.: PlantaoContext), envolva aqui:
        <Providers>
          {children}
        </Providers>
        */}
        {children}
        <Toaster richColors closeButton />
      </body>
    </html>
  );
}
