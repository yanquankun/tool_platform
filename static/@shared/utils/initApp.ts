import { createRoot } from 'react-dom/client';

const app = document.getElementById('app');

const getCacheProCompModule = function () {
  let ProCompModule;
  if (!window.ProCompModule) {
    ProCompModule = require('@ant-design/pro-components');
    window.ProCompModule = ProCompModule;
    return ProCompModule;
  } else {
    return window.ProCompModule;
  }
};

/**
 * @description 初始化react app 加载未完成时展示骨架屏
 * @param
 *  rootDom react root dom element
 *  type ProSkeleton 类型
 */
const initApp = (rootDom: React.ReactNode, type: 'list' | 'result' | 'descriptions' = 'list') => {
  const root = createRoot(document.getElementById('app') as HTMLElement);
  const timer = setInterval(() => {
    if (app?.children.length) {
      clearInterval(timer);
      root.render(rootDom);
    } else {
      const loadTip = document.getElementById('loadTip') as HTMLElement;
      const body = document.body;
      body.removeChild(loadTip);
      root.render(
        new (getCacheProCompModule().ProSkeleton)({
          type,
        })
      );
    }
  }, 5);
};

export default initApp;
