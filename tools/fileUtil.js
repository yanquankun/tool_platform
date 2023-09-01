const fs = require('fs');
const path = require('path');
const util = require('./util');

// root path
exports.ROOT_PATH = ROOT_PATH = path.resolve(__dirname, '../'); // /tool_platform
// entry入口路径
exports.STATIC_PATH = STATIC_PATH = path.resolve(ROOT_PATH, 'static'); // /tool_platform/static

// 判断该路径下是否是一个合法的bundle entry
const isHasBundleEntryFile = function (entryPath) {
  const fileList = getPathDirectoryList(entryPath);
  return fileList.some((fileName) => /^(.+)-entry.tsx$/.test(fileName));
};

// 获取指定路径下所有的一级目录
const getPathDirectoryList = function (path) {
  !path && util.log('warn', `${path} is not path`);
  const stat = fs.statSync(path);
  if (stat.isDirectory()) {
    //判断是不是目录
    const paths = fs.readdirSync(path);
    return paths;
  }
  return [];
};

// 获取指定bundle或者所有bundle的entry入口相对路径
exports.getEntryAbsoulutePathList = function (staticPath) {
  const staticBundles = getPathDirectoryList(staticPath);
  return staticBundles.reduce((bundleEntryAbsolutePathList, bundleDirectoryName) => {
    const entryPath = path.join(staticPath, bundleDirectoryName);
    if (isHasBundleEntryFile(entryPath)) {
      bundleEntryAbsolutePathList.push(`./static/${bundleDirectoryName}-entry.tsx`);
    } else {
      util.log('error', `${bundleDirectoryName} is not a bundle entry,it must hava a [*]-entry.tsx file at least`);
    }
    return bundleEntryAbsolutePathList;
  }, []);
};

util.log('log', this.getEntryAbsoulutePathList(STATIC_PATH));
