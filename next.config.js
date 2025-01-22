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
  env: {
    NEXT_PUBLIC_MAIN_API_DOMAIN: "https://techstore.app.erxes.io/api",
    NEXT_PUBLIC_WS_DOMAIN: "ws://localhost:4000/graphql/",
    NEXT_PUBLIC_POS_TOKEN: "iQUf6AwefUeml8G3ihxzR6GsVGE6lRdj",
    NEXT_PUBLIC_CP_ID: "5b6f5eRJRirEfAKup",
    NEXT_PUBLIC_FACEBOOK_ID: "477832793072863",
    NEXT_PUBLIC_ERXES_APP_TOKEN: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHAiOnsibmFtZSI6IkVjb21tZXJjZSIsImNyZWF0ZWRBdCI6IjIwMjQtMTEtMjRUMDk6MjI6MjYuNjA3WiIsInVzZXJHcm91cElkIjoidlMzM2gxTVI5ZG9oY0dlXzh4bWhYIiwiZXhwaXJlRGF0ZSI6IjIwMjQtMTItMjhUMDc6MzE6MjIuMjQ4WiIsIm5vRXhwaXJlIjp0cnVlLCJhbGxvd0FsbFBlcm1pc3Npb24iOmZhbHNlLCJfaWQiOiJPYmJ1M3J2Z1dmWWFFeUJjeHlHRWgiLCJfX3YiOjB9LCJpYXQiOjE3MzI3NzkwOTl9.25z5hjDzR1EsgC51fSTFbMydAWgA8U2OTqrOp0BIZ-0"
  },
};

module.exports = nextConfig;
