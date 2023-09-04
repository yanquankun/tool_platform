const util = require('./tools/util');
const fileUtil = require('./tools/fileUtil');
const webpackTool = require('./tools/webpackTool');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const ROOT_PATH = fileUtil.ROOT_PATH; // /tool_platform
const isProduction = process.env.NODE_ENV === 'production';
const devServer = webpackTool.devServer;
const entryPathMap = fileUtil.getEntryAbsoulutePathMap();

module.exports = Object.keys(entryPathMap).map((entryDirectoryName, index) => {
  let entryMap = {};
  entryPathMap[entryDirectoryName].forEach((entryPathMap) => {
    const key = Object.getOwnPropertyNames(entryPathMap)[0];
    const value = entryPathMap[key];
    entryMap[`${key}-entry`] = value;
  });
  console.log(entryMap);
  // {
  //   home: './static/home/home-entry.tsx',
  //   home2: './static/home/home2-entry.tsx'
  // }
  // { test: './static/test/test-entry.tsx' }
  const webpackConfig = {
    mode: isProduction ? 'production' : 'development',
    entry: entryMap,
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
