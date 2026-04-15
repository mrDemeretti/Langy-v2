const CACHE_NAME = 'langy-ai-v1.1';
const urlsToCache = [
  './',
  './index.html',
  './styles/variables.css',
  './styles/global.css',
  './styles/components.css',
  './styles/animations.css',
  './styles/screens.css',
  './src/main.js',
  './src/utils/ai.js',
  './src/utils/animations.js',
  './src/utils/db.js',
  './src/utils/router.js',
  './src/utils/state.js',
  './src/utils/tutor.js',
  './src/utils/widgets.js',
  './src/data/curriculum.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        return response || fetch(event.request).then(fetchRes => {
          return caches.open(CACHE_NAME).then(cache => {
            // Cache new responses (except API calls)
            if (!event.request.url.includes('openrouter.ai')) {
               cache.put(event.request, fetchRes.clone());
            }
            return fetchRes;
          });
        });
      }).catch(() => {
        // If offline and not in cache, fallback to index
        if (event.request.headers.get('accept').includes('text/html')) {
          return caches.match('./index.html');
        }
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
