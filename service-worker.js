// A list of local resources we always want to be cached.
const CACHE_NAME = 'v1';

const PRECACHE_URLS = [
  '/TwentyFour/',
  '/TwentyFour/index.html',
  '/TwentyFour/styles.css',
  '/TwentyFour/global.css',
  '/TwentyFour/home.css',
  '/TwentyFour/app.js',
  '/TwentyFour/resources/routine.png',
  '/TwentyFour/resources/teachers.png'
];

// const PRECACHE_URLS = [
//   '/',
//   '/index.html',
//   '/styles.css',
//   '/global.css',
//   '/home.css',
//   '/app.js',
//   '/resources/routine.png',
//   '/resources/teachers.png'
// ];

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(PRECACHE_URLS);
    })
  )
})

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request);
    })
  )
})

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }

        return fetch(event.request).then(
          function(response) {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            // IMPORTANT: Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have two streams.
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
    );
});