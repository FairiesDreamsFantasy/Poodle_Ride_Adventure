// Service Worker for Poodle Ride Adventure
// Handles strategic offline caching of predictable assets

const CACHE_NAME = 'poodle-ride-cache-v1';
const ASSETS_TO_CACHE = [
  '/Poodle_Ride_Adventure/',
  '/Poodle_Ride_Adventure/index.html',
  '/Poodle_Ride_Adventure/Assets/CSS/Game_Style.css',
  '/Poodle_Ride_Adventure/Assets/Game_Workings/index.js',
  '/Poodle_Ride_Adventure/Assets/Images/AI_Gold_Poodle.png',
  '/Poodle_Ride_Adventure/Assets/Images/AI_Silver_Poodle.png',
  '/Poodle_Ride_Adventure/Assets/Images/AI_Bronze_Poodle.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Pre-caching core offline assets stably.');
      return cache.addAll(ASSETS_TO_CACHE).catch(err => {
        console.warn('[Service Worker] Pre-cache warning (some files might be generated during active routing):', err);
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          console.log('[Service Worker] Cleaning obsolete cache key:', key);
          return caches.delete(key);
        }
      }));
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request);
    })
  );
});
