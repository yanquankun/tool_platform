import { FC, useState, useCallback } from 'react';
import { css } from '@emotion/css';
import BlogTitleListItem from './blogTitleItem';
import { IBlogCategory } from '../interfaces/blog';

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
      title: '技术文章',
      expand: true,
      children: [
        {
          title: 'github文章',
          id: '1',
        },
      ],
    },
    {
      title: '技术文章2',
      expand: true,
      children: [
        {
          title: 'github文章2',
          id: '2',
        },
        {
          title: 'github文章2123',
          id: '22',
        },
        {
          title: 'github文github文章23123github文章23123章23123',
          id: '21',
        },
      ],
    },
  ]);
  const [currentBlogId, setCurrentBlogId] = useState<string>();

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
