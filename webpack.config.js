module.exports = {
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
};
