// Sube la versión al cambiar cualquier archivo para que el iPad coja lo nuevo.
const V = 'cuadernos-v17';
const FILES = [
 "./",
 "index.html",
 "manifest.json",
 "icon.png",
 "fondo.webp",
 "sonidos/pasar-hoja.wav",
 "stickers/caracol.webp",
 "stickers/carta.webp",
 "stickers/cesta.webp",
 "stickers/corazon-lesbico.webp",
 "stickers/libros.webp",
 "stickers/mariposa.webp",
 "stickers/ramo.webp",
 "stickers/rana-dormida.webp",
 "stickers/rana-estudia.webp",
 "stickers/rana-flores.webp",
 "stickers/rana-fresa.webp",
 "stickers/rana-lectora.webp",
 "stickers/rana-seta.webp",
 "stickers/rana-te.webp",
 "stickers/rana.webp",
 "stickers/ranas-abrazo.webp",
 "stickers/setas.webp",
 "stickers/venus.webp"
];
// cache: 'reload' para no guardar una copia vieja del navegador; skipWaiting para no esperar a que iOS cierre la app.
self.addEventListener('install', e => { self.skipWaiting(); e.waitUntil(caches.open(V).then(c => c.addAll(FILES.map(f => new Request(f, { cache: 'reload' }))))); });
self.addEventListener('activate', e => e.waitUntil(
  caches.keys().then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k)))).then(() => self.clients.claim())
));
// La página, primero de internet (así siempre está al día); sin conexión, la guardada. Lo demás, de la caché.
self.addEventListener('fetch', e => {
  if (e.request.mode === 'navigate') return e.respondWith(
    fetch(e.request, { cache: 'no-store' }).then(r => { const c = r.clone(); caches.open(V).then(k => k.put('./', c)); return r; })
      .catch(() => caches.match('./'))
  );
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
