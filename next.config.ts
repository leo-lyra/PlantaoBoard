import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configurações de imagem otimizadas
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        port: "",
        pathname: "/storage/v1/object/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },

  // Configurações experimentais atualizadas para Next.js 15
  experimental: {
    typedRoutes: false,
  },

  // Configuração movida para fora do experimental
  serverExternalPackages: ["@supabase/supabase-js"],

  // Configurações de webpack para resolver problemas comuns
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
      };
    }

    return config;
  },

  // Headers de segurança
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization",
          },
        ],
      },
    ];
  },

  // ESLint e TypeScript configurações
  eslint: {
    ignoreDuringBuilds: false,
  },

  typescript: {
    ignoreBuildErrors: false,
  },

  // Configurações de ambiente
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || "https://stylhfkfuzjuydcdjatf.supabase.co",
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0eWxoZmtmdXpqdXlkY2RqYXRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYzMTQ3MjMsImV4cCI6MjA3MTg5MDcyM30.9DQY8Df2Z0VJQszYF8vhpujNaFpHX1vmw-0G-2hAzqw",
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY || "",
  },

  // Configurações específicas para desenvolvimento
  ...(process.env.NODE_ENV === "development" && {
    reactStrictMode: false,
  }),
};

export default nextConfig;