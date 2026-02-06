const CACHE_NAME = 'math-duel-v1';
const ASSETS = [
  './math_duel.html',
  '[https://cdn.tailwindcss.com](https://cdn.tailwindcss.com)',
  '[https://fonts.googleapis.com/css2?family=Comfortaa:wght@400;700&display=swap](https://fonts.googleapis.com/css2?family=Comfortaa:wght@400;700&display=swap)'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
