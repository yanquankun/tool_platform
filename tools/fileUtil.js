const fs = require('fs');
const path = require('path');
const util = require('./util');

exports.ROOT_PATH = ROOT_PATH = path.resolve(__dirname, './'); // /tool_platform
exports.staticPath = staticPath = path.resolve(ROOT_PATH, '../static'); // /tool_platform/static

exports.getDirPath = function getDirPath(dir) {
  !dir && util.log('warn', `${dir} is not path`);
  const stat = fs.statSync(dir);
  if (stat.isDirectory()) {
    //判断是不是目录
    const dirs = fs.readdirSync(dir);
    util.log('info', dirs);
    // dirs.forEach((value) => {
    //   // console.log('路径',path.resolve(dir,value));
    //   getFiles(path.join(dir, value));
    // });
    return dirs;
  }
  return false;
};

util.log('log', this.getDirPath(staticPath));
