const CACHE = "dreamportal-v1";
const FILES = [
  "/", "/index.html", "/css/style.css",
  "/js/app.js", "/js/db.js", "/js/data.js", "/js/render.js", "/js/ui.js",
  "/manifest.json", "/icons/icon-192.png", "/icons/icon-512.png"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
});

self.addEventListener("fetch", e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
