/**
 * @description 生成公钥和私钥
 * @returns 公钥和私钥
 */
async function generateKey(): Promise<CryptoKeyPair> {
  const keyPair = await window.crypto.subtle.generateKey(
    {
      name: 'RSA-OAEP',
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: 'SHA-256',
    },
    true,
    ['encrypt', 'decrypt']
  );
  return keyPair;
}

/**
 * @description 加密数据
 * @param key 公钥
 * @param data 待加密数据
 * @returns 加密后的数据
 */
async function encryptData<T extends ArrayBuffer>(key: CryptoKey, data: T): Promise<ArrayBuffer> {
  const encrypted = await window.crypto.subtle.encrypt(
    {
      name: 'RSA-OAEP',
    },
    key,
    data
  );
  return encrypted;
}

/**
 * @description 解密数据
 * @param key 私钥
 * @param encryptedData 待解密数据
 * @returns 解密后的数据
 */
async function decryptData(key: CryptoKey, encryptedData: ArrayBuffer): Promise<ArrayBuffer> {
  const decrypted = await window.crypto.subtle.decrypt(
    {
      name: 'RSA-OAEP',
    },
    key,
    encryptedData
  );
  return decrypted;
}

/**
 * @description 将数据转换为可加密的数据
 * @param data 待加密的数据
 * @returns 可加密的数据
 */
function convertToEncryptableData(data: unknown): ArrayBuffer {
  let dataStr: string = '';

  if (typeof data === 'object' && data !== null) {
    dataStr = JSON.stringify(data);
  } else if (Array.isArray(data)) {
    dataStr = JSON.stringify(data);
  } else if (typeof data === 'number') {
    dataStr = data.toString();
  } else {
    dataStr = String(data);
  }

  const encoder = new TextEncoder();
  const uint8Array = encoder.encode(dataStr);
  return uint8Array.buffer;
}

/**
 * @description 将数据转换为字符串
 * @param data 待转换的数据
 * @returns 转换后的数据
 */
function convertDataToStr(data: ArrayBuffer): string {
  const decoder = new TextDecoder();
  const uint8Array = new Uint8Array(data);
  const str = decoder.decode(uint8Array);
  return str;
}

export { generateKey, encryptData, decryptData, convertToEncryptableData, convertDataToStr };
