import { FC } from 'react';
import { Row, Col, Space, Result, Button, ConfigProvider, Divider, Empty } from 'antd';
import { css } from '@emotion/css';
import { IBlogArticleItem } from '../interfaces/blogSidebar';

interface IProps {
  blogId: string;
  article: IBlogArticleItem;
}

export const BlogArticle: FC<IProps> = (props): JSX.Element => {
  return props.article ? (
    <Space
      direction="vertical"
      className={css`
        width: 90%;
        border: 1px solid #ccc;
        background-color: aliceblue;
        border-radius: 10px;
        padding: 35px 25px;
        min-height: calc(100vh - 200px);
      `}
    >
      {/* 标题 */}
      <Row
        className={css`
          display: flex;
          justify-content: center;
          font-weight: 900;
          font-size: 22px;
        `}
      >
        {props.article.title}
      </Row>
      {/* 作者 二级标题 */}
      {props.article.author ? (
        <Row
          className={css`
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: 500;
          `}
        >
          {props.article.subtitle}
          <span
            className={css`
              margin-left: 20px;
            `}
          >
            作者：{props.article.author}
          </span>
        </Row>
      ) : (
        <></>
      )}
      {/* 创建时间 更新时间 */}
      <Row
        justify="space-between"
        className={css`
          font-weight: 600;
        `}
      >
        <Col span={18}>创建时间：{props.article.create_time}</Col>
        <Col
          span={6}
          className={css`
            text-align: right;
            margin-top: 15px;
            font-size: 15px;
          `}
        >
          更新时间：{props.article.update_time}
        </Col>
      </Row>
      {/* 文章内容 */}
      <Row
        className={css`
          text-indent: 20px;
        `}
      >
        <div dangerouslySetInnerHTML={{ __html: props.article.content }}></div>
      </Row>
      {/* 底部引用区域 */}
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
          <Button
            type="link"
            onClick={() => {
              window.open(props.article.url);
            }}
          >
            {props.article.url}
          </Button>
        </Row>
      ) : (
        <></>
      )}
      {props.article.content_source_url ? (
        <Row align="middle">
          内容引用原文链接：
          <Button
            type="link"
            onClick={() => {
              window.open(props.article.content_source_url);
            }}
          >
            {props.article.content_source_url}
          </Button>
        </Row>
      ) : (
        <></>
      )}
    </Space>
  ) : props.blogId ? (
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
