import { FC, useEffect, Fragment, useState } from 'react';
import { css } from '@emotion/css';
import { Watermark } from 'antd';
import { Row, Space, Result, Button, ConfigProvider, Divider, Image, message } from 'antd';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import { getGithubFileContent } from '~shared/apis/git_cp';
import { base64ToArrayBuffer } from '~shared/utils/util';
import { isMobile } from '~shared/utils/util';
import { IBlogTitleItem } from '../../interfaces/blogSidebar';

const commonStyle = {
  content: css`
    overflow-y: auto;
    min-height: calc(100vh - 10rem);
    display: flex;
    width: calc(100% - 20rem);
    margin-top: 3.6rem;
    margin-left: 20rem;
    justify-content: center;
    align-items: center;
    padding: 5rem 3rem;
    box-sizing: border-box;
  `,
  m_content: css`
    padding: 20px;
    overflow-y: auto;
    min-height: calc(100vh - 10rem);
    display: flex;
    margin-top: calc(3.6rem - 30px);
    margin-top: 3.6rem;
  `,
};

interface IProps {
  blogId: string;
  content: string;
}
export const Content: FC<IProps> = function (props): JSX.Element {
  const _isMobile = isMobile();
  const [code, setCode] = useState<string>('');
  const [blogReqParam, setBlogReqParam] = useState<IBlogTitleItem>();
  const [showErrorPage, setShowErrorPage] = useState<boolean>(false);

  useEffect(() => {
    if (props.blogId) {
      setCode('');

      const urlParams = new URLSearchParams(location.search);
      const id = decodeURIComponent(window.atob(urlParams.get('id') || ''));
      setBlogReqParam(id ? JSON.parse(id) : {});
    }
  }, [props.blogId]);

  useEffect(() => {
    if (blogReqParam?.from === 'github') {
      getGithubBlog('learn', 'master', blogReqParam?.path ?? '');
    }
  }, [blogReqParam]);

  const getGithubBlog = async (packageName: string, feature: string, path: string) => {
    if (!path) {
      setShowErrorPage(true);
      return;
    }
    const fileRaw = await getGithubFileContent(packageName, feature, path);
    const content = new Blob([base64ToArrayBuffer(fileRaw.content)]).text();
    const code = await content;
    if (code) {
      setShowErrorPage(false);
      setCode(code);
    }
  };

  const createTitleArea = () => {
    return (
      <Fragment>
        {/* 一级标题 */}
        {_isMobile && (
          <Row
            className={css`
              display: flex;
              justify-content: left;
              font-weight: 900;
              font-size: 22px;
            `}
          >
            {blogReqParam?.title ?? ''}
          </Row>
        )}
        {/* 二级标题 */}
        {(blogReqParam?.subtitle ?? '') && (
          <Row
            className={css`
              display: flex;
              justify-content: left;
              font-weight: 500;
              font-size: 14px;
            `}
          >
            {blogReqParam?.subtitle ?? ''}
          </Row>
        )}
        <Divider
          style={{
            margin: '8px 0',
          }}
        />
      </Fragment>
    );
  };

  const createArticleInfoArea = () => {
    // return (
    //   <Fragment>
    //     {/* 作者 */}
    //     {blogReqParam?.author && (
    //       <Row>
    //         <span style={{ fontSize: '16px' }}>作者：{blogReqParam?.author}</span>
    //       </Row>
    //     )}
    //     {/* 创建时间 */}
    //     {blogReqParam?.create_time && (
    //       <Row style={{ fontSize: '16px' }}>创建时间：{blogReqParam?.create_time}</Row>
    //     )}
    //     {/* 更新时间 */}
    //     {blogReqParam?.update_time && (
    //       <Row style={{ fontSize: '16px' }}>更新时间：{blogReqParam?.update_time}</Row>
    //     )}
    //     {/* 图文消息的摘要 */}
    //     {blogReqParam?.digest && (
    //       <Row style={{ fontSize: '16px' }}>摘要：{blogReqParam?.digest}</Row>
    //     )}
    //     <Divider style={{ margin: '12px 0' }} />
    //   </Fragment>
    // );
  };

  const createThumbArea = () => {
    // return (
    //   /* 封面图片 */
    //   blogReqParam?.thumb_url && (
    //     <Fragment>
    //       <div
    //         className={css`
    //           font-size: 18px;
    //           font-weight: 500;
    //         `}
    //       >
    //         封面图
    //       </div>
    //       <Image src={blogReqParam?.thumb_url} />
    //       <Divider />
    //     </Fragment>
    //   )
    // );
  };

  const renderHtmlText = (content: string[]) => {
    return content.map((__html: string, idx: number) => {
      return (
        <Row
          key={idx}
          className={css`
            text-indent: 20px;
            fontfamily:
              -apple-system,
              BlinkMacSystemFont,
              Segoe UI,
              Roboto,
              Oxygen,
              Ubuntu,
              Cantarell,
              Fira Sans,
              Droid Sans,
              Helvetica Neue,
              sans-serif;
          `}
        >
          <div style={{ fontSize: '18px' }} dangerouslySetInnerHTML={{ __html: __html }}></div>
        </Row>
      );
    });
  };

  const createContentArea = () => {
    // const content = blogReqParam?.content;
    // if (!content) {
    //   message.error('获取文章失败，请重试', 2);
    // } else if (Array.isArray(content)) return renderHtmlText(content);
    // else if (typeof content === 'string') return renderHtmlText([content]);
  };

  const createArticleQuoteArea = () => {
    // return (
    //   <Fragment>
    //     {(blogReqParam?.url || blogReqParam?.content_source_url) && (
    //       <Divider
    //         style={{
    //           color: 'rgb(0,0,0,0.4)',
    //         }}
    //       />
    //     )}
    //     {blogReqParam?.url ? (
    //       <Row align="middle" style={{ fontSize: '16px' }}>
    //         公众号原文链接：
    //         <Button type="link">
    //           <a
    //             style={{ fontSize: '16px' }}
    //             onClick={() => {
    //               window.open(blogReqParam?.url);
    //             }}
    //           >
    //             点击跳转公众号原文链接
    //           </a>
    //         </Button>
    //       </Row>
    //     ) : (
    //       <></>
    //     )}
    //     {blogReqParam?.content_source_url ? (
    //       <Row align="middle" style={{ fontSize: '16px' }}>
    //         内容引用原文链接：
    //         <Button type="link">
    //           <a
    //             style={{ fontSize: '16px' }}
    //             onClick={() => {
    //               window.open(blogReqParam?.content_source_url);
    //             }}
    //           >
    //             点击跳转内容引用原文链接
    //           </a>
    //         </Button>
    //       </Row>
    //     ) : (
    //       <></>
    //     )}
    //   </Fragment>
    // );
  };

  const createWaitArea = () => {
    return props.blogId ? (
      // 获取到blogId但无文章内容时状态
      <ConfigProvider
        theme={{
          components: {
            Result: {
              subtitleFontSize: 20,
            },
          },
        }}
      >
        <Result
          status="404"
          title="文章获取失败"
          subTitle="sor，该文章从微信公众号获取失败，请稍后重试或立即刷新当前页"
          extra={
            <Button type="primary" onClick={() => window.location.reload()}>
              Refresh
            </Button>
          }
        />
      </ConfigProvider>
    ) : (
      // 无文章或加载中状态
      <></>
    );
  };

  const createCodeContent = () => {
    if (blogReqParam?.path?.endsWith('.md')) {
      return (
        <>
          {code && (
            <div
              dangerouslySetInnerHTML={{
                __html: window.marked(code.trim()),
              }}
            ></div>
          )}
          {blogReqParam.htmlUrl && (
            <Divider
              style={{
                color: 'rgb(0,0,0,0.4)',
              }}
            />
          )}
          {blogReqParam.htmlUrl ? (
            <Row align="middle" style={{ fontSize: '16px' }}>
              github原文链接：
              <Button type="link">
                <a
                  style={{ fontSize: '16px' }}
                  onClick={() => {
                    window.open(blogReqParam.htmlUrl);
                  }}
                >
                  点击跳转github链接
                </a>
              </Button>
            </Row>
          ) : (
            <></>
          )}
        </>
      );
    }
    return (
      <>
        {code && (
          <pre style={{ width: _isMobile ? '100%' : 'calc(100vw - 400px)' }} className="language-javascript">
            <code
              className="language-javascript"
              dangerouslySetInnerHTML={{
                __html: Prism.highlight(code as string, Prism.languages.javascript, 'javascript'),
              }}
            ></code>
          </pre>
        )}
        {blogReqParam?.htmlUrl && (
          <Divider
            style={{
              color: 'rgb(0,0,0,0.4)',
            }}
          />
        )}
        {blogReqParam?.htmlUrl && (
          <Row align="middle" style={{ fontSize: '16px' }}>
            github原文链接：
            <Button type="link">
              <a
                style={{ fontSize: '16px' }}
                onClick={() => {
                  window.open(blogReqParam?.htmlUrl);
                }}
              >
                点击跳转github链接
              </a>
            </Button>
          </Row>
        )}
      </>
    );
  };

  return (
    <Watermark content="堃堃Blog">
      <div className={_isMobile ? commonStyle.m_content : commonStyle.content}>
        {/* {showErrorPage ? ( */}
        <Space direction="vertical">
          {/* 标题区域 */}
          {createTitleArea()}
          {/* 代码区域 */}
          {blogReqParam?.from && (
            <>
              {blogReqParam?.from === 'github' && createCodeContent()}
              {blogReqParam?.from != 'github' && (
                <>
                  {/* 文章信息区域 */}
                  {createArticleInfoArea()}
                  {/* 封面图片区域 */}
                  {createThumbArea()}
                  {/* 文章内容区域 */}
                  {createContentArea()}
                  {/* 底部引用区域 */}
                  {createArticleQuoteArea()}
                </>
              )}
            </>
          )}
        </Space>
        {/* ) : ( */}
        {/* 等待状态区域 */}
        {/* createWaitArea()
        )} */}
      </div>
    </Watermark>
  );
};
