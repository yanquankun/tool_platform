import { FC, useState, useCallback, useEffect } from 'react';
import { css } from '@emotion/css';
import BlogTitleListItem from './blogTitleItem';
import { IBlogCategory, IBlogItem } from '../interfaces/blog';
import { localBlogList } from '../interfaces/localBlog';
import { getGitHubList } from '../services/githubBlog';
import { getWxBlogList } from '../services/wxBlog';

const styled = {
  sliderWrap: css`
    width: 15rem;
    min-width: 150px;
    border-right: 1px solid #e5e7eb;
    box-sizing: border-box;
    padding: 0.6rem 0.95rem 1.5rem 0.95rem;
    font-size: 1rem;
    font-weight: 400;
    overflow-y: auto;
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
      children: [],
    },
    {
      title: 'Github文章',
      expand: true,
      id: 'github',
      children: [],
    },
  ]);
  const [currentBlogId, setCurrentBlogId] = useState<string>('local-1');

  useEffect(() => {
    (async function () {
      const wxBlogList = await getWxBlogList();
      const githubBlogList = await getGitHubList();

      setBlogTitleList([
        blogTitleList[0],
        {
          title: '微信公众号文章',
          expand: true,
          id: 'gongzhonghao',
          children: wxBlogList || [],
        },
        {
          title: 'Github文章',
          expand: true,
          id: 'github',
          children: githubBlogList || [],
        },
      ]);
    })();
  }, []);

  const handleToggleExpand = useCallback(
    (blog: IBlogCategory) => {
      blog.expand = !blog.expand;
      setBlogTitleList([...blogTitleList]);
    },
    [blogTitleList]
  );

  const handleSelectBlog = useCallback(
    (blog: IBlogItem) => {
      setCurrentBlogId((pre) => {
        if (!!blog.id && pre !== blog.id) {
          console.log('cur blog:', blog);
          // 此处进行文章分发
        }
        return blog.id;
      });
    },
    [currentBlogId]
  );

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
