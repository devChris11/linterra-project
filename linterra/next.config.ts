import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    // Custom inline loader to read raw source files bypassing all transformations
    config.module.rules.unshift({
      test: /\.(tsx|ts|jsx|js)$/,
      resourceQuery: /raw/,
      use: [
        {
          loader: path.resolve('./raw-file-loader.js'),
        },
      ],
    });

    return config;
  },
};

export default nextConfig;
