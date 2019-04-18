var CACHE_NAME =  'meindika-cache';
//nama cache yang digunakan harus unik dan berbeda 
//untuk memudahkan pencarian dan tidak redudansi

//variabel untuk mendaftarkan url yang akan dijadikan cache
//cache otomatis ditambahkan tanpa perlu menambahkan url, url dibawah 
//merupakan default
var urlsToCache =  [
  '.',
  'images/.',
  'index.html',
  'nav.html',
  'pages/about.html',
  'pages/home.html',
  'pages/contact.html',
  'pages/skill.html',
  'css/main.css',
  'css/materialize.css',
  'css/materialize.min.js'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
  //membuka cache yang akan diakses pada url
    caches.open(CACHE_NAME)
    .then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
  //mencocokan data yang berada dicache dengan data yang berada di server
    caches.match(event.request)
    .then(function(response) {
		//respon dari cache local
      return response || fetchAndCache(event.request);
    })
  );
});

//menangkap atau mengambil cache dari url
function fetchAndCache(url) {
  //berfungsi untuk mengambil url 
  return fetch(url)
  .then(function(response) {
    // Check if we received a valid response
	//jika respon tidak ok
    if (!response.ok) {
      //maka menampilkan pesan error 
	  throw Error(response.statusText);
    }
	//membuka cache dari cache yang dibuat yang baru dan kemudian direspon
    return caches.open(CACHE_NAME)
    .then(function(cache) {
      cache.put(url, response.clone());
	  //berfungsi untuk respon ke browser
      return response;
    });
  })
  .catch(function(error) {
    console.log('Request failed:', error);
    // You  could return a custom offline 404 page  here
  });
}
