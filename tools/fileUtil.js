const fs = require('fs');
const path = require('path');
const util = require('./util');

// root path
exports.ROOT_PATH = ROOT_PATH = path.resolve(__dirname, '../'); // /tool_platform
// entry入口路径
exports.STATIC_PATH = STATIC_PATH = path.resolve(ROOT_PATH, 'static'); // /tool_platform/static

// 获取该路径下所有的bundle entry相对路径
const getBundleEntryFiles = function (entryPath, bundleDirectoryName) {
  const fileList = getPathDirectoryList(entryPath);

  const bundleEntryFiles = fileList.reduce((bundleEntryFileList, fileName) => {
    /^(.+)-entry.tsx$/.test(fileName) && bundleEntryFileList.push(`./static/${bundleDirectoryName}/${fileName}`);
    return bundleEntryFileList;
  }, []);

  // dir下无entry.tsx文件，则视为非法路径
  if (!bundleEntryFiles.length) {
    util.log('error', `${bundleDirectoryName} is not a bundle entry,it must hava one [*]-entry.tsx file at least`);
    return [];
  }
  return bundleEntryFiles;
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
exports.getEntryAbsoulutePathMap = function () {
  const staticMap = {};
  const staticBundles = getPathDirectoryList(STATIC_PATH);
  staticBundles.forEach((bundleDirectoryName) => {
    const entryPath = path.join(STATIC_PATH, bundleDirectoryName);
    const bundleEntryFiles = getBundleEntryFiles(entryPath, bundleDirectoryName);
    bundleEntryFiles.length && (staticMap[bundleDirectoryName] = bundleEntryFiles);
  });
  return staticMap;
};
