import { FC, useState, useCallback, useEffect } from 'react';
import { css } from '@emotion/css';
import BlogTitleListItem from './blogTitleItem';
import { IBlogCategory, IBlogItem, BlogFrom } from '../interfaces/blog';
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

const Slider: FC<{ postBlog: (blog: IBlogItem) => void }> = ({ postBlog }) => {
  const [blogTitleList, setBlogTitleList] = useState<IBlogCategory[]>([
    {
      title: '写在前面',
      expand: true,
      id: 'local',
      from: BlogFrom.LOCAL,
      children: localBlogList,
    },
    {
      title: '微信公众号文章',
      expand: true,
      id: 'gongzhonghao',
      from: BlogFrom.WX,
      children: [],
    },
    {
      title: 'Github文章',
      expand: true,
      id: 'github',
      from: BlogFrom.GITHUB,
      children: [],
    },
  ]);
  const [currentBlogId, setCurrentBlogId] = useState<string>();

  const setCurBlog = (blogList: IBlogItem[]) => {
    const urlSearch = new window.URLSearchParams(window.location.search);
    const name = urlSearch.get('name');
    const hash = window.location.hash.slice(1);

    if (!name || !hash) {
      const curBlog = localBlogList[0];
      setCurrentBlogId(curBlog.id);
      postBlog(curBlog);
      window.history.replaceState('', '', `?name=${curBlog.title}#${getHash(curBlog.id)}`);
    } else {
      const curBlogId = window.atob(hash);
      setCurrentBlogId(curBlogId);
      const curBlog = blogList.find((blog) => blog.id === curBlogId);
      postBlog(curBlog!);
    }
  };

  const getHash = (id: string) => {
    return window.btoa(`${id}`);
  };

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
          from: BlogFrom.WX,
          children: wxBlogList || [],
        },
        {
          title: 'Github文章',
          expand: true,
          id: 'github',
          from: BlogFrom.GITHUB,
          children: githubBlogList || [],
        },
      ]);
      setCurBlog([...localBlogList, ...wxBlogList, ...githubBlogList]);
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
          // 此处进行文章分发
          window.history.replaceState('', '', `?name=${blog.title}#${getHash(blog.id)}`);
          postBlog(blog);
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
