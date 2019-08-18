/*
 * @Author: haopeiwei
 * @Date: 2019-08-18 14:39:26
 * @LastEditors: haopeiwei
 * @LastEditTime: 2019-08-18 16:32:13
 */
const path = require('path');

function resolve (dir) {
  return path.join(__dirname, dir);
}

console.log("+++++++++++++++++++", resolve('src/common'))
module.exports = {
  devServer: {
    port: 8091,
    open: true
  },
  lintOnSave: true,
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@common', resolve('src/common'))
    // 这里只写了两个个，你可以自己再加，按这种格式.set('', resolve(''))
  }
};
