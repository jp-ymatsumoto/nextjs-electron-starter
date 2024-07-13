/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 静的エクスポート
  output: "export",
  images: {
    // 画質・サイズ・フォーマットを最適化しない
    unoptimized: true,
  },
};

export default nextConfig;
