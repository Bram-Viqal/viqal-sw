module.exports = (req, res) => {
  res.setHeader('Content-Type', 'application/javascript');
  res.send(`
    console.log('Service Worker Loaded');
    const CACHE_NAME = 'viqal-cache-v1';
    const urlsToCache = [
      '/',
      '/index.html',
      'https://cdn.prod.website-files.com/654902ad9c3f74c1bb3812ae/js/webflow.c9d2bd03f.js',
      // Add other URLs to cache as needed
    ];

    self.addEventListener('install', event => {
      console.log('Service Worker: Install Event');
      event.waitUntil(
        caches.open(CACHE_NAME)
          .then(cache => {
            console.log('Service Worker: Caching URLs');
            return cache.addAll(urlsToCache);
          })
      );
    });

    self.addEventListener('fetch', event => {
      console.log('Service Worker: Fetch Event');
      event.respondWith(
        caches.match(event.request)
          .then(response => {
            console.log('Service Worker: Fetch Response');
            return response || fetch(event.request);
          })
      );
    });
  `);
};
