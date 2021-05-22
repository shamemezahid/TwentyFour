// A list of local resources we always want to be cached.
const PRECACHE_URLS = [
  '/TwentyFour/',
  '/TwentyFour/index.html',
  '/TwentyFour/styles.css',
  '/TwentyFour/global.css',
  '/TwentyFour/home.css',
  '/TwentyFour/app.js',
  '/TwentyFour/resources/routine.png',
  '/TwentyFour/resources/teachers.png',
];

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open('v1').then(cache => {
      return cache.addAll(PRECACHE_URLS)
    })
  )
})

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request)
    })
  )
})