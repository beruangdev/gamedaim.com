/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    serverActions: true,
  },
  reactStrictMode: true,
  images: {
    domains: [
      "assets.gamedaim.com",
      "dev-assets.gamedaim.com",
      "assets.caragame.id",
      "gamedaim.com",
      "caragame.id",
    ],
  },
  transpilePackages: ["ui"],
}

module.exports = nextConfig
