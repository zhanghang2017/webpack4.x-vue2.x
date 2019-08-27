/*
 * @Descripttion:
 * @Author: hangzhang
 * @Date: 2019-07-22 20:48:40
 * @LastEditors: hangzhang
 * @LastEditTime: 2019-08-27 16:10:25
 */

process.env.NODE_ENV = 'production'
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const rm = require('rimraf')
const config = require('../config')
const merge = require('webpack-merge')
const BaseConf = require('./webpack.base.conf')
const utils = require('../utils')
const ora = require('ora')
const viewsConfig = require('../utils/views.conf')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const chalk = require('chalk')
const webpack = require('webpack')

function plugins () {
  const basePlugins = [
    new CleanWebpackPlugin(), // 清除每次打包文件---默认路径 output 配置的 path 路径
    new MiniCssExtractPlugin({
      filename: utils.assetPath('css/[name]-[hash:7].css')
    })

  ]
  if (config.build.compressionZip) {
    basePlugins.push(new CompressionWebpackPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(js|css)$'
      ),
      threshold: 0,
      minRatio: 0.8
    }))
  }
  return basePlugins
}

const webpackConfig = merge(BaseConf, viewsConfig.templates(), {
  mode: 'none',
  module: {
    rules: utils.styleLoaders({
      usePostcss: true,
      extract: true
    })
  },
  output: {
    filename: utils.assetPath('js/[name].[hash].bundle.js')
  },

  devtool: config.build.sourceMap ? config.build.devtool : false,

  plugins: plugins()

})

rm(config.build.assetsRoot, (err) => {
  if (err) throw err
  const spinner = ora('start building.........').start()
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()// 结束
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }
    console.log(chalk.cyan('  Build complete.\n'))
  })
})
