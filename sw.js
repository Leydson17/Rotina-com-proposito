const CACHE = 'rotina-v1';
const FILES = ['/', '/index.html', '/manifest.json'];

// Install & cache
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
  self.skipWaiting();
});

// Activate & clean old caches
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

// Fetch from cache first
self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});

// Push notification received
self.addEventListener('push', e => {
  const data = e.data ? e.data.json() : { title: 'Rotina', body: 'Hora do seu compromisso!' };
  e.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: '/icon-192.png',
      badge: '/icon-192.png',
      vibrate: [200, 100, 200],
      tag: data.tag || 'rotina',
      renotify: true,
      requireInteraction: false,
    })
  );
});

// Notification click — opens the app
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(clients.openWindow('/'));
});

// Scheduled alarms via setTimeout (for local notifications fallback)
self.addEventListener('message', e => {
  if (e.data && e.data.type === 'SCHEDULE_ALARM') {
    const { delay, title, body, tag } = e.data;
    setTimeout(() => {
      self.registration.showNotification(title, {
        body,
        icon: '/icon-192.png',
        badge: '/icon-192.png',
        vibrate: [200, 100, 200],
        tag,
        renotify: true,
      });
    }, delay);
  }
});
