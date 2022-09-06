/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    domains: ["courses-top.ru"],
  },
  reactStrictMode: true,
  swcMinify: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};
