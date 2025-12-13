// подключили плагины
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { split } = require('postcss/lib/list');
const { default: postcss } = require('postcss/lib/postcss');
const { SplitChunksPlugin, Chunk } = require('webpack');

// меняем ражим с development на production
let mode = 'development';
if (process.env.NODE_ENV === 'production') {
  mode = 'production';
}
console.log(mode + 'mode')

module.exports = {
  mode: mode, // объект конфигураций
  target: 'web',
  entry: { // входные точки
    scripts: './src/index.js',
    user: './src/user.js',
  },
  output: { //выходные точки
    filename: '[name].[contenthash].js',
    assetModuleFilename: "assets/[hash][query]",
    clean: true,
  },
  devtool: 'source-map', // исходные карты
  optimization: { // дробление файлов
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [ // подключили плагины
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.pug"
    })],
  module: {
    rules: [ // указали все loader
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          (mode === 'development') ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      // Options
                    },
                  ],
                ],
              },
            },
          },
          "sass-loader"
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|webp|ico)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        exclude: /(node_modules|bower_components)/,
      },
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            targets: "defaults",
            presets: [
              ['@babel/preset-env']
            ]
          }
        }
      }
    ]
  },
}
