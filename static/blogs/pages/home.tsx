import { FC, Suspense, useEffect, useState } from 'react';
import Header from '../components/header';
import Slider from '../components/slider';
import Contet from '../components/content';
import { Progress } from 'antd';
import { css } from '@emotion/css';
import useMarqueeText from '~shared/components/marquee';
import { getLastedNotice } from '~shared/apis/static';

const styled = {
  progress: css`
    poposition: absolute !important;
    top: -15px;
    left: 0;
    z-index: 9999;
  `,
  container: css`
    flex: 1;
  `,
};

const App: FC = () => {
  const [progress, setProgress] = useState<number>(0);
  const [tip, setTip] = useState<string>('');
  const { height, createMarguee } = useMarqueeText(tip);

  useEffect(() => {
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
      <Header />
      {/* 跑马灯 */}
      {createMarguee()}
      {/* 内容区域 */}
      <div className={styled.container}>
        <Slider />
        <Contet />
      </div>
    </Suspense>
  );
};

export default App;
