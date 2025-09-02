const CACHE_NAME = 'pwa-tool-suite-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/app.js',
    '/manifest.json'
    // Add tool URLs here as they are created
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});