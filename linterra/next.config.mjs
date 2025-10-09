import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
  webpack: (config, { isServer }) => {
    // Custom inline loader to read raw source files bypassing all transformations
    config.module.rules.unshift({
      test: /\.(tsx|ts|jsx|js)$/,
      resourceQuery: /raw/,
      use: [
        {
          loader: path.resolve(__dirname, './raw-file-loader.js'),
        },
      ],
    });

    return config;
  },
};

export default nextConfig;

