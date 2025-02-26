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
    transition:
      transform 0.3s ease-in-out,
      opacity 0.3s ease-in-out;
    transform: translateY(0);
    height: auto;
    opacity: 1;
    overflow: hidden;
  `,
  childrenDown: css`
    transition:
      transform 0.3s ease-in-out,
      opacity 0.3s ease-in-out;
    transform: translateY(-10px);
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
      <div className={styled.firstTitle} onClick={() => onToggleExpand(blog)}>
        <span>{blog.title}</span>
        {getArrow(blog.expand)}
      </div>
      {blog.children.length &&
        blog.children.map((child, index) => (
          <div key={index} className={css(styled.secondTitle, blog.expand ? styled.childrenUp : styled.childrenDown)}>
            {child.title}
          </div>
        ))}
    </Fragment>
  );
});

export default BlogTitleListItem;
