import { message } from 'antd';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IResponseData<T = any> {
  code: number;
  data: T;
  msg: string;
}

export interface IRequestParams extends Omit<RequestInit, 'params'> {
  url: string;
  method?: 'GET' | 'get' | 'POST' | 'post';
  data?: any;
  isNeedLoading?: boolean;
}

let loadingInstance: any = null,
  loadingkey = 'httpLoadingKey';

const destoryLoading = () => {
  if (typeof loadingInstance === 'function') {
    message.destroy(loadingkey);
    loadingInstance = null;
  }
};

const request = async ({
  method = 'GET',
  data = {},
  isNeedLoading = false,
  ...others
}: IRequestParams): Promise<IResponseData> => {
  destoryLoading();

  let { url, headers } = others;

  if ((method === 'GET' || method === 'get') && Object.keys(data).length) {
    let paramsArray: Array<string> = [];
    //拼接参数
    Object.keys(data).forEach((key) => paramsArray.push(key + '=' + data[key]));
    if (url.search(/\?/) === -1) {
      url += '?' + paramsArray.join('&');
    } else {
      url += '&' + paramsArray.join('&');
    }
  }

  if (isNeedLoading) {
    loadingInstance = message.loading({
      content: '请求中...',
      duration: 0,
      key: loadingkey,
    });
  }

  let response;
  try {
    const requestParams = {
      method,
      headers,
      ...others,
    };

    response = await fetch(
      url,
      method === 'GET' || method === 'get'
        ? requestParams
        : {
            ...requestParams,
            body: JSON.stringify(data),
          }
    );
  } catch (error) {
    destoryLoading();
    throw error;
  }

  const promiseData = await response.json();
  destoryLoading();

  const responseData = {
    code: response.status,
    data: response.status === 200 ? promiseData : {},
    msg: response.statusText || '网络错误，请稍后重试',
  } as IResponseData;

  return responseData;
};

export default request;
