import { FC, useEffect, useState } from 'react';
import { css } from '@emotion/css';
// TODO:暂未找到为什么路径为~shared/apis/git时，页面无报错，却无法加载react
import { getGithubRepoContents, getGithubRepoSubContents } from '~shared/apis/git_cp';
import { getWxArticles, getWxPublishArticles } from '~shared/apis/wx';
import { IBlogArticleItem, IBlogTitleItem, blogFrom } from '../../interfaces/blogSidebar';
import { localBlogList } from './localBlog';
import dayjs from 'dayjs';
import { isMobile } from '~shared/utils/util';

const commonStyle = {
  firstTitle: css`
    font-size: 1.1em;
    font-weight: 700;
    padding: 0.35rem 1.5rem 0.35rem 1.25rem;
    width: 100%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin: 0;
    border-left: 0.25rem solid transparent;
  `,
  li: css`
    font-size: 1em;
    font-weight: 400;
    display: inline-block;
    color: #2c3e50;
    border-left: 0.25rem solid transparent;
    padding: 0.35rem 1rem 0.35rem 2rem;
    line-height: 1.4;
    width: 100%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    &:hover {
      color: #3eaf7c;
      cursor: pointer;
    }
  `,
  selectLi: css`
    padding: 0.35rem 1rem 0.35rem 2rem;
    color: #3eaf7c;
    border-left: 0.25rem solid transparent;
    line-height: 1.4;
    font-size: 1em;
    font-weight: 500;
  `,
  secondLi: css`
    font-size: 0.9em;
    font-weight: 600;
    padding: 0.35rem 1.5rem 0.35rem 1.7rem;
    width: 100%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin: 0;
    border-left: 0.25rem solid transparent;
  `,
};

