import React, { Fragment, MouseEvent, MouseEventHandler, useState } from 'react';
import { css } from '@emotion/css';
import { IBlogCategory } from '../interfaces/blog';
import { Tooltip } from 'antd';
import { isEllipsisShown } from '@shared/utils/util';

const styled = {
  firstTitle: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 1rem;
    font-weight: 500;
    color: #333;
    padding: 0.5rem 0;
    cursor: pointer;
  `,
  secondTitle: css`
    font-size: 0.875rem;
    padding: 0.375rem 0 0.375rem 1rem;
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    &:hover {
      font-weight: 500;
      color: #333;
    }
  `,
  secondTitleSelect: css`
    color: rgb(62, 175, 124);
    font-weight: 500;
  `,
  unSecondTitleSelect: css`
    color: #666;
    font-weight: 400;
  `,
  arrowUp: css`
    transition: transform 0.3s ease-in-out;
    transform: rotate(180deg);
  `,
  arrowDown: css`
    transition: transform 0.3s ease-in-out;
    transform: rotate(0deg);
  `,
  childrenUp: css`
    transition: all 0.3s ease-in-out;
    transform: translateY(0);
    height: auto;
    opacity: 1;
    overflow: hidden;
  `,
  childrenDown: css`
    transition: all 0.3s ease-in-out;
    transform: translateY(-0.625rem);
    height: 0;
    opacity: 0;
    overflow: hidden;
  `,
};

const BlogTitleListItem = React.memo<{
  blog: IBlogCategory;
  currentBlogId?: string;
  onToggleExpand: (blog: IBlogCategory) => void;
  onSelectBlog: (id: string) => void;
}>(({ blog, currentBlogId, onToggleExpand, onSelectBlog }) => {
  const getArrow = (expand: boolean) => (
    <img
      className={css(expand ? styled.arrowUp : styled.arrowDown)}
      src="https://www.yanquankun.cn/cdn/blog/arrow.png"
      alt=""
    />
  );
  const [ellipsisSource, setEllipsisSource] = useState<string>('');

  return (
    <Fragment>
      {/* 一级菜单 */}
      <div className={styled.firstTitle} onClick={() => onToggleExpand(blog)}>
        <span>{blog.title}</span>
        {getArrow(blog.expand)}
      </div>
      <div className={blog.expand ? styled.childrenUp : styled.childrenDown}>
        {blog.children.length > 0 &&
          blog.children.map((child, index) => (
            //   二级菜单
            <Tooltip placement="right" title={ellipsisSource}>
              <div
                key={index}
                className={css(
                  styled.secondTitle,
                  child.id === currentBlogId ? styled.secondTitleSelect : styled.unSecondTitleSelect
                )}
                onClick={() => onSelectBlog(child.id)}
                onMouseEnter={(e: Parameters<MouseEventHandler>[0]) => {
                  if (isEllipsisShown(e.target as HTMLElement)) setEllipsisSource(child.title);
                  else setEllipsisSource('');
                }}
              >
                <span>{child.title}</span>
              </div>
            </Tooltip>
          ))}
      </div>
    </Fragment>
  );
});

export default BlogTitleListItem;
