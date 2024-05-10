const path = require('path');
const fileUtil = require('./fileUtil');
const ROOT_PATH = fileUtil.ROOT_PATH; // /tool_platform
const webpack = require('webpack');
const isProduction = process.env.NODE_ENV === 'production';

const devServer = {
  // 该配置项允许配置从目录提供静态文件的选项
  static: {
    // 告诉服务器从哪里提供内容。只有在你希望提供静态文件时才需要这样做
    directory: path.join(ROOT_PATH, 'dist'),
  },
  compress: true,
  allowedHosts: ['.yanquankun.com'],
  // 允许在浏览器中设置日志级别，例如在重载之前，在一个错误之前或者 热模块替换 启用时。
  client: {
    logging: 'info',
  },
  // 允许服务器可以被外部访问
  host: '0.0.0.0',
  port: 8888,
};

const dynamicPlugins = [
  //用 HashedModuleIdsPlugin 可以轻松地实现 chunkhash 的稳定化
  isProduction
    ? new webpack.ids.HashedModuleIdsPlugin({
        context: path.resolve(__dirname, '../'),
        hashFunction: 'sha256',
        hashDigest: 'hex',
      })
    : null,
  isProduction ? new webpack.NoEmitOnErrorsPlugin() : null, //保证出错时页面不阻塞，且会在编译结束后报错
].filter(Boolean);

const extensions = ['.ts', '.tsx', '.jsx', '.js', '.json'];

module.exports = exports = {
  devServer,
  dynamicPlugins,
  isProduction,
  extensions,
};
