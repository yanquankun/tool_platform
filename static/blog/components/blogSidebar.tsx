import { FC, Fragment, useEffect, useState } from 'react';
import { Steps, Row, Col, Space } from 'antd';
import { css } from '@emotion/css';
import { StepBackwardOutlined } from '@ant-design/icons';
import { IBlogSideItem } from '../interfaces/blogSidebar';
interface IProps {
  blogChange: (blogId: number) => void;
}

const blogList = [
  {
    blogId: 1,
    title: 'Step 1',
    description: '123',
    icon: <Fragment></Fragment>,
  },
  {
    blogId: 2,
    title: 'Step 2',
    description: '321',
    icon: <StepBackwardOutlined />,
  },
] as Array<IBlogSideItem>;

export const BlogSidebar: FC<IProps> = (props): JSX.Element => {
  useEffect(() => {
    blogList.length && props.blogChange(blogList[0].blogId);
  }, []);

  const onChange = (blogId: number) => {
    props.blogChange(blogId);
  };

  return blogList.length ? (
    <Space direction="vertical">
      {blogList.map((item: IBlogSideItem) => {
        return (
          <Col
            key={item.blogId}
            onClick={() => onChange(item.blogId)}
            className={css`
              &:hover {
                color: #40a9ff;
              }
            `}
          >
            <span>{item.title}</span>
            <span
              className={css`
                margin-left: 10px;
              `}
            >
              {item.icon}
            </span>
          </Col>
        );
      })}
    </Space>
  ) : (
    <Fragment></Fragment>
  );
};
