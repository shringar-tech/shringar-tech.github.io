// Self-destructing service worker.
//
// The site is a static storefront served by a CDN (GitHub Pages / Fastly), which is
// already fast and always fresh. A caching service worker was serving stale/broken
// content to returning visitors (old HTML referencing old asset hashes -> blank images,
// outdated UI). This worker removes any previously installed service worker and deletes
// all of its caches, so every device falls back to normal network loading.
//
// It is intentionally NOT registered by the app anymore (see index.html). Existing
// clients that still have the old worker will fetch this file on their next visit,
// which unregisters it and reloads them onto fresh content.

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      // Delete every cache this origin created.
      try {
        const keys = await caches.keys();
        await Promise.all(keys.map((key) => caches.delete(key)));
      } catch (e) {
        /* ignore */
      }
      // Remove this worker.
      try {
        await self.registration.unregister();
      } catch (e) {
        /* ignore */
      }
      // Reload open tabs so they load fresh from the network (no worker).
      try {
        const clients = await self.clients.matchAll({ type: 'window' });
        clients.forEach((client) => client.navigate(client.url));
      } catch (e) {
        /* ignore */
      }
    })()
  );
});

// While briefly active, never serve from cache — pass everything straight to the network.
self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request).catch(() => Response.error()));
});
