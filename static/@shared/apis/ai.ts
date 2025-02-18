import request from '@shared/utils/fetch';

enum modelName {
  deepseek_7b = 'deepseek-7b',
  deepseek_32b = 'deepseek-32b',
}

interface IDeepReqOptions {
  message: string;
  onProgress: (data: string) => void;
  stream?: boolean;
  showOutputThinkProgress?: boolean;
  model?: modelName;
  closeReader?: (reader: ReadableStreamDefaultReader<Uint8Array> | null) => void;
}
const deepChat = async ({
  message,
  stream = true,
  onProgress,
  closeReader,
  showOutputThinkProgress = false,
  model = modelName.deepseek_32b,
}: IDeepReqOptions) => {
  if (stream) {
    const response = await fetch('https://deep.yanquankun.cn', {
      method: 'POST',
      body: JSON.stringify({
        message,
        stream,
        max_tokens: 256,
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

    if (closeReader && typeof closeReader === 'function') closeReader(reader);

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
                // 结束后，自动重置reader
                if (closeReader && typeof closeReader === 'function') closeReader(null);

                onProgress('[DONE]');
              } else {
                const jsonData = JSON.parse(data);
                // console.log('Received SSE data:', jsonData);
                // if (!endThink && data.indexOf('</think>') > -1) endThink = true;
                if (!jsonData.usage) {
                  onProgress(jsonData.response);
                }
              }
            } catch (error) {
              console.error('Error parsing SSE data:', error);
              if (closeReader && typeof closeReader === 'function') closeReader(null);
              onProgress('\n Error: ' + error);
            }
          }
        }
      }
    }
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
