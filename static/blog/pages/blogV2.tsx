import { FC, useState, useEffect, useMemo, useCallback, Fragment } from 'react';
import { Header } from '../components/blogV2/header';
import { Slider } from '../components/blogV2/slider';
import { Content } from '../components/blogV2/content';
import { isMobile } from '~shared/utils/util';
import { localBlogList } from '../components/blogV2/localBlog';

export const App: FC = () => {
  const _isMobile = isMobile();
  const [blogId, setBlogId] = useState<string>(_isMobile ? 'local-1' : '');
  const [content, setContent] = useState<string>(_isMobile ? JSON.stringify({ article: localBlogList[0] }) : '');
  const transportBlogId = useCallback(
    (blogId: string, content: string) => {
      setBlogId(blogId);
      setContent(content);
    },
    [blogId]
  );

  return (
    <Fragment>
      <Header transportBlogId={transportBlogId} />
      {_isMobile ? null : <Slider transportBlog={transportBlogId} />}
      <Content blogId={blogId} content={content} />
    </Fragment>
  );
};
