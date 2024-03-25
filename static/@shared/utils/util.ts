import { message } from 'antd';

/**
 * @Date 2023-10-19 19:37:26
 * @Desc 复制文本
 * @Params
 *  @param { string } string className string 触发copy功能的dom类名 必须设置
 *  @param { string } string successMsg string = '复制成功'
 *  @param { string } string errorMsg string = '复制失败'
 */
export const copy = (className: string, successMsg: string = '复制成功', errorMsg: string = '复制失败') => {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  let copyInstance: any = null;
  copyInstance = new window.ClipboardJS(className, {
    text: function () {
      return '17600610907@163.com';
    },
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
