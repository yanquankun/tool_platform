import React, { FC, useEffect, useState } from 'react';
import { render } from 'react-dom';
import { css } from '@emotion/css';
import dayjs from 'dayjs';
import { getGithubRepoContents, getGithubRepoSubContents, getGithubFileContent } from '~shared/apis/git';
import { base64ToArrayBuffer } from '~shared/utils/util';
import { getWxArticles, getWxPublishArticles } from '@shared/apis/wx';
import { IBlogListMap, IBlogArticleItem, IBlogTitleItem } from '../../interfaces/blogSidebar';
import { localBlogList } from './localBlog';

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
  `,
  selectLi: css`
    padding: 0.35rem 1rem 0.35rem 2rem;
    color: #3eaf7c;
    border-left: 0.25rem solid transparent;
    line-height: 1.4;
    font-size: 1em;
    font-weight: 500;
  `,
};

export const Slider: FC = function (): JSX.Element {
  const [wxTitleList, setWxTitleList] = useState<IBlogTitleItem[]>([]);
  const [curBlogId, setCurBlogId] = useState<string>();

  useEffect(() => {
    getWxList();
  }, []);

  const getWxList = async () => {
    // 获取媒体文章
    const { data = {} } = await getWxArticles();
    // 获取已发布文章
    const { data: publishData = {} } = await getWxPublishArticles();
    const { item = [] } = data;
    const { item: publishItem = [] } = publishData;
    const blogTitleList = item.map(
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
          from: 'wx',
          blogId: blog.media_id,
          title: news_item.title,
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
          from: 'wx',
          blogId: blog?.article_id ?? '',
          title: news_item.title,
        };
      }
    );
    console.log(blogTitleList, publishTitleBlogList);
    setWxTitleList([...blogTitleList, ...publishTitleBlogList]);
  };

  const getGitHubList = () => {};

  const getLiDom = (item: IBlogTitleItem) => {
    return (
      <li
        key={item.blogId}
        className={curBlogId == item.blogId ? commonStyle.selectLi : commonStyle.li}
        onClick={() => blogClick(item)}
      >
        {item.title}
      </li>
    );
  };

  const blogClick = (title: IBlogTitleItem) => setCurBlogId(title.blogId);

  return (
    <div
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
        <li className={commonStyle.li}>1</li>
        <li className={commonStyle.li}>2</li>
        <li className={commonStyle.li}>3</li>
      </ul>
    </div>
  );
};
