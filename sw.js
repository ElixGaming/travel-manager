const CACHE = 'travel-manager-shell-v2';

const CORE = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon.svg',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(CORE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys =>
        Promise.all(
          keys
            .filter(key => key !== CACHE)
            .map(key => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  const url = new URL(req.url);

  if (req.method !== 'GET' || url.origin !== self.location.origin) {
    return;
  }

  // Catalogue et PDF : vérifier la version en ligne en priorité.
  if (url.pathname.includes('/charts/')) {
    event.respondWith(
      fetch(req)
        .then(response => {
          if (response && response.ok) {
            const copy = response.clone();

            caches.open(CACHE).then(cache => {
              cache.put(req, copy);
            });
          }

          return response;
        })
        .catch(() =>
          caches.match(req).then(cached =>
            cached || new Response(
              'Document indisponible hors connexion.',
              {
                status: 503,
                headers: {
                  'Content-Type': 'text/plain; charset=utf-8'
                }
              }
            )
          )
        )
    );

    return;
  }

  // Autres ressources : cache d'abord, puis réseau.
  event.respondWith(
    caches.match(req).then(cached =>
      cached || fetch(req)
        .then(response => {
          if (response && response.ok) {
            const copy = response.clone();

            caches.open(CACHE).then(cache => {
              cache.put(req, copy);
            });
          }

          return response;
        })
        .catch(() => caches.match('./index.html'))
    )
  );
});
