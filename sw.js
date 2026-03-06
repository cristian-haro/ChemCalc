// ============================================================
//  ChemCalc Pro — Service Worker
//  Estrategia: Cache First para assets estáticos
//  Funciona offline después de la primera carga
// ============================================================

const CACHE_NAME = 'chemcalc-v1';

// Archivos a cachear en la instalación
const ASSETS = [
    './',
    './index.html',
    './styles.css',
    './app.js',
    './manifest.json',
    './icon-192.png',
    './icon-512.png',
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap',
];

// Instalación: pre-cachear todos los assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            // Para Google Fonts usamos addAll con manejo de errores
            return cache.addAll(ASSETS).catch(() => {
                // Si falla Google Fonts (sin conexión en primera carga) continuamos igualmente
                return cache.addAll(ASSETS.filter(url => !url.includes('googleapis')));
            });
        })
    );
    // Activar inmediatamente sin esperar a que se cierre la pestaña
    self.skipWaiting();
});

// Activación: limpiar caches antiguas
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(
                keys
                    .filter((key) => key !== CACHE_NAME)
                    .map((key) => caches.delete(key))
            )
        )
    );
    self.clients.claim();
});

// Fetch: Cache First → si no está en caché, busca en red y guarda
self.addEventListener('fetch', (event) => {
    // Solo interceptar peticiones GET
    if (event.request.method !== 'GET') return;

    // No interceptar peticiones a otras extensiones del navegador
    if (!event.request.url.startsWith('http')) return;

    event.respondWith(
        caches.match(event.request).then((cached) => {
            if (cached) return cached;

            return fetch(event.request)
                .then((response) => {
                    // Cachear respuestas válidas
                    if (response && response.status === 200 && response.type !== 'opaque') {
                        const toCache = response.clone();
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(event.request, toCache);
                        });
                    }
                    return response;
                })
                .catch(() => {
                    // Sin conexión y sin caché: devolver página offline si existe
                    if (event.request.destination === 'document') {
                        return caches.match('./index.html');
                    }
                });
        })
    );
});
