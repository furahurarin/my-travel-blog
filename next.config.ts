import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.microcms-assets.io', // MicroCMSの画像ドメインを許可
      },
    ],
  },
};

export default nextConfig;