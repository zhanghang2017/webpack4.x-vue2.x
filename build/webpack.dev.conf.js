/*
 * @Descripttion:
 * @Author: hangzhang
 * @Date: 2019-07-22 20:48:22
 * @LastEditors: hangzhang
 * @LastEditTime: 2019-08-23 17:05:25
 */
process.env.NODE_ENV = 'development'
const config = require('../config')
const webpack = require('webpack')
const merge = require('webpack-merge')
const BaseConf = require('./webpack.base.conf')
const utils = require('../utils')
const viewsConfig = require('../utils/views.conf')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const devWebpackConfig = merge(BaseConf, viewsConfig.templates(), {
  mode: 'development',

  module: {
    rules: utils.styleLoaders({
      usePostcss: true,
      extract: false
    })
  },

  output: {
    filename: utils.assetPath('js/[name].[hash].bundle.js')
  },

  devtool: config.dev.devtool,

  devServer: {
    compress: true,
    hot: true,
    contentBase: false,
    host: config.dev.server.host,
    port: config.dev.server.port,
    proxy: config.dev.server.proxyTable,
    overlay: {
      warnings: true,
      errors: true
    },
    quiet: true // necessary for FriendlyErrorsPlugin
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin()// HMR shows correct file names in console on update.
  ]
})
module.exports = (async function () {
  portfinder.basePort = config.dev.server.port
  const port = await portfinder.getPortPromise().catch((e) => { throw Error(e) })
  devWebpackConfig.devServer.port = port
  devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
    compilationSuccessInfo: {
      messages: [`Your application is running here: http://${config.dev.server.host}:${port}`]
    },
    clearConsole: true
  }))
  return devWebpackConfig
}())
