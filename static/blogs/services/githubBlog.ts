import { getGithubRepoContents, getGithubRepoSubContents } from '~shared/apis/git_cp';
import { IBlogItem, SECOND_TITLE_ID, BlogFrom, FileType } from '../interfaces/blog';

export const getGitHubList = (): Promise<IBlogItem[]> => {
  return new Promise(async (resolve) => {
    const githubBlogList: IBlogItem[] = [];
    const contentDirs = await getGithubRepoContents('learn', 'dir');
    Promise.all(
      contentDirs.map(async (content: IBlogItem) => await getGithubRepoSubContents('learn', content.name))
    ).then((githubList: IBlogItem[]) => {
      githubList.forEach((content: IBlogItem, idx: number) => {
        githubBlogList.push({
          id: SECOND_TITLE_ID,
          title: contentDirs[idx].name,
          from: BlogFrom.GITHUB,
          a: 1,
        });
        githubBlogList.push(
          ...content.map((subContent: IBlogItem) => {
            const suffix = (subContent?.name ?? '').match(new RegExp(`(${FileType.JS}|${FileType.MD})`, 'g')) || [
              FileType.UNKONE,
            ];
            const subContentName = (subContent.name as string).replace(
              new RegExp(`(.${FileType.JS}|.${FileType.MD})`, 'g'),
              ''
            );
            return {
              title: subContentName,
              id: subContent.sha,
              from: BlogFrom.GITHUB,
              url: subContent.html_url,
              fileSuffixName: suffix[0],
              author: 'Mint',
              bread: ['Github文章', contentDirs[idx].name, subContentName],
            };
          })
        );
      });
      resolve(githubBlogList as IBlogItem[]);
    });
  });
};
