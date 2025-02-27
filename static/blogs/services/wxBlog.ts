import dayjs from 'dayjs';
import { IBlogItem } from '../interfaces/blog';
import { getWxArticles, getWxPublishArticles } from '~shared/apis/wx';

export const getWxBlogList = (): Promise<IBlogItem[]> => {
  return new Promise(async (resolve) => {
    // 获取媒体文章
    const { data = {} } = await getWxArticles();
    // 获取已发布文章
    const { data: publishData = {} } = await getWxPublishArticles();
    const { item = [] } = data;
    const { item: publishItem = [] } = publishData;
    const blogList = item.map(
      (blog: {
        media_id: string;
        content: {
          create_time: number;
          news_item: Array<IBlogItem>;
        };
      }) => {
        const news_item = (blog?.content?.news_item ?? [])[0];
        return {
          url: news_item?.url ?? '',
          quoteUrl: news_item?.content_source_url ?? '',
          from: 'wx',
          id: blog.media_id,
          title: news_item.title,
          content: news_item.content,
          timestamp: dayjs((blog.content?.create_time ?? 0) * 1000).format('YYYY-MM-DD HH:mm:ss'),
        };
      }
    );
    const publishTitleBlogList = publishItem.map(
      (blog: {
        article_id: string;
        content: {
          create_time: number;
          news_item: Array<IBlogItem>;
        };
      }) => {
        const news_item = (blog?.content?.news_item ?? [])[0];
        return {
          url: news_item?.url ?? '',
          from: 'wx',
          quoteUrl: news_item?.content_source_url ?? '',
          id: blog?.article_id ?? '',
          title: news_item.title,
          content: news_item.content,
          timestamp: dayjs((blog.content?.create_time ?? 0) * 1000).format('YYYY-MM-DD HH:mm:ss'),
        };
      }
    );

    resolve([...blogList, ...publishTitleBlogList]);
  });
};
