const util = require('./tools/util');
const fileUtil = require('./tools/fileUtil');
const webpackTool = require('./tools/webpackTool');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

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
      path: path.join(ROOT_PATH, `dist/bundle/${entryDirectoryName}`),
      publicPath: `/dist/bundle/${entryDirectoryName}`,
      filename: `[name].${isProduction ? '[contenthash].bundle' : 'bundle'}.js`,
      // chunkFilename: chunkName + '.[contenthash:12].js',
    },

    devtool: isProduction === 'production' ? 'nosources-source-map ' : 'eval-cheap-module-source-map',

    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json'],
    },

    module: {
      rules: [
        // awesome-typescript-loader可以让Webpack使用TypeScript的标准配置文件tsconfig.json编译TypeScript代码
        { test: /\.tsx?$/, loader: 'ts-loader' },
        // source-map-loader使用TypeScript输出的sourcemap文件来告诉webpack何时生成自己的sourcemaps
        { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
      ],
    },

    // 拆分entry文件中公共代码，减少entry.bundle体积
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          test: /\.(tsx|jsx)$/,
        }),
      ],
      splitChunks: {
        cacheGroups: {
          default: false,
          vendorGroup: {
            test: /[\\/]node_modules[\\/]/,
            minSize: 50, // 生成 chunk 的最小体积
            priority: 1, // 一个模块可以属于多个缓存组。优化将优先考虑具有更高 priority（优先级）的缓存组
            name: entryDirectoryName,
            filename: entryDirectoryName + '-vendor' + (isProduction ? '.[contenthash:12]' : '') + '.js',
            // Initial Chunk：基于 Entry 配置项生成的 Chunk
            // Async Chunk：异步模块引用，如 import(xxx) 语句对应的异步 Chunk
            // Runtime Chunk：只包含运行时代码的 Chunk
            chunks: 'initial',
            reuseExistingChunk: true, // 如果当前 chunk 包含已从主 bundle 中拆分出的模块，则它将被重用，而不是生成新的模块
          },
        },
      },
    },

    // 理想情况下，我们只需要在浏览器里引入React模块，但是大部分浏览器还没有支持模块。
    // 因此大部分代码库会把自己包裹在一个单独的全局变量内，比如：jQuery或_。 这叫做“命名空间”模式，webpack也允许我们继续使用通过这种方式写的代码库。
    // 通过我们的设置"react": "React"，webpack会神奇地将所有对"react"的导入转换成从React全局变量中加载
    // 使用 externals 配置需要在页面上通过 script 标签引入外部脚本，并且需要确保这些脚本已经在页面上被正确引入
    externals: {
      react: 'React',
      'react-dom': 'ReactDOM',
      // externals中配置antd必须要先配置dayjs引入，否则报错
      dayjs: 'dayjs',
      antd: 'antd',
    },

    plugins: [
      // 实际上只会动态更新dist内容  并不会删除dist目录
      new CleanWebpackPlugin(),
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, `page/${entryDirectoryName}/*.shtml`),
            to: path.resolve(__dirname, 'dist/page'),
          },
        ],
      }),
    ],
  };

  // devSever只生成一次实例
  if (index == 0) {
    webpackConfig.devServer = devServer;
  }

  return webpackConfig;
});
