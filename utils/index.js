/*
 * @Description: In User Settings Edit
 * @Author: hangzhang
 * @Date: 2019-07-29 20:11:36
 * @LastEditTime: 2019-08-23 17:05:06
 * @LastEditors: hangzhang
 */
const config = require('../config')
const path = require('path')
var MiniCssExtractPlugin = require('mini-css-extract-plugin')

exports.assetPath = function (_path) { // 资源路径配置--用于输出到指定子目录
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}
// 用于生成css 解析器 所需 use 对象列表
exports.cssLoaders = function (_options) {
  var options = _options || {}

  var cssLoader = {
    loader: 'css-loader'
  }

  var postcssLoader = {
    loader: 'postcss-loader',
    options: {
      config: {
        path: path.resolve(__dirname, '../postcss.config.js')
      }
    }
  }
  // 用来生成css解析器数组 use 数组
  function generate (loader) {
    var use = options.usePostcss ? [cssLoader, postcssLoader] : [cssLoader] // 是否对css处理--生成环境需要

    if (loader) {
      use.push({
        loader: loader
      })
    }
    // 生产环境--提取css
    if (options.extract) {
      return [{
        loader: MiniCssExtractPlugin.loader,
        options: {
          publicPath: '../../'
        }
      }].concat(use)
    } else {
      return ['vue-style-loader'].concat(use) // 开发环境不提取，直接插入style标签
    }
  }
  return {
    css: generate(),
    less: generate('less-loader'),
    sass: generate('sass-loader'),
    scss: generate('scss-loader')
  }
}
// 用于生成css 对应test的解析器
exports.styleLoaders = function (options) {
  var cssLoaders = exports.cssLoaders(options)
  var cssRules = [] // css 模块编译规则数组
  for (var key in cssLoaders) {
    cssRules.push({
      test: new RegExp('\\.' + key + '$'),
      use: cssLoaders[key]
    })
  }
  return cssRules
}
