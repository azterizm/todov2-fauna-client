/// <reference lib="webworker" />
/* eslint-disable no-restricted-globals */

// This service worker can be customized!
// See https://developers.google.com/web/tools/workbox/modules
// for the list of available Workbox modules, or add any other
// code you'd like.
// You can also remove this file if you'd prefer not to use a
// service worker, and the Workbox build step will be skipped.

import { BackgroundSyncPlugin } from 'workbox-background-sync';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { clientsClaim } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst, NetworkFirst, NetworkOnly, StaleWhileRevalidate } from 'workbox-strategies';

declare const self: ServiceWorkerGlobalScope;

clientsClaim();

precacheAndRoute(self.__WB_MANIFEST);

registerRoute(
  ({ request }) => request.mode === 'navigate',
  new NetworkFirst({
    cacheName: 'pages',
    plugins: [
      // Ensure that only requests that result in a 200 status are cached
      new CacheableResponsePlugin({
        statuses: [200],
      }),
    ],
  }),
);

registerRoute(
  'https://faunadb-server.herokuapp.com/',
  new StaleWhileRevalidate({
    cacheName: 'todos-fetch',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [200]
      })
    ]
  }),
  'GET'
)

const bgSyncAdd = new BackgroundSyncPlugin('add', {
  maxRetentionTime: 24 * 60
})
registerRoute(
  'https://faunadb-server.herokuapp.com/add',
  new NetworkOnly({ plugins: [bgSyncAdd] }),
  'POST'
)

registerRoute(
  ({ request }) =>
    request.destination === 'style' ||
    request.destination === 'script' ||
    request.destination === 'worker',
  new StaleWhileRevalidate({
    cacheName: 'assets',
    plugins: [
      // Ensure that only requests that result in a 200 status are cached
      new CacheableResponsePlugin({
        statuses: [200],
      }),
    ],
  }),
);

registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'images',
    plugins: [
      // Ensure that only requests that result in a 200 status are cached
      new CacheableResponsePlugin({
        statuses: [200],
      }),
      // Don't cache more than 50 items, and expire them after 30 days
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 60 * 60 * 24 * 30, // 30 Days
      }),
    ],
  }),
);


const fetchAndCacheTodos = async () => {
  const url = 'https://faunadb-server.herokuapp.com/'
  const response = await fetch(url)
  const cache = await caches.open('todos-fetch')
  cache.put('/', response)
}

self.addEventListener('periodicSync', (e: any) => {
  if (e.tag === 'todos') {
    console.log('Fetching data in the background!')
    e.waitUntil(fetchAndCacheTodos())
  }
})
