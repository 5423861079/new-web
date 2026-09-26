self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('fetch', (e) => {
  // キャッシュ処理などが必要な場合はここに記述
});
