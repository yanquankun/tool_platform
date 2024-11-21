import { isMobile, isSafari } from '~shared/utils/util';

let deferredPrompt: any | null;
const _isMobile = isMobile();

export const beforeInsall = (installBtnId: string) => {
  if (typeof installBtnId !== 'string') console.error('installBtnId is required and must be a string type');

  if (_isMobile) return console.info('PWA is not supported on mobile devices');

  const isPWAInstalled = localStorage.getItem('isPWAInstalled');
  if (isPWAInstalled === 'true') return console.info('PWA is already installed');

  window.addEventListener('beforeinstallprompt', (event) => {
    // 阻止浏览器自动显示安装横幅
    event.preventDefault();

    deferredPrompt = event;

    const installButton = document.getElementById(installBtnId);
    installButton!.style.display = 'block';

    installButton!.addEventListener('click', () => {
      installButton!.style.display = 'none';
      deferredPrompt!.prompt(); // 显示安装横幅

      deferredPrompt!.userChoice.then((choiceResult: { outcome: string }) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('用户接受了安装');
        } else {
          console.log('用户拒绝了安装');
        }
        deferredPrompt = null;
      });
    });
  });
};
