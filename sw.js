const CACHE_NAME = 'langy-ai-v11';
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
  './src/data/curriculum.js',
  './src/screens/calendar.js'
];

// Install: pre-cache critical assets & skip waiting
self.addEventListener('install', event => {
  self.skipWaiting(); // Activate new SW immediately
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Activate: purge ALL old caches & claim clients immediately
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    }).then(() => self.clients.claim()) // Take over all tabs immediately
  );
});

// Fetch: NETWORK FIRST strategy
// Always try the network; fall back to cache only if offline
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  // Skip API calls entirely
  if (event.request.url.includes('openrouter.ai')) return;

  event.respondWith(
    fetch(event.request)
      .then(networkRes => {
        // Got a fresh response — update the cache
        const clone = networkRes.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, clone);
        });
        return networkRes;
      })
      .catch(() => {
        // Offline — serve from cache
        return caches.match(event.request).then(cachedRes => {
          if (cachedRes) return cachedRes;
          // If HTML request, fallback to index
          if (event.request.headers.get('accept')?.includes('text/html')) {
            return caches.match('./index.html');
          }
        });
      })
  );
});
