/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // 旧サイト(any-ware.jp)の全URLはサンドボックス環境のネットワーク制限により
  // 直接確認できなかったため、推測でのリダイレクト設定は行っていない。
  // 実URL確定後は CONTENT_MAPPING.md の手順に従い、ここに redirects() を追加すること。
  async redirects() {
    return [];
  },
};

export default nextConfig;
