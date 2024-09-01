/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.cloudfront.net',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: '**.erxes.io',
      },
      {
        protocol: 'https',
        hostname: 'erxes.io',
      },
    ],
  },
};

module.exports = nextConfig;
