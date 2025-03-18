const CACHE_NAME = 'blog-cache-v1';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        '/', // 首页
        '/offline/offline', // 备用的离线页面
        '/cdn/gongzhonghao-qrcode.jpg',
        '/cdn/mini-program-qrcode.png',
      ]);
    })
  );
  self.skipWaiting(); // 立即激活新的 Service Worker
});

self.addEventListener('fetch', (event) => {
  if (!event.request.url.startsWith('http')) {
    return;
  }

  if (event.request.method && event.request.method.toLowerCase() !== 'get') {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // 如果请求成功，检查响应是否有效
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        // 克隆响应并存入缓存
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return response;
      })
      .catch(() => {
        // **只有在 navigator.onLine 为 false 时才返回离线页面**
        if (!navigator.onLine && event.request.mode === 'navigate') {
          return caches.match('/offline/offline');
        }

        // 如果不是离线状态，尝试从缓存中获取资源
        return caches.match(event.request);
      })
  );
});

// 监听 activate 事件，清理旧缓存
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName); // 删除旧缓存
          }
        })
      );
    })
  );
  self.clients.claim(); // 立即控制所有页面
});
