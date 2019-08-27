/*
 * @Descripttion:
 * @Author: hangzhang
 * @Date: 2019-08-09 16:38:22
 * @LastEditors: hangzhang
 * @LastEditTime: 2019-08-27 16:02:41
 */
module.exports = {
  map: false,
  plugins: [
    require('postcss-import'),
    require('autoprefixer'),
    require('cssnano')({
      preset: 'default'
    })
  ]
}
