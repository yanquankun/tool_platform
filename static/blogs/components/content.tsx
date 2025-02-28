import { FC, useState, useContext, useEffect } from 'react';
import { css } from '@emotion/css';
import { Divider, Button, Breadcrumb } from 'antd';
import dayjs from 'dayjs';
import { IBlogItem } from 'blogs/interfaces/blog';

const styled = {
  containerWrap: css`
    flex: 1;
    padding: 1rem 1.9rem 1.5rem 1.9rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    box-sizing: border-box;
    overflow-y: auto;
  `,
  breadcrumb: css`
    color: #4b5563;
    position: sticky;
    top: -1rem;
    background: #fff;
    line-height: 1.5rem;
    > ol {
      > li:last-child {
        color: #3b82f6;
      }
    }
  `,
  separatorIcon: css`
    margin-top: 0.4rem;
  `,
  title: css`
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 0.8rem;
    color: #2c3e50;
    position: sticky;
    top: 0.5rem;
    background: #fff;
    line-height: 33px;
  `,
  blogInfoWrap: css`
    font-size: 0.9rem;
    color: #666;
    margin-bottom: 0.8rem;
    position: sticky;
    top: 2.5rem;
    background: #fff;
    > span {
      margin-right: 0.9rem;
    }
  `,
  link: css`
    font-size: 0.9rem;
    padding-left: 0;
  `,
  subTitle: css`
    font-size: 1rem;
    font-weight: normal;
    color: #666;
    margin-bottom: 0.8rem;
    position: sticky;
    top: 4.5rem;
    background: #fff;
  `,
  Thumb: css`
    max-width: 100%;
  `,
  content: css`
    font-size: 1.125rem;
    line-height: 1.75;
    color: #333;
    margin-top: 2rem;
  `,
  divider: css`
    margin: 2.5rem 0 1.5rem 0;
  `,
  footer: css`
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    font-size: 0.85rem;
    color: #999;
    > span {
      margin-bottom: 0.5rem;
    }
  `,
  beianIcon: css`
    width: 1rem;
    height: 1rem;
    vertical-align: text-top;
  `,
  icpLink: css`
    font-size: 0.85rem;
    color: #999;
    padding: 0 0.3rem 0 0.2rem;
  `,
};

const Content: FC<{ receiveBlog: IBlogItem }> = ({ receiveBlog }) => {
  const [breads, setBreads] = useState<{ title: string }[]>();
  const [blog, setBlog] = useState<IBlogItem>();

  useEffect(() => {
    if (receiveBlog && receiveBlog.id) {
      setBlog(receiveBlog);
      console.log(receiveBlog);
      Array.isArray(receiveBlog.bread) && setBreads(receiveBlog.bread.map((item) => ({ title: item })));
    }
  }, [receiveBlog]);

  return (
    <div className={styled.containerWrap}>
      <Breadcrumb
        className={styled.breadcrumb}
        items={breads}
        separator={<img className={styled.separatorIcon} src="https://www.yanquankun.cn/cdn/blog/separator.png" />}
      />
      {/* 标题区域 */}
      {blog?.title && <h1 className={styled.title}>{blog.title}</h1>}
      {/* 著作区域 */}
      <div className={styled.blogInfoWrap}>
        {/* 作者 */}
        {blog?.author && <span>作者：{blog.author}</span>}
        {/* 发布时间 */}
        {blog?.timestamp && <span>发布时间：{blog.timestamp}</span>}
        {/* 原文链接 */}
        {blog?.url && (
          <span>
            原文链接：
            <Button className={styled.link} href={blog.url} target="_blank" type="link">
              点击跳转原文链接
            </Button>
          </span>
        )}
      </div>
      {/* 副标题 */}
      {blog?.subTitle && <div className={styled.subTitle}>{blog.subTitle}</div>}
      {/* 封面图 */}
      {blog?.thumb_url && <img src={blog.thumb_url} className={styled.Thumb} alt="cover" />}
      {/* 正文 */}
      <div className={styled.content}>
        在当今的 Web 开发领域，React
        已经成为最受欢迎的前端框架之一。随着应用程序规模的增长，性能优化变得越来越重要。本文将深入探讨 React
        性能优化的各个方面，从基础概念到高级技巧，帮助你构建更快、更流畅的 React 应用。 在当今的 Web 开发领域，React
        已经成为最受欢迎的前端框架之一。随着应用程序规模的增长，性能优化变得越来越重要。本文将深入探讨 React
        性能优化的各个方面，从基础概念到高级技巧，帮助你构建更快、更流畅的 React 应用。 在当今的 Web 开发领域，React
        已经成为最受欢迎的前端框架之一。随着应用程序规模的增长，性能优化变得越来越重要。本文将深入探讨 React
        性能优化的各个方面，从基础概念到高级技巧，帮助你构建更快、更流畅的 React 应用。 在当今的 Web 开发领域，React
        已经成为最受欢迎的前端框架之一。随着应用程序规模的增长，性能优化变得越来越重要。本文将深入探讨 React
        性能优化的各个方面，从基础概念到高级技巧，帮助你构建更快、更流畅的 React 应用。 在当今的 Web 开发领域，React
        已经成为最受欢迎的前端框架之一。随着应用程序规模的增长，性能优化变得越来越重要。本文将深入探讨 React
        性能优化的各个方面，从基础概念到高级技巧，帮助你构建更快、更流畅的 React 应用。 在当今的 Web 开发领域，React
        已经成为最受欢迎的前端框架之一。随着应用程序规模的增长，性能优化变得越来越重要。本文将深入探讨 React
        性能优化的各个方面，从基础概念到高级技巧，帮助你构建更快、更流畅的 React 应用。 在当今的 Web 开发领域，React
        已经成为最受欢迎的前端框架之一。随着应用程序规模的增长，性能优化变得越来越重要。本文将深入探讨 React
        性能优化的各个方面，从基础概念到高级技巧，帮助你构建更快、更流畅的 React 应用。 在当今的 Web 开发领域，React
        已经成为最受欢迎的前端框架之一。随着应用程序规模的增长，性能优化变得越来越重要。本文将深入探讨 React
        性能优化的各个方面，从基础概念到高级技巧，帮助你构建更快、更流畅的 React 应用。 在当今的 Web 开发领域，React
        已经成为最受欢迎的前端框架之一。随着应用程序规模的增长，性能优化变得越来越重要。本文将深入探讨 React
        性能优化的各个方面，从基础概念到高级技巧，帮助你构建更快、更流畅的 React 应用。
      </div>
      <Divider className={styled.divider} />
      <div className={styled.footer}>
        <span>© {dayjs().get('years')} TechInsights 技术博客. All rights reserved.</span>
        <span>
          <img className={styled.beianIcon} src="https://www.yanquankun.cn/cdn/beian-icon.png" />
          <Button
            className={styled.icpLink}
            href="https://beian.mps.gov.cn/#/query/webSearch?code=11011402054483"
            target="_blank"
            type="link"
          >
            京公网安备11011402054483号
          </Button>
          <span>京ICP备2023030808号-2</span>
        </span>
      </div>
    </div>
  );
};

export default Content;
