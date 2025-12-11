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
  target: 'web',
  output: {
    filename: '[name].[contenthash].js',
    assetModuleFilename: "assets/[hash][query]",
    clean: true,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.pug"
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
