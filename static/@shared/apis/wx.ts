import request, { IResponseData } from '@shared/utils/fetch';

/**
 * @description 获取公众号access_token
 * @author Mint
 * @see https://developers.weixin.qq.com/doc/offiaccount/Basic_Information/Get_access_token.html
 */
const getWxAccessToken = async (): Promise<IResponseData> => {
  return await request({
    url: '/wxapi/cgi-bin/stable_token',
    isNeedLoading: true,
    method: 'POST',
    data: {
      grant_type: 'client_credential',
      appid: 'wx7515961af01a9dac',
      secret: '9eed7aa25548d7386749a63fd053f6d5',
      force_refresh: false,
    },
  });
};

/**
 * @description 获取素材列表
 * @author Mint
 * @see https://developers.weixin.qq.com/doc/offiaccount/Asset_Management/Get_materials_list.html
 */
const getWxArticles = async (): Promise<IResponseData> => {
  const { data } = await getWxAccessToken();
  const access_token = data.access_token || '';
  return await request({
    url: `/wxapi/cgi-bin/material/batchget_material?access_token=${access_token}`,
    method: 'post',
    isNeedLoading: true,
    data: {
      type: 'news',
      offset: 0,
      count: 20,
    },
  });
};

export { getWxAccessToken, getWxArticles };
