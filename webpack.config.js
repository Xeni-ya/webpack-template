const HtmlWebpackPlugin = require('html-webpack-plugin');

let mode = 'development';
if (process.env.NODE_ENV === 'production') {
  mode = 'production';
}
console.log(mode + 'mode')

module.exports = {
  mode: mode,//настраиваем режим сборки, код выше
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    })],
  module: {
    rules: []
  },
}
