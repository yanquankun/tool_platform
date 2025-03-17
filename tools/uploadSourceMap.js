const axios = require('axios');
const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const { decrypt } = require('./crypto');

const APM_SERVER_URL = 'https://www.yanquankun.cn/apm'; // APM Server 地址
const SERVICE_NAME = 'tool_platform_blog'; // APM 监控的前端应用名称
const SERVICE_VERSION = '1.0.0'; // 你的应用版本（必须和 APM Agent 里一致）
const SECRET_TOKEN = decrypt(
  'f1d1b72bb50c19fca432bd31186a43977b153e0b7b3beed27c22e60225335d1d9e300925ac8a9803ceb22d8832701db8ff7f68b28494ea5bea0f453287cf7245',
  false
); // 如果 APM Server 开启了身份验证
console.log(SECRET_TOKEN);

const SOURCE_MAP_DIR = path.join(__dirname, '../dist/bundle/blogs/');
const ROOT_PATH = path.join(__dirname, '../');

const sourceMapEntryFiles = fs
  .readdirSync(SOURCE_MAP_DIR)
  .map((file) => {
    if (file.endsWith('.map')) {
      return {
        // source map file root path
        sourceAbsRootPath: SOURCE_MAP_DIR + file,
        // source map file absoulte dist path
        chunkAbsDistPath: `/${path.relative(ROOT_PATH, SOURCE_MAP_DIR)}/${file}`.replace('.map', ''),
      };
    }
  })
  .filter(Boolean);
const sourceMapIncludeFiles = fs
  .readdirSync(SOURCE_MAP_DIR + '/includes')
  .map((file) => {
    if (file.endsWith('.map')) {
      return {
        sourceAbsRootPath: SOURCE_MAP_DIR + 'includes/' + file,
        chunkAbsDistPath: `/${path.relative(ROOT_PATH, SOURCE_MAP_DIR)}/${file}`.replace('.map', ''),
      };
    }
  })
  .filter(Boolean);

const sourceMapFiles = [...sourceMapEntryFiles, ...sourceMapIncludeFiles];
console.log(sourceMapFiles);
async function uploadSourceMap(fileInfo) {
  console.log(fileInfo);
  const filePath = fileInfo.sourceAbsRootPath;
  // frontend access path eg: /dist/bundle/blogs/xxxx.js
  const bundleFilePath = fileInfo.sourceAbsDistPath;
  return;
  const formData = new FormData();
  formData.append('service_name', SERVICE_NAME);
  formData.append('service_version', SERVICE_VERSION);
  formData.append('bundle_filepath', bundleFilePath);
  formData.append('sourcemap', fs.createReadStream(filePath));

  try {
    const response = await axios.post(`${APM_SERVER_URL}/assets/v1/sourcemaps`, formData, {
      headers: {
        ...formData.getHeaders(),
        Authorization: `Bearer ${SECRET_TOKEN}`, // 如果 APM Server 需要身份验证
      },
    });

    console.log(`✅ 上传成功: ${fileName} -> ${response.status}`);
  } catch (error) {
    console.error(`❌ 上传失败: ${fileName}`, error.response?.data || error.message);
  }
}

// 批量上传所有 Source Map 文件
async function uploadAllSourceMaps() {
  for (const fileInfo of sourceMapFiles) {
    await uploadSourceMap(fileInfo);
  }
}

// uploadAllSourceMaps();
