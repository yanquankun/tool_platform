const crypto = require('crypto');

const ENCRYPTION_KEY = crypto.randomBytes(32);
const FIXED_KEY_HEX = '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef';
const FIXED_ENCRYPTION_KEY = Buffer.from(FIXED_KEY_HEX, 'hex');

const IV_LENGTH = 16;
const IV = Buffer.alloc(16, 0);
/**
 * @description 对数据进行加密，如果时候用固定向量，解析时也必须传入false
 * @param {string | number | object} data 待加密的数据
 * @param {boolean} isRandom 是否使用随机IV
 * @returns {string} 加密后的数据
 */
function encrypt(data, isRandom = true) {
  let dataToEncrypt;
  if (typeof data === 'string' || typeof data === 'number') {
    dataToEncrypt = data.toString();
  } else if (typeof data === 'object') {
    dataToEncrypt = JSON.stringify(data);
  } else {
    throw new Error('Unsupported data type');
  }

  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(
    'aes-256-cbc',
    isRandom ? ENCRYPTION_KEY : FIXED_ENCRYPTION_KEY,
    isRandom ? iv : IV
  );
  let encrypted = cipher.update(dataToEncrypt, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return isRandom ? iv.toString('hex') + ':' + encrypted : encrypted;
}

/**
 * @description 对数据进行解密
 * @param {string} encryptedData 加密后的数据
 * @param {boolean} isRandom 是否使用随机IV
 * @returns {string | number | object} 解密后的数据
 */
function decrypt(encryptedData, isRandom = true) {
  const textParts = encryptedData.split(':');
  const iv = Buffer.from(textParts.shift(), 'hex');
  let encryptedText;
  if (isRandom) {
    encryptedText = Buffer.from(textParts.join(':'), 'hex');
  }
  const decipher = crypto.createDecipheriv(
    'aes-256-cbc',
    isRandom ? ENCRYPTION_KEY : FIXED_ENCRYPTION_KEY,
    isRandom ? iv : IV
  );
  let decrypted = decipher.update(isRandom ? encryptedText : encryptedData, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  try {
    return JSON.parse(decrypted);
  } catch (e) {
    return decrypted;
  }
}

module.exports = {
  encrypt,
  decrypt,
};
