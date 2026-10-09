const CACHE_NAME = 'nexus-cache-v2';

// オフラインで保存するファイル一覧
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './IMG_3693.jpeg',
  './IMG_5462.jpeg'
];

// インストール時にキャッシュに保存
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// 古いキャッシュの削除
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// リクエスト時にキャッシュからファイルを返す
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
