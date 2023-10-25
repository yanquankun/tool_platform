import { FC, Fragment, useEffect, useState } from 'react';
import { Steps, Row, Col, Space } from 'antd';
import { css } from '@emotion/css';
import { StepBackwardOutlined } from '@ant-design/icons';
interface IProps {
  blogChange: (blogId: number) => void;
}

export const BlogSidebar: FC<IProps> = (props): JSX.Element => {
  const [current, setCurrent] = useState(0);

  const description = 'This is a description.';
  const blogList = [
    {
      blogId: 1,
      title: 'Step 1',
      description,
      icon: <Fragment></Fragment>,
    },
    {
      blogId: 2,
      title: 'Step 2',
      description,
      icon: <StepBackwardOutlined />,
    },
  ];

  useEffect(() => {
    blogList.length && props.blogChange(blogList[0].blogId);
  }, []);

  const onChange = (blogId: number) => {
    console.log(blogId);
    props.blogChange(blogId);
  };

  return blogList.length ? (
    <Space
      direction="vertical"
      css={{
        border: '1px solid',
        minHeight: '120px',
      }}
    >
      {blogList.map((item: any) => {
        return (
          <Col key={item.blogId} onClick={() => onChange(item.blogId)}>
            <span>{item.title}</span>
            <span
              css={{
                marginLeft: '10px',
              }}
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
