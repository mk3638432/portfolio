/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    GMAIL_PASS: process.env.GMAIL_PASS,
  },
};

module.exports = nextConfig;
