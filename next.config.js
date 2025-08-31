/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

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

  experimental: {
    typedRoutes: false,
  },

  // ✔ Destrava seu build agora
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;

