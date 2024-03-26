const util = require('./tools/util');
const fileUtil = require('./tools/fileUtil');
const webpackTool = require('./tools/webpackTool');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const fs = require('fs');

const tsconfigFile = 'tsconfig.json';
const devServer = webpackTool.devServer;
const extensions = webpackTool.extensions;
const ROOT_PATH = fileUtil.ROOT_PATH; // /tool_platform
const entryPathMap = fileUtil.getEntryRelativePathMap();

module.exports = Object.keys(entryPathMap).map((entryDirectoryName, index) => {
  let entryMap = {};
  entryPathMap[entryDirectoryName].forEach((entryPathMap) => {
    const key = Object.getOwnPropertyNames(entryPathMap)[0];
    const value = entryPathMap[key];
    entryMap[`${key}-entry`] = value;
  });
  let pathMap = fileUtil.getPageRelativePathMap(entryDirectoryName);

  const webpackConfig = {
    mode: webpackTool.isProduction ? 'production' : 'development',
    devtool: webpackTool.isProduction ? 'eval-cheap-module-source-map' : 'eval-cheap-module-source-map',
    entry: entryMap,
    output: {
      path: path.join(ROOT_PATH, `dist/bundle/${entryDirectoryName}`),
      publicPath: `${webpackTool.isProduction ? '../../bundle/' : '/dist/bundle/'}${entryDirectoryName}/`,
      filename: `[name].${webpackTool.isProduction ? 'bundle.[contenthash]' : 'bundle'}.js`,
      chunkFilename: `[name].${webpackTool.isProduction ? 'bundle.[contenthash]' : 'bundle'}.js`,
    },

    resolve: {
      // 解析tsconfig中配置的paths
      plugins: [new TsconfigPathsPlugin({ configFile: tsconfigFile, extensions })],
      // 尝试按顺序解析这些后缀名。如果有多个文件有相同的名字，但后缀名不同，webpack 会解析列在数组首位的后缀的文件 并跳过其余的后缀
      extensions,
    },

    module: {
      rules: [
        // awesome-typescript-loader可以让Webpack使用TypeScript的标准配置文件tsconfig.json编译TypeScript代码
        { test: /\.tsx?$/, loader: 'ts-loader' },
        // source-map-loader使用TypeScript输出的sourcemap文件来告诉webpack何时生成自己的sourcemaps
        { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
        {
          test: /\.(png|jpg|gif|svg)$/,
          type: 'asset',
          parser: {
            dataUrlCondition: {
              // if size<6kb use inline mode else use resource mode
              maxSize: 6 * 1024,
            },
          },
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
      ],
    },

    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          test: /\.js(\?.*)?$/i,
          terserOptions: {
            toplevel: true, // 最高级别，删除无用代码
            ie8: true,
            safari10: true,
          },
        }),
      ],
      // 拆分entry文件中公共代码，减少entry.bundle体积
      // splitChunks: {
      //   cacheGroups: {
      //     default: false,
      //     vendorGroup: {
      //       test: /[\\/]node_modules[\\/]/,
      //       minSize: 50, // 生成 chunk 的最小体积
      //       priority: 1, // 一个模块可以属于多个缓存组。优化将优先考虑具有更高 priority（优先级）的缓存组
      //       name: entryDirectoryName,
      //       filename: entryDirectoryName + '-common-vendor' + (webpackTool.isProduction ? '.[contenthash:12]' : '') + '.js',
      //       // Initial Chunk：基于 Entry 配置项生成的 Chunk
      //       // Async Chunk：异步模块引用，如 import(xxx) 语句对应的异步 Chunk
      //       // Runtime Chunk：只包含运行时代码的 Chunk
      //       chunks: 'initial',
      //       reuseExistingChunk: true, // 如果当前 chunk 包含已从主 bundle 中拆分出的模块，则它将被重用，而不是生成新的模块
      //     },
      //   },
      // },
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          // 先提取antd和react
          antd: {
            test: /[\\/]node_modules[\\/]antd[\\/]/,
            name: 'antd',
            filename: `includes/[name].vendor${webpackTool.isProduction ? '.[contenthash:12]' : ''}.js`,
            chunks: 'all',
            priority: 20,
          },
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            name: 'react-common',
            filename: `includes/[name].vendor${webpackTool.isProduction ? '.[contenthash:12]' : ''}.js`,
            priority: 20,
          },
          antDesign: {
            test: /[\\/]node_modules[\\/](@ant-design)[\\/]/,
            name: 'ant-design',
            filename: `includes/[name].vendor${webpackTool.isProduction ? '.[contenthash:12]' : ''}.js`,
            priority: 20,
          },
          // 剩余依赖均打入该vendor
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'dep',
            filename: `includes/[name].vendor${webpackTool.isProduction ? '.[contenthash:12]' : ''}.js`,
            priority: 10,
            chunks: 'all',
            minChunks: 1,
          },
        },
      },
    },

    // 理想情况下，我们只需要在浏览器里引入React模块，但是大部分浏览器还没有支持模块。
    // 因此大部分代码库会把自己包裹在一个单独的全局变量内，比如：jQuery或_。 这叫做“命名空间”模式，webpack也允许我们继续使用通过这种方式写的代码库。
    // 通过我们的设置"react": "React"，webpack会神奇地将所有对"react"的导入转换成从React全局变量中加载
    // 使用 externals 配置需要在页面上通过 script 标签引入外部脚本，并且需要确保这些脚本已经在页面上被正确引入
    // externals: {
    //   react: 'React',
    //   'react-dom': 'ReactDOM',
    //   // externals中配置antd必须要先配置dayjs引入，否则报错
    //   dayjs: 'dayjs',
    //   antd: 'antd',
    // },
    // 采用这种方式，需要使用cdn获取资源

    plugins: [
      // 实际上只会动态更新dist内容  并不会删除dist目录
      new CleanWebpackPlugin(),
      new CopyPlugin({
        patterns: [
          // 复制includes目录
          {
            from: path.resolve(__dirname, 'page/includes/*.shtml'),
            // to：../../是因为我们的构建入口是基于bundle/${entryDirectoryName}/的
            to: '../../',
          },
        ],
      }),
      ...Object.keys(pathMap).map((pageBaseName) => {
        let content;
        try {
          content = fs.readFileSync(
            path.resolve(__dirname, `page/${entryDirectoryName}/${pageBaseName}.shtml`),
            'utf8'
          );
          content = content.replace(/<!-- Dependencies -->([\s\S]*)<!-- Dependencies -->/, '');
        } catch (err) {
          util.log('error', err);
        }
        return new HtmlWebpackPlugin({
          template: path.resolve(__dirname, '/template/temp.shtml'),
          templateContent: !!content ? content : false,
          filename: pathMap[pageBaseName],
          inject: 'body',
          scriptLoading: 'defer',
          chunks: [pageBaseName + '-entry'],
        });
      }),
      // 动态plugins
      ...webpackTool.dynamicPlugins,
      ...Object.keys(pathMap).map((pageBaseName) => {
        return new CopyPlugin({
          patterns: [
            {
              from: path.join(__dirname, '/static/@shared/theme/theme.css'),
              to: path.resolve(__dirname, `dist/theme/theme.css`),
            },
          ],
        });
      }),
    ],
  };

  // devSever只生成一次实例
  if (index == 0) {
    webpackConfig.devServer = devServer;
  }

  return webpackConfig;
});
