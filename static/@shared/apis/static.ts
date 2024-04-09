import request, { IResponseData } from '@shared/utils/fetch';

export const getStaticConfig = async (): Promise<IResponseData> => {
  return await request({
    url: 'https://www.yanquankun.com/config/tool_platform_config.json',
    method: 'GET',
  });
};
