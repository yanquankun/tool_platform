import request from '@shared/utils/fetch';

const userName = 'yanquankun';
const githubHostUrl = 'https://api.github.com';
const tokenList = ['ghp', 'A7pDjNt1hZyhGBaP9jHIUWaoWW8vsX2y0tkk'];

/**
 * 2024-03-25 14:19:25
 * @author Mint.Yan
 * @description 获取用户信息
 * @returns Object
 */
export const getGithubUserInfo = async () => {
  const res = await request({
    url: `${githubHostUrl}/users/${userName}`,
    isNeedLoading: false,
    errMsg: '获取github用户信息失败',
    method: 'GET',
    headers: {
      authorization: `Bearer ${tokenList.join('_')}`,
    },
  });

  return res?.data ?? {};
};

/**
 * 2024-03-25 14:31:24
 * @author Mint.Yan
 * @description 获取所有git仓库
 * @returns Array<any>
 */
export const getGithubRepos = async () => {
  const res = await request({
    url: `${githubHostUrl}/users/${userName}/repos`,
    isNeedLoading: false,
    errMsg: '获取github仓库列表失败',
    method: 'GET',
    headers: {
      authorization: `Bearer ${tokenList.join('_')}`,
    },
  });

  return res?.data ?? [];
};

/**
 * 2024-03-25 14:38:33
 * @author Mint.Yan
 * @description 获取某个git仓库的具体信息
 * @param {String} repoName 仓库名
 * @returns
 */
export const getGithubRepoInfo = async (repoName: string) => {
  const res = await request({
    url: `${githubHostUrl}/repos/${userName}/${repoName}`,
    isNeedLoading: false,
    errMsg: '获取github仓库信息失败',
    method: 'GET',
    headers: {
      authorization: `Bearer ${tokenList.join('_')}`,
    },
  });

  return res?.data ?? [];
};

/**
 * 2024-03-25 14:44:07
 * @author Mint.Yan
 * @description 获取github仓库根目录文件
 * @param {String} repoName 仓库名
 * @param {dir|file} type 获取文件类型
 * @returns Array<any>
 */
export const getGithubRepoContents = async (repoName: string, type?: 'dir' | 'file') => {
  const res = await request({
    url: `${githubHostUrl}/repos/${userName}/${repoName}/contents`,
    isNeedLoading: true,
    errMsg: '获取github仓库目录失败',
    method: 'GET',
    headers: {
      authorization: `Bearer ${tokenList.join('_')}`,
    },
  });
  if (res.code !== 200) return [];
  if (type) {
    return (res?.data ?? []).filter((item: any) => item.type === type);
  }
  return res?.data ?? [];
};

/**
 * 2024-03-25 15:26:43
 * @author Mint.Yan
 * @description 获取某个仓库里子目录文件或文件夹数组
 * @param {String} repoName 仓库名
 * @param {String} targetName 文件名或文件夹名
 * @returns Array<any>
 */
export const getGithubRepoSubContents = async (repoName: string, targetName: string) => {
  const res = await request({
    url: `${githubHostUrl}/repos/${userName}/${repoName}/contents/${targetName}`,
    isNeedLoading: true,
    errMsg: '获取github仓库子目录失败',
    method: 'GET',
    headers: {
      authorization: `Bearer ${tokenList.join('_')}`,
    },
  });

  return res?.data ?? [];
};

/**
 * 2024-03-25 15:31:38
 * @author Mint.Yan
 * @description 获取某文件的原始内容
 * @param {String} repoName 仓库名
 * @param {String} feature 分支名
 * @param {String} link 文件路径
 * @returns String
 */
export const getGithubFileContent = async (repoName: string, feature: string, link: string) => {
  const res = await request({
    url: `${githubHostUrl}/repos/${userName}/${repoName}/contents/${link}`,
    errMsg: '获取github文件内容失败',
    method: 'GET',
    headers: {
      authorization: `Bearer ${tokenList.join('_')}`,
    },
  });

  return res?.data ?? '';
};
