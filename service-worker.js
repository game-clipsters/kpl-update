const CACHE_NAME = "kpl-season1-cache-v1";

const urlsToCache = [
  "index.html",
  "schedule.html",
  "points.html",
  "teams.html",
  "rules.html",
  "results.html",
  "contact.html",
  "poster.jpg",
  "manifest.json",
  "service-worker.js",
  "icon-192.png",
  "icon-512.png"
];

// INSTALL EVENT
self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

// FETCH EVENT
self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});

// ACTIVATE EVENT (Old Cache Delete)
self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cache) {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});