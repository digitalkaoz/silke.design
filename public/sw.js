/* eslint-env worker, serviceworker */

//import workbox from "@types/workbox-sw";

workbox.precaching.precacheAndRoute(self.__precacheManifest);

const cacheFirst = (path) => {
  workbox.routing.registerRoute(
    path,
    new workbox.strategies.CacheFirst({
      cacheName: "images-v1",
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
      cacheName: "html-v1",
      plugins: [
        new workbox.cacheableResponse.Plugin({ statuses: [200] })
      ]
    })
  );  
}

cacheFirst(/img\/*/);
cacheFirst('/manifest.json');
cacheFirst('/register-service-worker.js');
cacheFirst(new RegExp('\\.png$'));
networkFirst(/\/$/);
