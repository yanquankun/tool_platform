import { FC, Suspense, useEffect, useState, Fragment } from 'react';
import Header from '../components/header';
import Slider from '../components/slider';
import Contet from '../components/content';
import { Progress, Tooltip } from 'antd';
import { css, cx } from '@emotion/css';
import useMarqueeText from '~shared/components/marquee';
import { getLastedNotice } from '~shared/apis/static';
import { beforeInsall } from '~shared/utils/pwa';
import { copy } from '~shared/utils/util';
import ChatBot from '../components/chatbot';
import { isMobile } from '~shared/utils/util';
import { IBlogItem } from '../interfaces/blog';

const styled = {
  progress: css`
    poposition: absolute !important;
    top: -15px;
    left: 0;
    z-index: 9999;
  `,
  container: css`
    flex: 1;
    display: flex;
    min-height: 10px;
  `,
  pwa: css`
    position: fixed;
    width: 3rem;
    cursor: pointer;
    right: 1rem;
    bottom: 10rem;
    z-index: 999;
    display: none;
  `,
  share: css`
    width: 3rem;
    position: fixed;
    right: 1rem;
    bottom: 7rem;
    cursor: pointer;
    z-index: 999;
    border-radius: 50%;
  `,
  robot: css`
    width: 3rem;
    position: fixed;
    right: 1rem;
    bottom: 4rem;
    cursor: pointer;
    z-index: 999;
    border-radius: 50%;
  `,
};

const _isMobile = isMobile();
const App: FC = () => {
  const [progress, setProgress] = useState<number>(0);
  const [tip, setTip] = useState<string>('');
  const { height, createMarguee } = useMarqueeText(tip);
  const [showChatbot, setShowChatbot] = useState<boolean>(false);
  const [blog, setBlog] = useState<IBlogItem>();

  useEffect(() => {
    // beforeinstallprompt 事件：
    // 谷歌浏览器不支持这个事件，无法显示“安装到主屏幕”的提示。
    // 安装 PWA 的功能仅在 Safari 中可用，其他浏览器只能运行，但无法提供安装选项。
    // 移动端暂不支持pwa提示
    beforeInsall('install_btn');

    (async function () {
      const message = await getLastedNotice();
      setTip(message);
    })();

    // 创建一个 PerformanceObserver 对象
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries() as PerformanceResourceTiming[];

      let totalBytes = 0;
      let loadedBytes = 0;

      // 遍历资源条目
      for (const entry of entries) {
        // 获取资源的总大小和已加载大小
        totalBytes += entry.transferSize;
        loadedBytes += entry.encodedBodySize || entry.decodedBodySize;
      }
    });

    // 开始监听资源条目
    observer.observe({ entryTypes: ['resource'] });

    // 获取页面加载过的资源
    const resources = window.performance.getEntriesByType('resource') as PerformanceResourceTiming[];

    let totalBytes = 0;
    let loadedBytes = 0;

    // 遍历资源条目
    for (const resource of resources) {
      // 获取资源的总大小和已加载大小
      totalBytes += resource.transferSize;
      loadedBytes += resource.encodedBodySize || resource.decodedBodySize;
    }

    setProgress(Math.max(100, totalBytes === 100 ? 1 : (loadedBytes / totalBytes) * 100));

    return () => {
      // 停止监听资源条目
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const slider = document.getElementById('slider');
    const content = document.getElementById('content');
    if (slider) {
      slider.style.paddingTop = `${height}px`;
    }
    if (content) {
      content.style.paddingTop = `${height}px`;
    }
  }, [height]);

  const copyCurBlogUrl = () => {
    const url = window.location.href;
    copy('.urlCopy', url, '当前博客地址已复制', '复制失败');
  };

  const openChatbot = () => {
    setShowChatbot(!showChatbot);
  };

  return (
    <Suspense
      fallback={
        <Progress
          className={styled.progress}
          status="active"
          size="small"
          strokeLinecap="butt"
          percent={progress}
          showInfo={false}
        />
      }
    >
      {/* 头部区域 */}
      <Header postBlog={_isMobile ? (blog: IBlogItem) => setBlog(blog) : null} />
      {/* 跑马灯 */}
      {createMarguee()}
      {/* 内容区域 */}
      <div className={styled.container}>
        {!_isMobile && <Slider postBlog={(blog: IBlogItem) => setBlog(blog)} />}
        <Contet receiveBlog={blog!} />
      </div>
      {/* 侧边功能区域 */}
      <Fragment>
        {!_isMobile && (
          <Tooltip placement="leftTop" title="安装APP">
            <img
              id="install_btn"
              className={styled.pwa}
              src="https://www.yanquankun.cn/cdn/blog/pwa-download.png"
              alt=""
            />
          </Tooltip>
        )}
        <Tooltip placement="leftTop" title="分享">
          <img
            onClick={copyCurBlogUrl}
            className={cx('urlCopy', styled.share)}
            src="https://www.yanquankun.cn/cdn/blog/share-blog.png"
            alt="share animate"
          />
        </Tooltip>
        <Tooltip placement="leftTop" title="在线客服">
          <img
            onClick={openChatbot}
            className={cx('chatbot', styled.robot)}
            src="https://www.yanquankun.cn/cdn/blog/service-icon.png"
            alt="chatbot robot"
          />
        </Tooltip>
        {/* 聊天机器人 */}
        {showChatbot && <ChatBot onClose={() => setShowChatbot(false)} />}
      </Fragment>
    </Suspense>
  );
};

export default App;
