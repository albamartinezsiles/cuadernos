// Sube la versión al cambiar cualquier archivo para que el iPad coja lo nuevo.
const V = 'cuadernos-v12';
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
self.addEventListener('install', e => e.waitUntil(caches.open(V).then(c => c.addAll(FILES))));
self.addEventListener('activate', e => e.waitUntil(
  caches.keys().then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k))))
));
self.addEventListener('fetch', e => e.respondWith(
  caches.match(e.request).then(r => r || fetch(e.request))
));
