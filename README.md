# webpack-template

Настройка Webpack 5

1. Иноциализация проекта

npm init --yes

npm install webpack webpack-cli --save-dev
(npm install webpack --save-dev // устанавливает webpack, a npm i webpack-cli --save-dev //то, что поможет нам настраивать вебпакт прямо в тапочках из терминала)

добавляем файл .gitignore в него записываем сразу две строки
/node_modules
/dist

структура проекта - создаем папку src/index.js ---> пишем произвольный код:
const userStack = {
language: 'js',
framework: 'angular'
}

const user = {
name: 'Ann',
age: '20',
...userStack
}

console.log(user)

npm run build //появляется папка dist

2. Настраиваем сборку в package.json

"scripts": {
"test": "echo \"Error: no test specified\" && exit 1",

"start": "webpack serve", //добавить слово serve
"dev": "webpack", // компелирует не оптимизированные файлы
"build": "webpack" // оптимизированные файли в паппке dist
},

вебпак собирает модули, а для этого нам нужно установить локальный сервер, это тоже пакет (он же утилита)

npm i webpack-dev-server --save-dev
https://www.npmjs.com/package/webpack-dev-server
---> прописываем флаг -- open ("start": "webpack serve --open",)
---> npm run start

3. Настройка переменной окружения

в package.json пишем "start": "set NODE_ENV=development&&webpack serve --open",

---> настроим переменную окружения:
npm install --save-dev cross-env
https://www.npmjs.com/package/cross-env

---> далее "dev": "set NODE_ENV=development&&webpack",
"build": "set NODE_ENV=production&&webpack",

4. Создание файла конфигурации webpack.config.js

Настраиваем webpack:
создаем webpack.config.js в корне проекта
https://webpack.js.org/configuration/

5. Задание режима разработки через свойство mode

---> в webpack.config.js пишем:
let mode = 'development';
if (process.env.NODE_ENV === 'production') {
mode = 'production';
}
console.log(mode + 'mode')

module.exports = {
mode: mode,//настраиваем режим сборки, код выше
}
---> npm run dev
---> npm run build

---> добавляем опции: plugins module rules

module.exports = {
mode: mode,//настраиваем режим сборки, код выше
plugins: [],
module: {
rules: []
},
}

6. Настройка компиляции html. HtmlWebpackPlugin

---> src/index.html

<body>
  <div class="container">
    <h1>Hello Webpack</h1>
  </div>
</body>

---> устанавливаем HTML вебпак плагин:
npm i --save-dev html-webpack-plugin
https://www.npmjs.com/package/html-webpack-plugin

---> в webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin');
и пишем:
plugins: [
new HtmlWebpackPlugin({
template: "./src/index.html"
})],
---> npm run dev

7. Настройка компиляции стилей. Sass-loader, post-css-loader, css-loader, style-loader, MiniCssExtractPlugin.

---> src/style.css

---> создаем стили:
https://webpack.js.org/loaders/style-loader/
https://webpack.js.org/loaders/css-loader/
https://webpack.js.org/loaders/postcss-loader/
https://www.npmjs.com/package/postcss-preset-env
https://webpack.js.org/loaders/sass-loader/
https://webpack.js.org/plugins/mini-css-extract-plugin/
и подключаем плагины:
npm i style-loader css-loader postcss-loader postcss postcss-preset-env sass-loader sass mini-css-extract-plugin --save-dev

---> в webpack.config.js:
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

plugins: [new MiniCssExtractPlugin()],

    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
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
    ]

---> импортируем стили в index.js
---> import './styles.css';

// Вместо:
// import './styles.css';

// Используйте:
require('./styles.css');

---> делаем сборку npm run dev

---> добавим условие: use: [
(mode === 'development') ? "style-loader" : MiniCssExtractPlugin.loader, ...]

---> npm start

8.  SASS, SCSS.Настройка компиляции файлов препроцессоров

---> оздадим src/styles/index.scss и src/styles/\_global.scss

--> в \_global.scss:

$primaryColor: chocolate;
$seconddaryColor: dimgray;

h1 {
color: $primaryColor;
}

.contsiner {
&\_\_subtitle {
color: $seconddaryColor;
}
}

---> в index.scss:
@use 'global';

---> в index.js импортируем главный файл прероцессеров:
require('./styles/index.scss');

---> style.css - удаляем

---> npm start

9. Настройка кеширования css файлов

---> в webpack.config.js:

plugins: [
//require('postcss-preset-env')(),
new MiniCssExtractPlugin({
filename: '[name].[contenthash].css'
}),
...
]

---> сбираем проект в режиме продакшн (npm run build)

10. Настройка компиляции изображений

---> в webpack.config.js:
rules: [
{
test: /\.(sa|sc|c)ss$/,
      use: [...]
    }
    {
      test: /\.(png|jpg|jpeg|gif|svg|webp|ico)$/i,
type: 'asset/resource',
},
]
---> npm run start (запускаем сервер) - npm run build (запускаем в продакшн режиме)

---> в webpack.config.js:
module.exports = {
mode: mode,
output: {
assetModuleFilename: "assets/[hash][query]",
},
...
}

---> npm run build

---> добавляем еще картинку
---> npm install --save-dev html-loader

---> добавляем в правила:
module.exports = {
module: {
rules: [
{
test: /\.html$/i,
loader: "html-loader",
},
],
},
};

---> в добавляем изображение

---> npm run start
---> npm run build
