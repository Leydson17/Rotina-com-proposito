// Bump CACHE_VERSION on every deploy to invalidate the old cache
const CACHE_VERSION = 'v14';
const CACHE = `rotina-${CACHE_VERSION}`;
const BASE = self.location.pathname.replace('/sw.js', '');
const FILES = [
  BASE + '/',
  BASE + '/index.html',
  BASE + '/manifest.json',
  BASE + '/icon-192.png',
  BASE + '/icon-512.png',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  // Network-first for HTML so new deploys are always served fresh
  if (e.request.destination === 'document') {
    e.respondWith(
      fetch(e.request)
        .then(res => {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
          return res;
        })
        .catch(() => caches.match(e.request))
    );
  } else {
    e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
  }
});

self.addEventListener('message', e => {
  if (e.data && e.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  if (e.data && e.data.type === 'SCHEDULE_ALARM') {
    const { delay, title, body, tag } = e.data;
    setTimeout(() => {
      self.registration.showNotification(title, {
        body,
        icon: BASE + '/icon-192.png',
        badge: BASE + '/icon-192.png',
        vibrate: [200, 100, 200],
        tag,
        renotify: true,
      });
    }, delay);
  }
});

self.addEventListener('push', e => {
  const data = e.data ? e.data.json() : { title: 'Rotina', body: 'Hora do seu compromisso!' };
  e.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: BASE + '/icon-192.png',
      badge: BASE + '/icon-192.png',
      vibrate: [200, 100, 200],
      tag: data.tag || 'rotina',
      renotify: true,
      requireInteraction: false,
    })
  );
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(clients.openWindow(BASE + '/'));
});
