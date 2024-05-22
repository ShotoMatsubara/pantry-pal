/** @type {import('next').NextConfig} */
const nextConfig = {
  output: `export`, // Next.jsをスタティックサイト（静的サイト）としてエクスポートする設定
  trailingSlash: true, // URLの末尾にスラッシュを付ける設定 ()
  images: {
    unoptimized: true,
  }, //Next.jsの画像最適化機能を無効。例えばNetlifyやVercel以外のホスティング環境でデプロイする場合など、外部の画像最適化サービスを使用する場合に使う。
};

export default nextConfig;
