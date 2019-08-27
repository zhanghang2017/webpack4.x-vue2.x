/*
 * @Descripttion:
 * @Author: hangzhang
 * @Date: 2019-07-19 15:57:24
 * @LastEditors: hangzhang
 * @LastEditTime: 2019-08-27 14:31:47
 */

const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const config = require('../config')
const viewsConfig = require('../utils/views.conf')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const utils = require('../utils')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
module.exports = {

  context: path.resolve(__dirname, '../'),

  entry: viewsConfig.entries(),

  output: {

    filename: '[name].[hash].bundle.js',

    path: process.env.NODE_ENV === 'production'
      ? config.build.assetsRoot
      : config.dev.assetsRoot, // 生成路径

    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath // 输出解析文件的目录，url 相对于 HTML 页面
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.js$/,
        include: resolve('src'),
        loader: 'babel-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  plugins: [
    new VueLoaderPlugin(),
    new CopyWebpackPlugin([{
      from: './static',
      to: './static'
    }])
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        // 将第三方 库打包进 vendor
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          name: 'vendor-modules',
          minChunks: 1, // 根据引用次数分割
          maxInitialRequests: 5, // The default limit is too small to showcase the effect
          minSize: 0 // This is example is too small to create commons chunks
        },
        common: { // 处理引入2次模块引入的相同的模块--一般在多页面使用
          test: /src/,
          chunks: 'initial', // initial all async 入口，全部 动态加载
          minChunks: 2,
          name: 'common-modules',
          maxInitialRequests: 5, // The default limit is too small to showcase the effect
          minSize: 0 // This is example is too small to create commons chunks
        }
      }
    },
    // 提取webpack 运行文件
    runtimeChunk: {
      name: 'manifest'
    }
  }
}
