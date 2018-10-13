import { Configuration } from 'webpack';
import * as path from 'path';

const config: Configuration = {
  mode: 'development',
  entry: './test/index.test.ts',
  output: {
    path: path.join(__dirname, 'work'),
    filename: 'bundle.test.js',
  },
  module: {
    rules: [
      {
        test: /\.ts/,
        use: {
          loader: 'awesome-typescript-loader',
          options: {
            configFileName: './test/tsconfig.json',
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts'],
  },
};

export default config;
