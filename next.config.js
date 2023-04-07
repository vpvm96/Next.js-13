/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["links.papareact.com", "platform-lookaside.fbsbx.com"],
  },
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
