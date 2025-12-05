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

настроим переменную окружения
npm install --save-dev cross-env
https://www.npmjs.com/package/cross-env
