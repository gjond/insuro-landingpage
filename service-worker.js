const CACHE_NAME = "insuro-cache-v2"; // Ändere den Cache-Namen für ein Update
const urlsToCache = [
    "/",
    "/index.html",
    "/style.css",
    "/script.js",
    "/manifest.json",
    "/icon-192.png",
    "/icon-512.png"
];

// Installiere den Service Worker und speichere die wichtigen Dateien im Cache
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("✅ Dateien werden gecacht...");
            return cache.addAll(urlsToCache);
        })
    );
});

// Aktivierung: Lösche alten Cache automatisch, wenn es eine neue Version gibt
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((cacheName) => cacheName !== CACHE_NAME)
                    .map((cacheName) => caches.delete(cacheName))
            );
        })
    );
    console.log("✅ Neuer Service Worker aktiviert!");
});

// Netzwerk-Anfrage abfangen: Immer zuerst von der aktuellen Version laden
self.addEventListener("fetch", (event) => {
    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
    );
});
