const util = require('./tools/util');
const fileUtil = require('./tools/fileUtil');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const ROOT_PATH = fileUtil.ROOT_PATH; // /tool_platform

const isProduction = process.env.NODE_ENV === 'production';

const devServer = {
  // 该配置项允许配置从目录提供静态文件的选项
  static: {
    // 告诉服务器从哪里提供内容。只有在你希望提供静态文件时才需要这样做
    directory: path.join(ROOT_PATH, '/dist'),
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
// {
//   home: [ './static/home/home-entry.tsx', './static/home/home2-entry.tsx' ],
//   test: [ './static/test/test-entry.tsx' ]
// }
const entryPathMap = fileUtil.getEntryAbsoulutePathMap();
console.log(entryPathMap);
module.exports = Object.keys(entryPathMap).map((entryDirectoryName, index) => {
  let entryMap = {};
  entryPathMap[entryDirectoryName].forEach((entryPath) => {
    entryMap[entryDirectoryName] = entryPath;
  });
  console.log(entryMap);
  const webpackConfig = {
    mode: isProduction ? 'production' : 'development',
    entry: {
      home: './static/home/home-entry.tsx',
      home2: './static/home/home2-entry.tsx',
    },
    output: {
      path: path.join(ROOT_PATH, `dist/page/${entryDirectoryName}`),
      publicPath: `/dist/page/${entryDirectoryName}`,
      filename: `[name].${isProduction ? '[contenthash].bundle' : 'bundle'}.js`,
      // chunkFilename: chunkName + '.[contenthash:12].js',
    },

    devtool: isProduction === 'production' ? false : 'eval-cheap-module-source-map',

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

    plugins: [
      // 实际上只会动态更新dist内容  并不会删除dist目录
      new CleanWebpackPlugin(),
    ],

    devServer,
  };

  // devSever只生成一次实例
  if (index == 0) {
    webpackConfig.devServer = devServer;
  }

  return webpackConfig;
});

// module.exports = {
//   mode: isProduction ? 'production' : 'development',
//   entry: fileUtil.getEntryAbsoulutePathList(),
//   output: {
//     path: path.join(ROOT_PATH, 'dist/page'),
//     publicPath: '/dist/page/',
//     filename: `[name].${isProduction ? '[contenthash].bundle' : 'bundle'}.js`,
//     // chunkFilename: chunkName + '.[contenthash:12].js',
//   },

//   devtool: isProduction === 'production' ? false : 'eval-cheap-module-source-map',

//   resolve: {
//     extensions: ['.ts', '.tsx', '.js', '.json'],
//   },

//   module: {
//     rules: [
//       // awesome-typescript-loader可以让Webpack使用TypeScript的标准配置文件tsconfig.json编译TypeScript代码
//       { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },
//       // source-map-loader使用TypeScript输出的sourcemap文件来告诉webpack何时生成自己的sourcemaps
//       { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
//     ],
//   },

//   // 理想情况下，我们只需要在浏览器里引入React模块，但是大部分浏览器还没有支持模块。
//   // 因此大部分代码库会把自己包裹在一个单独的全局变量内，比如：jQuery或_。 这叫做“命名空间”模式，webpack也允许我们继续使用通过这种方式写的代码库。
//   // 通过我们的设置"react": "React"，webpack会神奇地将所有对"react"的导入转换成从React全局变量中加载
//   externals: {
//     react: 'React',
//     'react-dom': 'ReactDOM',
//   },

//   plugins: [
//     // 实际上只会动态更新dist内容  并不会删除dist目录
//     new CleanWebpackPlugin(),
//   ],

//   devServer,
// };
