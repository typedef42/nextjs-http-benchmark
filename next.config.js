const env = require("./config/env");
const publicConfig = require("./config/public.runtime");
const serverConfig = require("./config/server.runtime");

const nextConfig = {
  webpack: (config, options) => {
    config.node = {
      fs: "empty"
    };

    return config;
  },
  compress: false,
  experimental: {
    publicDirectory: true
  }
};

module.exports = () => {
  /* see https://github.com/zeit/next.js#build-time-configuration  */
  nextConfig.env = env;
  /* see https://github.com/zeit/next.js#runtime-configuration  */
  nextConfig.publicRuntimeConfig = publicConfig;
  nextConfig.serverRuntimeConfig = serverConfig;

  const withCSS = require("@zeit/next-css");
  const withSass = require("@zeit/next-sass");
  const withProgressBar = require("next-progressbar");
  const withImages = require("next-images");
  const optimizedImages = require("next-optimized-images");
  return withImages(
    optimizedImages(withProgressBar(withCSS(withSass(nextConfig))))
  );
};
