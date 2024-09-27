const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Add the CopyPlugin to copy Prisma client and query engine from the custom directory
      config.plugins.push(
        new CopyPlugin({
          patterns: [
            {
              from: path.resolve('prisma/generated/auth-client'),
              to: path.resolve('.next/server/prisma-client'), // Ensure this path matches your build requirements
            },
          ],
        })
      );
    }

    return config;
  },
};

module.exports = nextConfig;
