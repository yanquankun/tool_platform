import { FC, useState, useEffect, useMemo, useCallback } from 'react';
import { Row, Col } from 'antd';
import { BlogSidebar } from '../components/blogSidebar';
import { BlogArticle } from '../components/blogArticle';
import { WaterMark } from '@ant-design/pro-components';
import { getWxArticles, getWxPublishArticles } from '@shared/apis/wx';
import { IBlogListMap, IBlogArticleItem } from '../interfaces/blogSidebar';
import dayjs from 'dayjs';
import { getGithubRepoContents, getGithubRepoSubContents, getGithubFileContent } from '~shared/apis/git';
import { base64ToArrayBuffer } from '~shared/utils/util';

export const App: FC = function () {
  const [blogId, setBlogId] = useState<string>('');
  const [article, setArticle] = useState<IBlogArticleItem>();
  const [from, setFrom] = useState<'wx' | 'github'>('wx');
  const [blogMap, setBlogMap] = useState<IBlogListMap>({
    blogList: [
      {
        title: '微信公众号文章',
        type: 'group',
        blogId: 'group-1',
      },
      {
        blogId: 'first-blog',
        create_time: dayjs(1698298863077).format('YYYY-MM-DD HH:mm:ss'),
        update_time: dayjs(1698299863077).format('YYYY-MM-DD HH:mm:ss'),
        title: '第一篇blog，从此开始吧~',
        author: 'Mint',
        content:
          '从这里开始第一篇吧，以前习惯把个人心得、学习笔记记录到印象笔记中，没有想过自己整一个个人博客，这次趁着空闲，就自己实现一个吧，由于时间问题，这次用的是静态数据，未来将使用nodejs搭建后端服务。23年经历了很多事，尤其是最近，遇到了一件糟心事，心态也发生了一些变化，也成熟起来了，现在的想法除了希望家人健康平安，就是搞钱了，努力赚钱！后续会持续更新本网站，加入更多元素。',
      },
    ],
    total_count: 0,
  });

  const blogChange = async (blogId: string) => {
    setBlogId(blogId);
    setArticle({} as IBlogArticleItem);
    const article = blogMap.blogList.find((blog: IBlogArticleItem) => blog.blogId == blogId);
    setFrom(article?.from as 'wx' | 'github');
    if (article?.from === 'github' && article.path) {
      const fileRaw = await getGithubFileContent('learn', 'master', article.path);
      const content = new Blob([base64ToArrayBuffer(fileRaw.content)]).text();
      const code = await content;
      code &&
        typeof code === 'string' &&
        setArticle({
          blogId: article.blogId,
          title: article.title,
          content: code,
          htmlUrl: article.htmlUrl,
        });
      return;
    }
    setArticle(article);
  };

  const getGithubBlogList = (): Promise<Array<any>> => {
    return new Promise(async (resolve) => {
      const githubBlogList: { title: any; type: string; blogId: any }[] = [
        { title: 'github', type: 'group', blogId: 'github' },
      ];
      const contentDirs = await getGithubRepoContents('learn', 'dir');
      Promise.all(contentDirs.map(async (content: any) => await getGithubRepoSubContents('learn', content.name))).then(
        (res: any) => {
          res.forEach((content: any) => {
            githubBlogList.push(
              ...content.map((subContent: any) => {
                return {
                  title: subContent.name,
                  blogId: subContent.sha,
                  from: 'github',
                  htmlUrl: subContent.html_url,
                  ...subContent,
                };
              })
            );
          });
          resolve(githubBlogList);
        }
      );
    });
  };

  const getBlogMap = useCallback(async () => {
    // 获取媒体文章
    const { data = {} } = await getWxArticles();
    // 获取已发布文章
    const { data: publishData = {} } = await getWxPublishArticles();
    const { item = [], total_count } = data;
    const { item: publishItem = [], total_count: publish_total_count } = publishData;
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
          blogId: blog?.media_id ?? '',
          create_time: dayjs((blog.content?.create_time ?? 0) * 1000).format('YYYY-MM-DD HH:mm:ss'),
          update_time: dayjs((blog?.update_time ?? 0) * 1000).format('YYYY-MM-DD HH:mm:ss'),
        };
      }
    );
    const publishBlogList = publishItem.map(
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
          create_time: dayjs((blog.content?.create_time ?? 0) * 1000).format('YYYY-MM-DD HH:mm:ss'),
          update_time: dayjs((blog?.update_time ?? 0) * 1000).format('YYYY-MM-DD HH:mm:ss'),
        };
      }
    );
    const githubBlogList = await getGithubBlogList();
    setBlogMap({
      blogList: [...blogMap.blogList, ...publishBlogList, ...blogList, ...githubBlogList],
      total_count: total_count + (publish_total_count || 0) + githubBlogList.length + 2,
    });
  }, [blogMap]);

  useEffect(() => {
    getBlogMap();
  }, []);

  return (
    <WaterMark content={['闫全堃', '17600610907@163.com']}>
      <Row gutter={16}>
        <Col span={4}>
          <BlogSidebar blogMap={blogMap} blogChange={blogChange} />
        </Col>
        <Col span={20}>
          <BlogArticle from={from} article={article as IBlogArticleItem} blogId={blogId}></BlogArticle>
        </Col>
      </Row>
    </WaterMark>
  );
};
