//sw.js, sacado de los apuntes

importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

console.log(`Workbox ${workbox ? 'sí' : 'no'} está funcionando`);

workbox.precaching.precacheAndRoute([
  {url: '/index.html', revision: null },
  {url: '/js/app.js', revision: null},
  //{url: '/images/192icon.jpg', revision: null},
  //{url: '/images/512icon.png', revision: null},
]);