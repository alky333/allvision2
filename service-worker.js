self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('allvision-cache').then(cache => {
      return cache.addAll([
        './',
        './index.html',
        './style.css',
        './script.js',
        './datos.php',
        './favicon.ico',
        './manifest.json',
        './bootstrap.min.css',
        './bootstrap.bundle.min.js',
        './chart.umd.js'
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});