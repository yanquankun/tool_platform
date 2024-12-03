import { FC, useState, useCallback, Fragment, useEffect } from 'react';
import { Header } from '../components/blogV2/header';
import { Slider } from '../components/blogV2/slider';
import { Content } from '../components/blogV2/content';
import { isMobile, isSafari } from '~shared/utils/util';
import { localBlogList } from '../components/blogV2/localBlog';
import { cx, css } from '@emotion/css';
import { beforeInsall } from '~shared/utils/pwa';
import { copy } from '~shared/utils/util';

const styled = {
  pwa: css`
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
  `,
  share: css`
    width: 55px;
    position: fixed;
    right: 15px;
    bottom: 100px;
    cursor: pointer;
    z-index: 999;
    border-radius: 50%;
  `,
};

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

  useEffect(function () {
    setStaticConfig();
    // beforeinstallprompt 事件：
    // 谷歌浏览器不支持这个事件，无法显示“安装到主屏幕”的提示。
    // 安装 PWA 的功能仅在 Safari 中可用，其他浏览器只能运行，但无法提供安装选项。
    // 移动端暂不支持pwa提示
    beforeInsall('install_btn');
  }, []);

  const setStaticConfig = async () => {
    // const res = await getStaticConfigs();
    // if (res.code == 200) {
    //   const tip = res.data.tip || '';
    //   setTip(tip);
    // }
  };

  const copyCurBlogUrl = () => {
    const url = window.location.href;
    copy('.urlCopy', url, '当前博客地址已复制', '复制失败');
  };

  return (
    <Fragment>
      <Header transportBlogId={transportBlogId} />
      {_isMobile ? null : <Slider transportBlog={transportBlogId} />}
      <Content blogId={blogId} content={content} />
      {!_isMobile && (
        <span id="install_btn" className={styled.pwa}>
          安装为桌面应用
        </span>
      )}
      <img
        onClick={copyCurBlogUrl}
        className={cx('urlCopy', styled.share)}
        src="https://www.yanquankun.com:9300/cdn/blog/share-animate.gif"
        alt="share animate"
      />
    </Fragment>
  );
};
