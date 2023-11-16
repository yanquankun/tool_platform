const fs = require('fs');
const path = require('path');
const util = require('./util');

// root path
exports.ROOT_PATH = ROOT_PATH = path.resolve(__dirname, '../'); // /tool_platform
// entry入口路径
exports.STATIC_PATH = STATIC_PATH = path.resolve(ROOT_PATH, 'static'); // /tool_platform/static
// page入口路径
exports.PAGE_PATH = PAGE_PATH = path.resolve(ROOT_PATH, 'page'); // /tool_platform/page

// 获取该路径下所有的bundle entry相对路径
const getBundleEntryFiles = function (entryPath, bundleDirectoryName) {
  const fileList = getPathDirectoryList(entryPath);

  const bundleEntryFiles = fileList.reduce((bundleEntryFileList, fileName) => {
    const bundleEntryAbsolutePath = `./static/${bundleDirectoryName}/${fileName}`;
    // 获取每个bundle的entry前缀
    const bundleEntryFileName = fileName.replace(/(.*\/)*([^.]+)-entry.*/gi, '$2');
    /^(.+)-entry.tsx$/.test(fileName) && bundleEntryFileList.push({ [bundleEntryFileName]: bundleEntryAbsolutePath });
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
exports.getEntryRelativePathMap = function () {
  const staticMap = {};
  const staticBundles = getPathDirectoryList(STATIC_PATH);
  staticBundles.forEach((bundleDirectoryName) => {
    const entryPath = path.join(STATIC_PATH, bundleDirectoryName);

    // ignore unvalid bundle directory name by extraBaseNamePrefix array
    const extraBaseNamePrefix = ['@', '_', '*'];
    const basenamePrefix = path.basename(entryPath)[0];
    if (extraBaseNamePrefix.indexOf(basenamePrefix) != 0) {
      const bundleEntryFiles = getBundleEntryFiles(entryPath, bundleDirectoryName);
      bundleEntryFiles.length && (staticMap[bundleDirectoryName] = bundleEntryFiles);
    }
  });
  return staticMap;
};

/**
 * 获取页面集合
 * @param{
 *  pageDirectory:相对于root下的page里的文件夹名称
 * }
 */
exports.getPageRelativePathMap = function (pageDirectory) {
  const pageMap = {};
  const pagePath = path.join(PAGE_PATH, pageDirectory);
  const pages = getPathDirectoryList(pagePath);
  pages.forEach((page) => {
    const basename = path.basename(page, '.shtml');
    pageMap[basename] = `../../page/${pageDirectory}/${page}`;
  });
  return pageMap;
};
