const path = require('path');
const fileUtil = require('./fileUtil');
const ROOT_PATH = fileUtil.ROOT_PATH; // /tool_platform

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

module.exports = exports = {
  devServer,
};
