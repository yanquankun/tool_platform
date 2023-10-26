import { FC, Fragment, useEffect, useState } from 'react';
import { Row, Col, Space } from 'antd';
import { css } from '@emotion/css';
import { IBlogArticleItem } from '../interfaces/blogSidebar';
import dayjs from 'dayjs';

interface IProps {
  blogId: number;
}

export const BlogArticle: FC<IProps> = (props): JSX.Element => {
  const [article, setArticle] = useState<IBlogArticleItem>();

  useEffect(() => {
    if (props.blogId) {
      setArticle({
        blogId: 1,
        timestamp: dayjs(1698298863077).format('YYYY-MM-DD HH:mm:ss'),
        title: '序言',
        subtitle: '第一篇blog，从此开始吧~',
        content:
          '从这里开始第一篇吧，以前习惯把个人心得、学习笔记记录到印象笔记中，没有想过自己整一个个人博客，这次趁着空闲，就自己实现一个吧，由于时间问题，这次用的是静态数据，未来将使用nodejs搭建后端服务。23年经历了很多事，尤其是最近，遇到了一件糟心事，心态也发生了一些变化，也成熟起来了，现在的想法除了希望家人健康平安，就是搞钱了，努力赚钱！后续会持续更新本网站，加入更多元素',
      });
    }
  }, [props.blogId]);

  return article ? (
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
      <Row
        className={css`
          display: flex;
          justify-content: center;
          font-weight: 900;
          font-size: 22px;
        `}
      >
        {article.title}
      </Row>
      <Row
        justify="space-between"
        className={css`
          font-weight: 600;
        `}
      >
        <Col span={18}>{article.subtitle}</Col>
        <Col
          span={6}
          className={css`
            text-align: right;
            margin-top: 15px;
            font-size: 15px;
          `}
        >
          {article.timestamp}
        </Col>
      </Row>
      <Row
        className={css`
          text-indent: 20px;
        `}
      >
        {article.content}
      </Row>
    </Space>
  ) : (
    <Fragment></Fragment>
  );
};
