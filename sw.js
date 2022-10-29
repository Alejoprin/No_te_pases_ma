const CACHE_NAME = "v1_No_te_pases_ma",
  urlsToCache = [
    "./",
    "https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300;500;700&display=swap",
    "./css/styles.css",
    "./articles_exempt_IVA.js",
    "./js/add_dolar_bcv_and_budget.js",
    "./js/budget_limit.js",
    "./js/calculating_totals.js",
    "./js/cancel_click_on_background.js",
    "./js/delete_article.js",
    "./js/dragNDrop_product.js",
    "./js/dragNDrop_product_mobile.js",
    "./js/generate_article.js",
    "./js/products_to_buy.js",
    "./js/search_article.js",
    "./js/search_product_toBuy.js",
    "./index.js",
    "./assets/favicon.ico",
    "./assets/android-chrome-192x192.png",
  ];

//durante la fase de instalación, generalmente se almacena en caché los activos estáticos
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache).then(() => self.skipWaiting());
      })
      .catch((err) => console.log("Falló registro de cache", err))
  );
});

self.addEventListener("activate", (e) => {
  const cacheWhitelist = [CACHE_NAME];

  e.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      if (res) {
        return res;
      }
      return fetch(e.request);
    })
  );
});
