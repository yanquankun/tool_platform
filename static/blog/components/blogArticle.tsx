import { FC, Fragment, useEffect, useState } from 'react';
import { Col, Space } from 'antd';
import { css } from '@emotion/css';
import { IBlogArticleItem } from '../interfaces/blogSidebar';

interface IProps {
  blogId: number;
}

const articleList = [
  {
    blogId: 1,
  },
] as Array<IBlogArticleItem>;

export const BlogArticle: FC<IProps> = (props): JSX.Element => {
  useEffect(() => {
    if (props.blogId) {
      console.log(props.blogId);
    }
  }, [props.blogId]);

  return articleList.length ? (
    <Space
      direction="vertical"
      className={css`
        width: 90%;
        border: 1px solid #ccc;
        background-color: antiquewhite;
        border-radius: 10px;
        padding: 10px 5px;
        min-height: calc(100vh - 200px);
      `}
    >
      {articleList.map((item: IBlogArticleItem) => {
        return (
          <Col
            key={item.blogId}
            className={css`
              color: rgb(0, 0, 0, 0.5);
              &:hover {
                color: #40a9ff;
              }
            `}
          ></Col>
        );
      })}
    </Space>
  ) : (
    <Fragment></Fragment>
  );
};
