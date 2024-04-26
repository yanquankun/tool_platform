import { FC, Fragment, useEffect, useState } from 'react';
import { Col, Space } from 'antd';
import { css } from '@emotion/css';
import { IBlogArticleItem, IBlogListMap } from '../../interfaces/blogSidebar';
interface IProps {
  blogChange: (blogId: string) => void;
  blogMap: IBlogListMap;
}

export const BlogSidebar: FC<IProps> = (props): JSX.Element => {
  const [blogId, setBlogId] = useState<string>('first-blog');

  useEffect(() => {
    props.blogChange('first-blog');
  }, []);

  const onChange = (blogId: string) => {
    setBlogId(blogId);
    props.blogChange(blogId);
  };

  return props.blogMap.blogList.length ? (
    <Space
      direction="vertical"
      className={css`
        // width: 90%;
        // border: 1px solid #ccc;
        // background-color: aliceblue;
        // border-radius: 10px;
        // padding: 10px 5px;
        // min-height: 50vh;
        // background: #fff;
        height: calc(100vh - 105px);
        position: fixed;
        max-height: 60%;
        overflow-y: auto;
      `}
    >
      {props.blogMap.blogList.map((item: IBlogArticleItem) => {
        return (
          <Col
            key={item.blogId}
            onClick={() => item.type !== 'group' && onChange(item.blogId)}
            className={css`
              color: ${blogId == item.blogId ? 'rgb(0, 0, 0)' : 'rgb(0, 0, 0, .5)'};
              &:hover {
                color: ${item.type === 'group' ? '' : '#40a9ff'};
              }
            `}
          >
            {item.type === 'group' && (
              <div
                className={css`
                  font-size: 16px;
                  color: green;
                  // background: cadetblue;
                  display: flex;
                  text-align: center;
                  align-items: center;
                  height: 30px;
                  font-style: italic;
                `}
              >
                {item.title}
              </div>
            )}
            {item.type !== 'group' && <span>{item.title}</span>}
            {item.icon ? (
              <span
                className={css`
                  margin-left: 10px;
                `}
              >
                {item.icon}
              </span>
            ) : null}
            {item.subtitle ? (
              <span
                className={css`
                  display: block;
                  text-indent: 15px;
                  margin-top: 5px;
                `}
              >
                {item.subtitle}
              </span>
            ) : (
              <></>
            )}
          </Col>
        );
      })}
    </Space>
  ) : (
    <Fragment></Fragment>
  );
};
