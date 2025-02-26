import React, { FC, Fragment, useState, useCallback } from 'react';
import { css } from '@emotion/css';
import { IBlogCategory } from '../interfaces/blog';

const styled = {
  firstTitle: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
  `,
  secondTitle: css`
    text-indent: 1rem;
    cursor: pointer;
  `,
};

const BlogTitleListItem = React.memo<{
  blog: IBlogCategory;
  onToggleExpand: (blog: IBlogCategory) => void;
}>(({ blog, onToggleExpand }) => {
  const getArrow = (expand: boolean) =>
    expand ? 123 : <img src="https://www.yanquankun.cn/cdn/blog/arrow.png" alt="" />;

  return (
    <Fragment>
      <div className={styled.firstTitle} onClick={() => onToggleExpand(blog)}>
        <span>{blog.title}</span>
        {getArrow(blog.expand)}
      </div>
      {blog.children.length &&
        blog.children.map((child, index) => (
          <div key={index} className={styled.secondTitle}>
            {child.title}
          </div>
        ))}
    </Fragment>
  );
});

export default BlogTitleListItem;
