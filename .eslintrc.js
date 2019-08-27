/*
 * @Descripttion: 
 * @Author: hangzhang
 * @Date: 2019-08-23 16:02:56
 * @LastEditors: hangzhang
 * @LastEditTime: 2019-08-23 16:51:26
 */
module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',//解析器，这里我们使用babel-eslint
    sourceType: 'module'//类型为module，因为代码使用了使用了ECMAScript模块
  },
  env: {
    browser: true,//预定义的全局变量，这里是浏览器环境
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential', 
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
   'vue',
   'html' //插件，此插件用于识别文件中的js代码，没有MIME类型标识没有script标签也可以识别到，因此拿来识别.vue文件中的js代码
  ],
  // add your custom rules here
  'rules': {
     // allow async-await
     'generator-star-spacing': 'error',
     // allow debugger during development
     'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}