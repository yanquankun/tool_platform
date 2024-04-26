import { FC, Fragment } from 'react';
import { Row, Space, Result, Button, ConfigProvider, Divider, Image } from 'antd';
import { css } from '@emotion/css';
import { IBlogArticleItem } from '../../interfaces/blogSidebar';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/plugins/line-numbers/prism-line-numbers';

interface IProps {
  blogId: string;
  article: IBlogArticleItem;
  from: 'wx' | 'github';
}

export const BlogArticle: FC<IProps> = (props): JSX.Element => {
  const createTitleArea = () => {
    return (
      <Fragment>
        {/* 一级标题 */}
        <Row
          className={css`
            display: flex;
            justify-content: left;
            font-weight: 900;
            font-size: 22px;
          `}
        >
          {props.article.title}
        </Row>
        {/* 二级标题 */}
        {props.article.subtitle && (
          <Row
            className={css`
              display: flex;
              justify-content: left;
              font-weight: 500;
              font-size: 14px;
            `}
          >
            {props.article.subtitle}
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
    return (
      <Fragment>
        {/* 作者 */}
        {props.article.author && (
          <Row>
            <span>作者：{props.article.author}</span>
          </Row>
        )}
        {/* 创建时间 */}
        {props.article.create_time && <Row>创建时间：{props.article.create_time}</Row>}
        {/* 更新时间 */}
        {props.article.update_time && <Row>更新时间：{props.article.update_time}</Row>}
        {/* 图文消息的摘要 */}
        {props.article.digest && <Row>摘要：{props.article.digest}</Row>}
        <Divider style={{ margin: '12px 0' }} />
      </Fragment>
    );
  };

  const createThumbArea = () => {
    return (
      /* 封面图片 */
      props.article.thumb_url && (
        <Fragment>
          <div
            className={css`
              font-size: 18px;
              font-weight: 500;
            `}
          >
            封面图
          </div>
          <Image src={props.article.thumb_url} />
          <Divider />
        </Fragment>
      )
    );
  };

  const createContentArea = () => {
    return (
      /* 文章内容 */
      <Row
        className={css`
          text-indent: 20px;
        `}
      >
        <div dangerouslySetInnerHTML={{ __html: props.article.content || '' }}></div>
      </Row>
    );
  };

  const createArticleQuoteArea = () => {
    return (
      <Fragment>
        {(props.article.url || props.article.content_source_url) && (
          <Divider
            style={{
              color: 'rgb(0,0,0,0.4)',
            }}
          />
        )}
        {props.article.url ? (
          <Row align="middle">
            公众号原文链接：
            <Button type="link">
              <a
                onClick={() => {
                  window.open(props.article.url);
                }}
              >
                点击跳转公众号原文链接
              </a>
            </Button>
          </Row>
        ) : (
          <></>
        )}
        {props.article.content_source_url ? (
          <Row align="middle">
            内容引用原文链接：
            <Button type="link">
              <a
                onClick={() => {
                  window.open(props.article.content_source_url);
                }}
              >
                点击跳转内容引用原文链接
              </a>
            </Button>
          </Row>
        ) : (
          <></>
        )}
      </Fragment>
    );
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
    return (
      <>
        {props.article.content && props.from == 'github' && (
          <pre className="language-javascript">
            <code
              className="language-javascript"
              dangerouslySetInnerHTML={{
                __html: Prism.highlight(props.article.content as string, Prism.languages.javascript, 'javascript'),
              }}
            ></code>
          </pre>
        )}
        {props.article.htmlUrl && (
          <Divider
            style={{
              color: 'rgb(0,0,0,0.4)',
            }}
          />
        )}
        {props.article.htmlUrl ? (
          <Row align="middle">
            github原文链接：
            <Button type="link">
              <a
                onClick={() => {
                  window.open(props.article.htmlUrl);
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
  };

  return props.article ? (
    <Space
      direction="vertical"
      className={css`
        width: 85%;
        // border: 1px solid #ccc;
        // background-color: aliceblue;
        // border-radius: 10px;
        // padding: 35px 25px;
        // min-height: calc(100vh - 200px);
      `}
    >
      {/* 标题区域 */}
      {createTitleArea()}
      {/* 代码区域 */}
      {createCodeContent()}
      {props.from != 'github' && (
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
    </Space>
  ) : (
    /** 等待状态区域 */
    createWaitArea()
  );
};
