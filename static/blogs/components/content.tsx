import { FC, useState, useEffect } from 'react';
import { cx, css } from '@emotion/css';
import { Divider, Button, Breadcrumb } from 'antd';
import dayjs from 'dayjs';
import { IBlogItem, BlogFrom, FileType } from 'blogs/interfaces/blog';
import { getGithubFileContent } from '~shared/apis/git_cp';
import { base64ToArrayBuffer, isMobile } from '~shared/utils/util';
import { marked } from 'marked';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-markdown';
import 'prismjs/plugins/line-numbers/prism-line-numbers';

const styled = {
  containerWrap: css`
    flex: 1;
    padding: 1rem 4.9rem 1.5rem 1.9rem;
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
    z-index: 999;
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
    height: 33px;
    z-index: 999;
  `,
  blogInfoWrap: css`
    font-size: 0.9rem;
    color: #666;
    margin-bottom: 0.8rem;
    position: sticky;
    top: 2.5rem;
    background: #fff;
    z-index: 999;
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
    whitespace: pre-wrap;
    wordwrap: break-word;
    overflowwrap: break-word;
    img {
      max-width: 100%;
    }
    pre > code {
      white-space: pre-wrap;
      word-wrap: break-word;
    }
  `,
  code: css`
    white-space: pre-wrap !important;
  `,
  contentLocal: css`
    text-indent: 2rem;
    margin-top: 0;
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
  footerM: css`
    margin-bottom: 6.5rem;
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
  const [content, setContent] = useState<string | string[]>();
  const _isMobile = isMobile();

  useEffect(() => {
    // 必须保留，否则line-number不展示
    Prism.highlightAll();
  }, [content]);

  useEffect(() => {
    if (receiveBlog && receiveBlog.id) {
      setBlog(() => {
        setContent('加载中，请稍等...');

        if (receiveBlog.from === BlogFrom.WX) {
          if (!receiveBlog.content) {
            setContent('文章获取错误，请重试~');
            return;
          }

          const hmtlStr = marked(receiveBlog.content as string);
          setContent(hmtlStr as string);
        }
        if (receiveBlog.from === BlogFrom.GITHUB) {
          getGitBlogContent();
        }

        return receiveBlog;
      });

      Array.isArray(receiveBlog.bread) && setBreads(receiveBlog.bread.map((item) => ({ title: item })));
    }
  }, [receiveBlog]);

  const getGitBlogContent = async () => {
    // get blog parent file path name
    const gitBlogSubPath = receiveBlog?.bread?.[1];

    const fileRaw = await getGithubFileContent(
      'learn',
      'master',
      `${gitBlogSubPath}/${receiveBlog.title}.${receiveBlog.fileSuffixName}`
    );
    const content = new Blob([base64ToArrayBuffer(fileRaw.content)]).text();
    const code = await content;

    if (receiveBlog.fileSuffixName === FileType.JS) setContent(code);
    else setContent(marked(code) as string);
  };

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
      {blog?.from === BlogFrom.LOCAL &&
        Array.isArray(blog.content) &&
        (blog?.content).map((str: string, index: number) => (
          <div
            key={index}
            className={cx(styled.content, styled.contentLocal)}
            dangerouslySetInnerHTML={{ __html: str }}
          ></div>
        ))}
      {blog?.from === BlogFrom.WX && (
        <div className={styled.content} dangerouslySetInnerHTML={{ __html: content as string }}></div>
      )}
      {blog?.from === BlogFrom.GITHUB &&
        // js代码使用prismjs高亮，其他使用markdown渲染
        (blog.fileSuffixName === FileType.JS ? (
          <pre className="language-javascript line-numbers">
            <code
              className={cx('language-javascript', styled.code)}
              dangerouslySetInnerHTML={{
                __html: Prism.highlight(content as string, Prism.languages.javascript, 'javascript'),
              }}
            ></code>
          </pre>
        ) : (
          <div className={styled.content} dangerouslySetInnerHTML={{ __html: content as string }}></div>
        ))}
      <Divider className={styled.divider} />
      {/* 底部 */}
      <div className={cx(styled.footer, styled.footerM)}>
        <span>© {dayjs().get('years')} TechInsights 技术博客. All rights reserved.</span>
        <span>
          <img className={styled.beianIcon} src="https://www.yanquankun.cn/cdn/beian-icon.png" />
          <Button
            className={styled.icpLink}
            href="https://beian.mps.gov.cn/#/query/webSearch?code=11011402054483"
            target={_isMobile ? '_self' : '_blank'}
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
