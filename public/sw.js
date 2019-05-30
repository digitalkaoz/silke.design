/* eslint-env worker, serviceworker */

//import workbox from "@types/workbox-sw";

if (typeof workbox === "undefined") {
  importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.1.1/workbox-sw.js');
}

workbox.precaching.precacheAndRoute(self.__precacheManifest || []);

const cacheName = workbox.core.cacheNames.runtime;

const cacheFirst = (path) => {
  workbox.routing.registerRoute(
    path,
    new workbox.strategies.CacheFirst({
      cacheName,
      plugins: [
        new workbox.cacheableResponse.Plugin({ statuses: [200] })
      ]
    })
  );  
}

const networkFirst = (path) => {
  workbox.routing.registerRoute(
    path,
    new workbox.strategies.NetworkFirst({
      cacheName,
      plugins: [
        new workbox.cacheableResponse.Plugin({ statuses: [200] })
      ]
    })
  );  
}

cacheFirst(/img\/*/);
cacheFirst('/manifest.json');
cacheFirst('https://storage.googleapis.com/workbox-cdn/releases/4.0.0/workbox-window.prod.mjs');
cacheFirst(new RegExp('\\.png$'));
networkFirst(/\/$/);

/*
workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  new workbox.strategies.CacheFirst({
    cacheName: 'images',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  })
);
*/