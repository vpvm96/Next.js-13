/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "links.papareact.com",
      "platform-lookaside.fbsbx.com",
      "www.google.com",
    ],
  },
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
