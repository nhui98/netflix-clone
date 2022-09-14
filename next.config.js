/** @type {import('next').NextConfig} */
//  eslint-disable-next-line
const withTM = require("next-transpile-modules")([
  "@stripe/firestore-stripe-payments",
]);

const nextConfig = withTM({
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["image.tmdb.org"],
  },
});

module.exports = nextConfig;
