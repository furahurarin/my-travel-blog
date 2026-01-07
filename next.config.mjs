/** @type {import('next').NextConfig} */
const nextConfig = {
  // ▼ 追加: cheerioとundiciはバンドルせず、サーバー側のNode.jsで直接実行させる設定
  experimental: {
    serverComponentsExternalPackages: ['cheerio', 'undici'],
  },
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.microcms-assets.io',
      },
    ],
  },
};

export default nextConfig;