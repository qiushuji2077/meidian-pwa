const CACHE = 'meidian-v6';
const CORE = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './images/mala.webp',
  './images/bbq.webp',
  './images/fried.webp',
  './images/burger.webp',
  './images/xiaomian.webp',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const u = new URL(e.request.url);
  if (u.origin !== location.origin) return;

  if (u.pathname.includes('/images/')) {
    e.respondWith(
      caches.match(e.request).then(hit => {
        if (hit) return hit;
        return fetch(e.request).then(r => {
          if (r.ok) {
            const cp = r.clone();
            caches.open(CACHE).then(c => c.put(e.request, cp));
          }
          return r;
        });
      })
    );
    return;
  }

  e.respondWith(
    fetch(e.request)
      .then(r => {
        const cp = r.clone();
        caches.open(CACHE).then(c => c.put(e.request, cp));
        return r;
      })
      .catch(() => caches.match(e.request))
  );
});

self.addEventListener('message', e => {
  const d = e.data || {};
  if (d.type !== 'notify-delivered') return;
  e.waitUntil(
    self.registration.showNotification('美点', {
      body: '您的订单已送达',
      icon: './icons/icon-192.png',
      badge: './icons/icon-192.png',
      tag: 'meidian-delivered-' + (d.orderId || ''),
      data: { url: './' },
    })
  );
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  const url = e.notification.data?.url || './';
  e.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
      const hit = list.find(c => 'focus' in c);
      if (hit) return hit.focus();
      return self.clients.openWindow(url);
    })
  );
});
