import type { NextConfig } from "next";

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: "standalone",
  experimental: {
    optimizeCss: true,
  },
  httpHeaders() {
    return [
      {
        source: "/_next/static/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store, max-age=0, must-revalidate" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;


module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://127.0.0.1:3002/:path*", // only during local dev
      },
    ];
  },
};


export default nextConfig;
