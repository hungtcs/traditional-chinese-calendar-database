const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.ts'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    library: {
      root: 'TraditionalChineseCalendarDatabase',
      amd: 'hungtcs.traditional-chinese-calendar-database',
      commonjs: 'TraditionalChineseCalendarDatabase'
    },
    filename: '[name].js',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.lib.json'
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      verbose: true,
    }),
  ],
  resolve: {
    extensions: ['.ts']
  },
};
