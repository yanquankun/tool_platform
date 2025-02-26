import { FC, useState, useCallback } from 'react';
import { css } from '@emotion/css';
import BlogTitleListItem from './blogTitleItem';
import { IBlogCategory, SECOND_TITLE_ID, BlogFrom } from '../interfaces/blog';
import { localBlogList } from '../interfaces/localBlog';

const styled = {
  sliderWrap: css`
    width: 15rem;
    min-width: 150px;
    border-right: 1px solid #e5e7eb;
    box-sizing: border-box;
    padding: 0.6rem 0.95rem 1.5rem 0.95rem;
    font-size: 1rem;
    font-weight: 400;
  `,
  slider: css`
    overflow-y: auto;
  `,
};

const Slider: FC = () => {
  const [blogTitleList, setBlogTitleList] = useState<IBlogCategory[]>([
    {
      title: '写在前面',
      expand: true,
      id: 'local',
      children: localBlogList,
    },
    {
      title: '微信公众号文章',
      expand: true,
      id: 'gongzhonghao',
      children: [
        {
          title: 'github文章2',
          id: '2',
          from: BlogFrom.WX,
        },
        {
          title: 'github文章2123',
          id: '22',
          from: BlogFrom.WX,
        },
        {
          title: 'github文github文章23123github文章23123章23123',
          id: '21',
          from: BlogFrom.WX,
        },
      ],
    },
    {
      title: 'Github文章',
      expand: true,
      id: 'github',
      children: [
        {
          title: '基础',
          id: SECOND_TITLE_ID,
          from: BlogFrom.GITHUB,
        },
        {
          title: 'github文章2',
          id: '2213',
          from: BlogFrom.GITHUB,
        },
        {
          title: '技术',
          id: SECOND_TITLE_ID,
          from: BlogFrom.GITHUB,
        },
        {
          title: 'github文章2123',
          id: '214122',
          from: BlogFrom.GITHUB,
        },
        {
          title: 'github文github文章23123章23123',
          id: '21231',
          from: BlogFrom.GITHUB,
        },
      ],
    },
  ]);
  const [currentBlogId, setCurrentBlogId] = useState<string>('local-1');

  const handleToggleExpand = useCallback(
    (blog: IBlogCategory) => {
      blog.expand = !blog.expand;
      setBlogTitleList([...blogTitleList]);
    },
    [blogTitleList]
  );

  const handleSelectBlog = useCallback((id: string) => {
    setCurrentBlogId(id);
  }, []);

  return (
    <div className={styled.sliderWrap}>
      {blogTitleList.map((blog, index) => (
        <BlogTitleListItem
          key={index}
          blog={blog}
          currentBlogId={currentBlogId}
          onToggleExpand={handleToggleExpand}
          onSelectBlog={handleSelectBlog}
        />
      ))}
    </div>
  );
};

export default Slider;
