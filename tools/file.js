const fs = require('fs');
const path = require('path');

export const ROOT_PATH = path.resolve(__dirname, './'); // /tool_platform
export const isProduction = process.env.NODE_ENV === 'production';
export const staticPath = path.join(ROOT_PATH, 'static');

export const getFiles = function (dir) {
  !dir && console.error('===');
  const stat = fs.statSync(dir);
  if (stat.isDirectory()) {
    //判断是不是目录
    const dirs = fs.readdirSync(dir);
    dirs.forEach((value) => {
      // console.log('路径',path.resolve(dir,value));
      getFiles(path.join(dir, value));
    });
  } else if (stat.isFile()) {
    //判断是不是文件
    console.log('文件名称', dir);
  }
};
getFiles('./build');
