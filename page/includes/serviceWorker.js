const CACHE_NAME = 'blog-cache-v1';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(['/', '/offline/offline', '/cdn/gongzhonghao-qrcode.jpg', '/cdn/mini-program-qrcode.png']);
    })
  );
  /** 立即激活新的 Service Worker */
  self.skipWaiting();
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
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return response;
      })
      .catch(() => {
        /** 只有在 navigator.onLine 为 false 时才返回离线页面 */
        if (!navigator.onLine && event.request.mode === 'navigate') {
          return caches.match('/offline/offline');
        }

        return caches.match(event.request);
      })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});
