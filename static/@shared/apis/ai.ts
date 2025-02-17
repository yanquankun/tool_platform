import request from '@shared/utils/fetch';

enum modelName {
  deepseek_7b = 'deepseek-7b',
  deepseek_32b = 'deepseek-32b',
}

interface IDeepReqOptions {
  message: string;
  stream?: boolean;
  onProgress: (data: string) => void;
  showOutputThinkProgress?: boolean;
  model?: modelName;
}
const deepChat = async ({
  message,
  stream = true,
  onProgress,
  showOutputThinkProgress = false,
  model = modelName.deepseek_32b,
}: IDeepReqOptions) => {
  if (stream) {
    const response = await fetch('https://deep.yanquankun.cn', {
      method: 'POST',
      body: JSON.stringify({
        message,
        stream,
        max_tokens: 1024,
        model,
      }),
    });

    if (!response.ok || !response.body) {
      console.log(`HTTP error! status: ${response.status}`);
      onProgress('\n Error: HTTP error!');
      return;
    }

    // 流数据是否已返回结束思考过程标记
    let endThink = showOutputThinkProgress;

    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }

      // 将读取到的字节数据解码为字符串
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop()!;

      for (const line of lines) {
        if (line.startsWith('data:')) {
          const data = line.slice(5).trim();
          if (data) {
            try {
              // 尝试将数据解析为 JSON
              if (data.indexOf('[DONE]') > -1) {
                onProgress('[DONE]');
              } else {
                const jsonData = JSON.parse(data);
                console.log('Received SSE data:', jsonData);
                // if (!endThink && data.indexOf('</think>') > -1) endThink = true;
                if (!jsonData.usage) {
                  onProgress(jsonData.response);
                }
              }
            } catch (error) {
              console.error('Error parsing SSE data:', error);
              onProgress('\n Error: ' + error);
            }
          }
        }
      }
    }

    // // 流数据是否已返回结束思考过程标记
    // let endThink = showOutputThinkProgress;

    // requestTask.onChunkReceived((response) => {
    //   try {
    //     // 将 Uint8Array 转换为字符串
    //     // const decoder = new TextDecoder();
    //     // const text = decoder.decode(response.data);
    //     const array = new Uint8Array(response.data);
    //     let text = '';
    //     for (let i = 0; i < array.length; i++) {
    //       text += String.fromCharCode(array[i]);
    //     }
    //     // 使用 decodeURIComponent 和 escape 来正确处理 UTF-8 编码
    //     text = decodeURIComponent(escape(text));

    //     // 处理接收到的数据块
    //     const lines = text.split('\n');

    //     lines.forEach((line) => {
    //       if (line.startsWith('data: ')) {
    //         const jsonStr = line.slice(6);
    //         if (jsonStr === '[DONE]') {
    //           // 数据传输完成
    //           onProgress('[DONE]');
    //           return;
    //         }
    //         try {
    //           const jsonData = JSON.parse(jsonStr);
    //           if (!endThink && jsonData.response.indexOf('</think>') > -1) endThink = true;
    //           else if (jsonData.response && endThink) {
    //             console.log('Received chunk:', jsonData.response);
    //             // 调用回调函数，传递增量内容
    //             onProgress(jsonData.response);
    //           }
    //         } catch (e) {
    //           onProgress('\n Error: ' + jsonStr);
    //           console.error('Parse chunk error:', e);
    //           requestTask.abort();
    //         }
    //       }
    //     });
    //   } catch (error) {
    //     onProgress('\n Error: ' + error);
    //     console.error('Process chunk error:', error);
    //     requestTask.abort();
    //   }
    // });
  } else {
    try {
      const { data: response } = await request({
        url: 'https://deep.yanquankun.cn',
        method: 'POST',
        data: {
          message,
          stream,
          max_tokens: 512,
          model,
        },
        headers: {
          mode: 'no-cors',
        },
      });

      const { code, data, msg } = response;
      if (!data || code !== 0) {
        typeof onProgress === 'function' && onProgress('\n Error: ' + msg || '请求失败');
        return;
      }
      // console.log("response.data.choices[0].message", data);
      typeof onProgress === 'function' && onProgress(data.response);
      typeof onProgress === 'function' && onProgress('[DONE]');
    } catch (error) {
      console.log('Ai Chat Error:', error);
      typeof onProgress === 'function' && onProgress('\n Error: ' + error);
    }
  }
};

export { deepChat };
