/**
 * Service Worker for Shringaarika (CRA-built, served on GitHub Pages).
 *
 * Design goals:
 *  - Never precache content-hashed assets (their filenames change every build,
 *    so a hardcoded list would 404 and reject cache.addAll, breaking install).
 *  - Version the cache so a redeploy invalidates stale content instead of
 *    pinning users to an old app shell forever.
 *  - Use network-first for navigations so a new deploy is picked up immediately.
 */

// ---------------------------------------------------------------------------
// Cache versioning
//
// CACHE_VERSION is injected automatically at build time. The production build
// runs scripts/inject-sw-version.js after Vite, which replaces the
// 'ffcda026' placeholder below with a deterministic content hash derived
// from the built asset filenames — so the cache invalidates whenever the app's
// assets change, with no manual bump required.
//
// In `npm run dev` (unbuilt) the literal 'ffcda026' string is used as-is.
// That is harmless: it just becomes a stable cache-name suffix during local dev.
// ---------------------------------------------------------------------------
const CACHE_VERSION = 'ffcda026';
const STATIC_CACHE = `shringaarika-static-${CACHE_VERSION}`;
const DYNAMIC_CACHE = `shringaarika-dynamic-${CACHE_VERSION}`;

// The only assets safe to precache: a tiny, guaranteed-stable shell. These
// paths are NOT content-hashed, so they exist on every build.
const PRECACHE_SHELL = ['/', '/index.html', '/manifest.json'];

// ---------------------------------------------------------------------------
// Install: precache the stable shell, then take over immediately.
// ---------------------------------------------------------------------------
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => cache.addAll(PRECACHE_SHELL))
      .then(() => self.skipWaiting())
  );
});

// ---------------------------------------------------------------------------
// Activate: delete every cache that isn't part of the current version,
// then start controlling open clients.
// ---------------------------------------------------------------------------
const CURRENT_CACHES = [STATIC_CACHE, DYNAMIC_CACHE];

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames
            .filter((name) => !CURRENT_CACHES.includes(name))
            .map((name) => caches.delete(name))
        )
      )
      .then(() => self.clients.claim())
  );
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

// A response is cacheable only if it's a real, successful, same-origin(ish)
// response. Opaque (type === 'opaque') and error responses must not be cached.
function isCacheable(response) {
  return (
    response &&
    response.status === 200 &&
    (response.type === 'basic' || response.type === 'cors' || response.type === 'default')
  );
}

// Store a clone in the given cache without blocking the response.
function putInCache(cacheName, request, response) {
  if (!isCacheable(response)) {
    return;
  }
  const clone = response.clone();
  caches.open(cacheName).then((cache) => cache.put(request, clone));
}

// Treat a request as a navigation if the browser says so, or if the client
// explicitly accepts HTML (covers some navigation edge cases).
function isNavigationRequest(request) {
  return (
    request.mode === 'navigate' ||
    (request.headers.get('accept') || '').includes('text/html')
  );
}

// Content-hashed, immutable build assets (CRA emits /static/, Vite /assets/).
function isHashedStaticAsset(url) {
  return url.pathname.startsWith('/static/') || url.pathname.startsWith('/assets/');
}

// NETWORK-FIRST: fresh from network, fall back to cache when offline.
function networkFirst(request, cacheName, offlineFallback) {
  return fetch(request)
    .then((response) => {
      putInCache(cacheName, request, response);
      return response;
    })
    .catch(() =>
      caches.match(request).then((cached) => {
        if (cached) {
          return cached;
        }
        return offlineFallback ? caches.match(offlineFallback) : Response.error();
      })
    );
}

// CACHE-FIRST: serve cache if present, otherwise fetch and populate.
function cacheFirst(request, cacheName) {
  return caches.match(request).then((cached) => {
    if (cached) {
      return cached;
    }
    return fetch(request).then((response) => {
      putInCache(cacheName, request, response);
      return response;
    });
  });
}

// STALE-WHILE-REVALIDATE: serve cache immediately, refresh in the background.
function staleWhileRevalidate(request, cacheName) {
  return caches.match(request).then((cached) => {
    const networkFetch = fetch(request)
      .then((response) => {
        putInCache(cacheName, request, response);
        return response;
      })
      .catch(() => cached);
    return cached || networkFetch;
  });
}

// ---------------------------------------------------------------------------
// Fetch routing
// ---------------------------------------------------------------------------
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Only GET requests are cacheable; let everything else hit the network.
  if (request.method !== 'GET') {
    return;
  }

  const url = new URL(request.url);

  // 1. Navigations -> network-first (avoids the stale-app trap), fall back to
  //    the cached shell ('/') when offline.
  if (isNavigationRequest(request)) {
    event.respondWith(networkFirst(request, DYNAMIC_CACHE, '/'));
    return;
  }

  // 2. Hashed static assets -> cache-first (immutable; safe to serve forever).
  if (isHashedStaticAsset(url)) {
    event.respondWith(cacheFirst(request, STATIC_CACHE));
    return;
  }

  // 3. Images -> stale-while-revalidate (filenames are NOT hashed, so refresh
  //    in the background to pick up replacements).
  if (request.destination === 'image') {
    event.respondWith(staleWhileRevalidate(request, DYNAMIC_CACHE));
    return;
  }

  // 4. Everything else GET -> network-first for safety (prefer fresh data,
  //    fall back to cache when offline).
  event.respondWith(networkFirst(request, DYNAMIC_CACHE));
});
