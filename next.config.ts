import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "medium.com",
      },
      {
        protocol: "https",
        hostname: "cdn-images-1.medium.com",
      },
    ],
  },
};

export default nextConfig;