interface IProps {
  transportBlog: (blogId: string, content: string) => void;
}
export const Slider: FC<IProps> = function (props: IProps): JSX.Element {
  const _isMobile = isMobile();
  const [wxTitleList, setWxTitleList] = useState<IBlogTitleItem[]>([]);
  const [gitTitleList, setGitTitleList] = useState<IBlogTitleItem[]>([]);
  const [curBlogId, setCurBlogId] = useState<string>(localBlogList[0].blogId);

  useEffect(function () {
    (async function () {
      await getWxList();
      const _gitTitleList = await getGitHubList();
      setGitTitleList(_gitTitleList || []);

      props.transportBlog(localBlogList[0].blogId, JSON.stringify({ article: localBlogList[0] }));
    })();
  }, []);

  const getCurBlog = () => {
    const urlSearch = new window.URLSearchParams(window.location.search);
    const id = urlSearch.get('id');
    const type = urlSearch.get('type') as keyof typeof blogFrom;

    if (!id) return;

    if (type === 'wx' && wxTitleList.length) {
      blogClick({
        blogId: id,
        from: 'wx',
        title: '',
      });
    }
    if (type === 'github' && gitTitleList.length) {
      blogClick({
        blogId: id,
        from: 'github',
        title: '',
      });
    }
    if (type === 'local' && localBlogList.length) {
      blogClick({
        blogId: id,
        from: 'local',
        title: '',
      });
    }
  };

  useEffect(getCurBlog, [wxTitleList, gitTitleList]);

  const getWxList = async () => {
    // 获取媒体文章
    const { data = {} } = await getWxArticles();
    // 获取已发布文章
    const { data: publishData = {} } = await getWxPublishArticles();
    const { item = [] } = data;
    const { item: publishItem = [] } = publishData;
    const blogList = item.map(
      (blog: {
        update_time: number;
        media_id: string;
        content: {
          update_time: number;
          create_time: number;
          news_item: Array<IBlogArticleItem>;
        };
      }) => {
        const news_item = (blog?.content?.news_item ?? [])[0];
        return {
          ...news_item,
          from: 'wx',
          blogId: blog.media_id,
          title: news_item.title,
          create_time: dayjs((blog.content?.create_time ?? 0) * 1000).format('YYYY-MM-DD HH:mm:ss'),
          update_time: dayjs((blog?.update_time ?? 0) * 1000).format('YYYY-MM-DD HH:mm:ss'),
        };
      }
    );
    const publishTitleBlogList = publishItem.map(
      (blog: {
        update_time: number;
        article_id: string;
        content: {
          update_time: number;
          create_time: number;
          news_item: Array<IBlogArticleItem>;
        };
      }) => {
        const news_item = (blog?.content?.news_item ?? [])[0];
        return {
          ...news_item,
          from: 'wx',
          blogId: blog?.article_id ?? '',
          title: news_item.title,
          create_time: dayjs((blog.content?.create_time ?? 0) * 1000).format('YYYY-MM-DD HH:mm:ss'),
          update_time: dayjs((blog?.update_time ?? 0) * 1000).format('YYYY-MM-DD HH:mm:ss'),
        };
      }
    );
    setWxTitleList([...blogList, ...publishTitleBlogList]);
  };

  const getGitHubList = (): Promise<IBlogTitleItem[]> => {
    return new Promise(async (resolve) => {
      const githubBlogList: IBlogTitleItem[] = [];
      const contentDirs = await getGithubRepoContents('learn', 'dir');
      Promise.all(contentDirs.map(async (content: any) => await getGithubRepoSubContents('learn', content.name))).then(
        (res: any) => {
          res.forEach((content: any, idx: number) => {
            githubBlogList.push(
              {
                blogId: contentDirs[idx].sha,
                title: contentDirs[idx].name,
                from: 'secondTitle',
              },
              ...content.map((subContent: any) => {
                const suffix = (subContent?.name ?? '').match(/(js|md)/g) || ['unknow'];
                return {
                  title: (subContent.name as string).replace(/(.js|.md)/, ''),
                  blogId: subContent.sha,
                  from: 'github',
                  htmlUrl: subContent.html_url,
                  fileSuffixName: suffix[0],
                  ...subContent,
                };
              })
            );
          });
          resolve(githubBlogList as IBlogTitleItem[]);
        }
      );
    });
  };

  const getLiDom = (item: IBlogTitleItem) => {
    return (
      <li
        key={item.blogId}
        className={
          item.from == 'secondTitle'
            ? commonStyle.secondLi
            : curBlogId == item.blogId
              ? commonStyle.selectLi
              : commonStyle.li
        }
        onClick={() => blogClick(item)}
      >
        {item.title}
      </li>
    );
  };

  const blogClick = (blog: IBlogTitleItem) => {
    if (blog.from === 'static' || blog.from === 'secondTitle') return;
    setCurBlogId(blog.blogId);
    let content = '';
    if (blog.from === 'github') {
      content = JSON.stringify({
        article: gitTitleList.filter((item: IBlogTitleItem) => item.blogId == blog.blogId)[0],
      });
    } else if (blog.from === 'wx') {
      content = JSON.stringify({
        article: wxTitleList.filter((item: IBlogTitleItem) => item.blogId == blog.blogId)[0],
      });
    } else if (blog.from === 'local') {
      content = JSON.stringify({
        article: localBlogList.filter((item: IBlogTitleItem) => item.blogId == blog.blogId)[0],
      });
    }
    window.history.replaceState('', '', `?name=${blog?.title}&id=${blog.blogId}&type=${blog.from}`);
    props.transportBlog(blog.blogId, content);
  };

  return (
    <div
      id="slider"
      className={css`
        font-size: 16px;
        background-color: #fff;
        width: 20rem;
        position: fixed;
        z-index: 10;
        margin: 0;
        top: 3.6rem;
        left: 0;
        bottom: 0;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        border-right: 1px solid #eaecef;
        overflow-y: auto;
      `}
      style={{ position: _isMobile ? 'absolute' : 'fixed' }}
    >
      <ul
        className={css`
          padding: 1.5rem 0;
          margin: 0;
          list-style-type: none;
          line-height: 1.7;
        `}
      >
        {/* 序言 */}
        <li className={commonStyle.firstTitle}>写在前面</li>
        {localBlogList[0] && getLiDom(localBlogList[0])}
        {/* 微信公众号文章区域 */}
        <li className={commonStyle.firstTitle}>微信公众号文章</li>
        {/* 此处不转boolean会导致默认展示的是wxTitleList.length的值0 */}
        {Boolean(wxTitleList.length) &&
          wxTitleList.map((item: IBlogTitleItem) => {
            return item.blogId && getLiDom(item);
          })}
        {/* github文章区域 */}
        <li className={commonStyle.firstTitle}>GitHub文章</li>
        {Boolean(gitTitleList.length) &&
          gitTitleList.map((item: IBlogTitleItem) => {
            return item.blogId && getLiDom(item);
          })}
      </ul>
    </div>
  );
};
