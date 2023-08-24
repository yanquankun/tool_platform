const path = require('path');
const ROOT_PATH = path.resolve(__dirname, '../..');
const isProduction = process.env.NODE_ENV === 'production';
console.log(123, ROOT_PATH);

const devServer = {
  static: {
    directory: path.join(__dirname, 'dist'),
  },
  compress: true,
  port: 9000,
  allowedHosts: ['.yanquankun.com'],
  // 允许在浏览器中设置日志级别，例如在重载之前，在一个错误之前或者 热模块替换 启用时。
  client: {
    logging: 'info',
  },
  // 允许服务器可以被外部访问
  // host: '0.0.0.0',
  port: 80,
};

module.exports = {
  mode: isProduction ? 'production' : 'development',
  entry: './static/index.tsx',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist',
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: 'source-map',

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },

  module: {
    rules: [
      // awesome-typescript-loader可以让Webpack使用TypeScript的标准配置文件tsconfig.json编译TypeScript代码
      { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },
      // source-map-loader使用TypeScript输出的sourcemap文件来告诉webpack何时生成自己的sourcemaps
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
    ],
  },

  // 理想情况下，我们只需要在浏览器里引入React模块，但是大部分浏览器还没有支持模块。
  // 因此大部分代码库会把自己包裹在一个单独的全局变量内，比如：jQuery或_。 这叫做“命名空间”模式，webpack也允许我们继续使用通过这种方式写的代码库。
  // 通过我们的设置"react": "React"，webpack会神奇地将所有对"react"的导入转换成从React全局变量中加载
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },

  devServer,
};
