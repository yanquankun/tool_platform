import request, { IResponseData } from '@shared/utils/fetch';

export const getStaticConfig = async (): Promise<IResponseData> => {
  return await request({
    url: 'https://www.yanquankun.com/config/tool_platform_config.json',
    method: 'GET',
  });
};

export async function getLastedNotice(): Promise<string> {
  let res;
  try {
    res = await getStaticConfig();
  } catch (error) {
    return '';
  }

  const now = +new Date();
  if (Array.isArray(res?.data?.notice)) {
    return (
      res.data.notice as {
        message: string;
        priority: number;
        deadline: number;
      }[]
    )
      .filter((notice: { deadline: number }) => (notice?.deadline ?? 0) > now)
      .sort((a, b) => b?.priority - a?.priority)[0]?.message;
  }

  return '';
}
