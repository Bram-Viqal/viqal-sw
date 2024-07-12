const CACHE_NAME = 'viqal-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    'https://cdn.prod.website-files.com/654902ad9c3f74c1bb3812ae/js/webflow.c9d2bd03f.js',
    // Add other URLs to cache as needed
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
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
    );
});
