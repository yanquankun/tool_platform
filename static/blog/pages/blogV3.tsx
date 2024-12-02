import { FC, useState, useCallback, Fragment, useEffect } from 'react';
import { Header } from '../components/blogV3/header';
import { Slider } from '../components/blogV3/slider';
import { Content } from '../components/blogV3/content';
import { isMobile, isSafari } from '~shared/utils/util';
import { localBlogList } from '../components/blogV2/localBlog';
import { css } from '@emotion/css';
import { beforeInsall } from '~shared/utils/pwa';

export const App: FC = () => {
  const _isMobile = isMobile();
  const _isSafari = isSafari();
  const [blogId, setBlogId] = useState<string>(_isMobile ? 'local-1' : '');
  const [content, setContent] = useState<string>(_isMobile ? JSON.stringify({ article: localBlogList[0] }) : '');
  const transportBlogId = useCallback(
    (blogId: string, content: string) => {
      setBlogId(blogId);
      setContent(content);
    },
    [blogId]
  );

  useEffect(() => {
    // beforeinstallprompt 事件：
    // 谷歌浏览器不支持这个事件，无法显示“安装到主屏幕”的提示。
    // 安装 PWA 的功能仅在 Safari 中可用，其他浏览器只能运行，但无法提供安装选项。
    // 移动端暂不支持pwa提示
    beforeInsall('install_btn');
  }, []);

  return (
    <Fragment>
      <Header transportBlogId={transportBlogId} />
      {_isMobile ? null : <Slider transportBlog={transportBlogId} />}
      <Content blogId={blogId} content={content} />
      {!_isMobile && (
        <span
          id="install_btn"
          className={css`
            position: fixed;
            background: #fcf4f4;
            border: 2px dotted #302d2d;
            border-radius: 6px;
            padding: 5px;
            cursor: pointer;
            font-family: cursive;
            right: 10px;
            bottom: 40px;
            width: 19px;
            z-index: 999;
            display: none;
          `}
        >
          安装为桌面应用
        </span>
      )}
    </Fragment>
  );
};
