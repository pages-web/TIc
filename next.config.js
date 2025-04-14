/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.cloudfront.net",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "**.erxes.io",
      },
      {
        protocol: "https",
        hostname: "erxes.io",
      },
    ],
  },
  env: {
    NEXT_PUBLIC_MAIN_API_DOMAIN:
      "https://tic4x4andoutdoor.app.erxes.io/gateway",
    NEXT_PUBLIC_WS_DOMAIN: "ws://localhost:3000/graphql/",
    NEXT_PUBLIC_POS_TOKEN: "BizEyYNCRR4LKKkDdVBJOtUf4kPb1zhW",
    NEXT_PUBLIC_CP_ID: "YFqSEew0DWenYF0gYxYMV",
    NEXT_PUBLIC_FACEBOOK_ID: "477832793072863",
    NEXT_PUBLIC_ERXES_APP_TOKEN:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHAiOnsibmFtZSI6IlRlc3QiLCJjcmVhdGVkQXQiOiIyMDI1LTA0LTAzVDExOjQ2OjA1Ljc5NVoiLCJ1c2VyR3JvdXBJZCI6IlpScDV4OGtYV3JIMjRvQ2VSTndnTSIsImV4cGlyZURhdGUiOiIyMDI1LTA1LTE0VDA3OjEyOjE2LjYxM1oiLCJub0V4cGlyZSI6dHJ1ZSwiYWxsb3dBbGxQZXJtaXNzaW9uIjp0cnVlLCJfaWQiOiJ2WmczeEYxZWdGVmc5aTZWVUF2dEsiLCJfX3YiOjB9LCJpYXQiOjE3NDQ2MTQ3NzF9.llHExhHLpksIFAqYJ8WqmIczEyEUyKQ4fF9T_yTgfmU",
  },
};

module.exports = nextConfig;
