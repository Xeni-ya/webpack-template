require('./styles/index.scss');
const $ = require("jquery");
require('bootstrap');

const userStack = {
  language: 'js',
  framework: 'angular'
}

const user = {
  name: 'Ann',
  age: '20',
  ...userStack
}

$('.block').html('jQuery is working');

console.log(user)