import { FC, Fragment, useEffect, useState } from 'react';
import { Col, Space } from 'antd';
import { css } from '@emotion/css';
import { IBlogSideItem } from '../interfaces/blogSidebar';
interface IProps {
  blogChange: (blogId: number) => void;
}

const blogList = [
  {
    blogId: 1,
    title: '序言',
    description: '第一篇blog，从此开始吧~',
    icon: null,
  },
] as Array<IBlogSideItem>;

export const BlogSidebar: FC<IProps> = (props): JSX.Element => {
  const [blogId, setBlogId] = useState<number>();

  useEffect(() => {
    if (blogList.length) {
      props.blogChange(blogList[0].blogId);
      setBlogId(blogList[0].blogId);
    }
  }, []);

  const onChange = (blogId: number) => {
    setBlogId(blogId);
    props.blogChange(blogId);
  };

  return blogList.length ? (
    <Space
      direction="vertical"
      className={css`
        width: 70%;
        border: 1px solid #ccc;
        background-color: aliceblue;
        border-radius: 10px;
        padding: 10px 5px;
        min-height: 50vh;
      `}
    >
      {blogList.map((item: IBlogSideItem) => {
        return (
          <Col
            key={item.blogId}
            onClick={() => onChange(item.blogId)}
            className={css`
              color: ${blogId == item.blogId ? 'rgb(0, 0, 0)' : 'rgb(0, 0, 0, .5)'};
              &:hover {
                color: #40a9ff;
              }
            `}
          >
            <span>{item.title}</span>
            {item.icon ? (
              <span
                className={css`
                  margin-left: 10px;
                `}
              >
                {item.icon}
              </span>
            ) : null}
            <span
              className={css`
                display: block;
                text-indent: 15px;
                margin-top: 5px;
              `}
            >
              {item.description}
            </span>
          </Col>
        );
      })}
    </Space>
  ) : (
    <Fragment></Fragment>
  );
};
