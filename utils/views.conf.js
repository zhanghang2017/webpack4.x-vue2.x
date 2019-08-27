/*
 * @Descripttion:
 * @Author: hangzhang
 * @Date: 2019-07-29 20:26:15
 * @LastEditors: hangzhang
 * @LastEditTime: 2019-08-23 17:09:11
 */
/**
 * @author: zh
 * @description: 页面入口，template，配置 提供多页面配置
 */
const glob = require('glob')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
/**
 * 规定 template 为index.html 入口js 为 index.js
 */
const entries = path.resolve(__dirname, '../src/**/*.js')
const templates = path.resolve(__dirname, '../src/**/*.html')
// 入口文件配置
exports.entries = function () {
  const entry = {}

  const files = glob.sync(entries, false)

  files.forEach(function (item) {
    const trans = item.split('/')
    const key = trans[trans.length - 2]
    entry[key] = item
  })

  return entry
}
// template 配置
exports.templates = function () {
  const _templates = []

  const files = glob.sync(templates, false)

  files.forEach(function (item) {
    const trans = item.split('/')
    const key = trans[trans.length - 2]

    const htmlWebpackPlugin = new HtmlWebpackPlugin({
      filename: key + '.html',
      template: item,
      chunks: ['manifest', 'vendor-modules', 'common-modules', key],
      chunksSortMode: 'dependency'
    })
    _templates.push(htmlWebpackPlugin)
  })
  return {
    plugins: _templates
  }
}
