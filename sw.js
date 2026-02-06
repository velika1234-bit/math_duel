const CACHE_NAME = 'math-duel-v2';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  '[https://cdn.tailwindcss.com](https://cdn.tailwindcss.com)'
];

// Инсталиране и кеширане
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// Активиране и изчистване на стар кеш
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

// Прихващане на заявки (задължително за PWA)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
