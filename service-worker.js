// A list of local resources we always want to be cached.
const CACHEABLES = "TwentyFour"
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/styles.css',
  '/global.css',
  '/home.css',
  '/app.js',
  '/resources/routine.png',
  '/resources/teachers.png',
];

this.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(CACHEABLES).then(cache => {
      cache.addAll(PRECACHE_URLS)
    })
  )
})

this.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request)
    })
  )
})