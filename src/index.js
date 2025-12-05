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