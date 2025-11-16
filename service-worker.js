const CACHE = "dreamportal-v1";
const FILES = ["/", "/index.html", "/css/style.css", "/js/main.js", "/manifest.json", "/icons/192.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
});

self.addEventListener("fetch", e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
