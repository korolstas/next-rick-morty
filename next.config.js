/** @type {import('next').NextConfig} */
const withLess = require("next-with-less");

const nextConfig = withLess({
  reactStrictMode: false,
  lessLoaderOptions: {},
  images: {
    domains: ["rickandmortyapi.com"],
  },
});

module.exports = nextConfig;
