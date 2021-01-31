console.log('Hello from sw.js');

this.addEventListener('fetch', event => {
	// it can be empty if you just want to get rid of that error
});

// var cacheName = 'final-grade-calculator';
// var filesToCache = [
// 	'/',
// 	'/index.html',
// 	'/global.css',
// 	'/build/bundle.css',
// 	'/build/bundle.js',
// 	'/build/bundle.js.map'
// ];

// /* Start the service worker and cache all of the app's content */
// self.addEventListener('install', (e) => {
// 	e.waitUntil(
// 		caches.open(cacheName).then((cache) => {
// 			return cache.addAll(filesToCache);
// 		})
// 	);
// });

// /* Serve cached content when offline */
// self.addEventListener('fetch', (e) => {
// 	e.respondWith(
// 		caches.match(e.request).then((response) => {
// 			return response || fetch(e.request);
// 		})
// 	);
// });