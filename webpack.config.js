const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { default: postcss } = require('postcss/lib/postcss');

let mode = 'development';
if (process.env.NODE_ENV === 'production') {
  mode = 'production';
}
console.log(mode + 'mode')

module.exports = {
  mode: mode,//настраиваем режим сборки, код выше
  output: {
    assetModuleFilename: "assets/[hash][query]",
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    })],
  module: {
    rules: [
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
    ]
  },
}
