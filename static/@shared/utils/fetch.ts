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
  /** 错误提示语，如传入，则自动通过message展示 */
  errMsg?: string;
  /** 错误提示语时长 默认2s */
  errMsgDelay?: number;
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
  errMsg = '',
  errMsgDelay = 2000,
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
    if (errMsg) message.error(errMsg, errMsgDelay);
    throw error;
  }

  const promiseData = await response.json();
  destoryLoading();

  if (errMsg && response.status !== 200) {
    if (errMsg) message.error(errMsg, errMsgDelay);
  }

  const responseData = {
    code: response.status,
    data: response.status === 200 ? promiseData : {},
    msg: response.statusText || response.status === 200 ? '' : '网络错误，请稍后重试',
  } as IResponseData;

  return responseData;
};

export default request;
