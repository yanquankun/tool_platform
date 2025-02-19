import { message } from 'antd';

/**
 * @Date 2023-10-19 19:37:26
 * @Desc 复制文本
 * @Params
 *  @param { string } className 触发copy功能的dom类名 必须设置
 *  @param { string } text 复制的文本
 *  @param { string } successMsg = '复制成功'
 *  @param { string } errorMsg = '复制失败'
 */
export const copy = (
  className: string,
  text: string,
  successMsg: string = '复制成功',
  errorMsg: string = '复制失败'
) => {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  let copyInstance: any = null;
  copyInstance = new window.ClipboardJS(className, {
    text: () => text,
  })
    .on('success', function () {
      copyInstance && copyInstance.listener.destroy();
      copyInstance = null;
      message.success(successMsg);
    })
    .on('error', function () {
      copyInstance && copyInstance.listener.destroy();
      copyInstance = null;
      message.error(errorMsg);
    });
};

/**
 * 2024-03-25 15:51:11
 * @author Mint.Yan
 * @description base64转换ArrayBuffer数组
 * @param {String} base64
 * @returns ArrayBuffer
 */
export function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binary_string = window.atob(base64);
  const len = binary_string.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes.buffer;
}

/**
 * 2024-10-22 14:41:48
 * @author Mint.Yan
 * @description 判断是否为移动端设备
 * @param
 * @return boolean
 */
export const isMobile = () => {
  const userAgentInfo = navigator.userAgent;
  const Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'];
  let flag = false;
  for (let v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = true;
      break;
    }
  }
  return flag;
};

export function isSafari() {
  return /Safari/.test(navigator.userAgent) && !/CriOS/.test(navigator.userAgent);
}
