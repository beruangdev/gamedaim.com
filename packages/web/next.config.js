/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "assets.gamedaim.com",
      "dev-assets.gamedaim.com",
      "assets.caragame.id",
      "gamedaim.com",
      "secure.gravatar.com",
      "caragame.id",
      "assets.tripay.co.id",
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ]
  },
}

const ContentSecurityPolicy = `
    default-src 'self' vercel.live;
    script-src 'self' 'unsafe-eval' 'unsafe-inline' cdn.vercel-insights.com vercel.live platform.twitter.com  youtube.com vitals.vercel-insights.com;
    style-src 'self' 'unsafe-inline';
    img-src * blob: data:;
    media-src 'none';
    connect-src *;
    font-src 'self';
    frame-src https://www.youtube.com https://platform.twitter.com https://www.youtube-nocookie.com;
    script-src-elem 'self' 'unsafe-inline' https://www.youtube.com http://platform.twitter.com/widgets.js https://platform.twitter.com/js/tweet.b81b6d7af2d75db873cff6099e4f433a.js;
`

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: ContentSecurityPolicy.replace(/\n/g, ""),
  },
  {
    key: "Referrer-Policy",
    value: "origin-when-cross-origin",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  { key: "Accept-Encoding", value: "gzip, compress, br" },
]

module.exports = nextConfig
