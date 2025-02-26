import React, { Fragment } from 'react';
import { css } from '@emotion/css';
import { IBlogCategory } from '../interfaces/blog';

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
    color: #666;
    padding: 0.375rem 0 0.375rem 1rem;
    cursor: pointer;
    &:hover {
      font-weight: 500;
      color: #333;
    }
  `,
  arrow: css``,
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
  onToggleExpand: (blog: IBlogCategory) => void;
}>(({ blog, onToggleExpand }) => {
  const getArrow = (expand: boolean) => (
    <img
      className={css(styled.arrow, expand ? styled.arrowUp : styled.arrowDown)}
      src="https://www.yanquankun.cn/cdn/blog/arrow.png"
      alt=""
    />
  );

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
            <div key={index} className={styled.secondTitle}>
              {child.title}
            </div>
          ))}
      </div>
    </Fragment>
  );
});

export default BlogTitleListItem;
