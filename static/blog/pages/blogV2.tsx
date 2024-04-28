import { FC, useState, useEffect, useMemo, useCallback, Fragment } from 'react';
import { Header } from '../components/blogV2/header';
import { Slider } from '../components/blogV2/slider';
import { Content } from '../components/blogV2/content';

export const App: FC = () => {
  const [blogId, setBlogId] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const transportBlogId = useCallback(
    (blogId: string, content: string) => {
      setBlogId(blogId);
      setContent(content);
    },
    [blogId]
  );

  return (
    <Fragment>
      <Header />
      <Slider transportBlog={transportBlogId} />
      <Content blogId={blogId} content={content} />
    </Fragment>
  );
};
