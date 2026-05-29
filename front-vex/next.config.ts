import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,

  allowedDevOrigins: [
    "http://110.117.16.87:3000",
    "http://localhost:3000",
    "http://0.0.0.0:3000",
  ],
};

export default nextConfig;