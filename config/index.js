/*
 * @Descripttion:
 * @Author: hangzhang
 * @Date: 2019-07-29 19:45:04
 * @LastEditors: hangzhang
 * @LastEditTime: 2019-08-23 17:05:17
 */
const path = require('path')

exports.dev = {
  assetsSubDirectory: 'static',
  assetsPublicPath: '/',
  assetsRoot: path.resolve(__dirname, '../dist'), // 输出文件根目录
  /** 服务器配置**/
  server: {
    host: '127.0.0.1',
    port: '8080',
    proxyTable: {}
  },
  /** 是否生成sourcemap**/
  sourceMap: true,
  devtool: 'cheap-module-eval-source-map'
}

exports.build = {
  assetsSubDirectory: 'static', // 输出文件子目录--存放css js等资源
  assetsPublicPath: './', // 相对于HTML 页面访问路径
  assetsRoot: path.resolve(__dirname, '../dist'), // 输出文件根目录

  /** 是否生成sourcemap**/
  sourceMap: false,
  devtool: 'source-map',
  compressionZip: false // 是否压缩文件-只做压缩文件防止上传服务器文件过大
}
