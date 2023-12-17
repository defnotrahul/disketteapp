'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"favicon.ico": "730af02f007dadbbc6d0f3a5dfa15603",
"icons/ms-icon-70x70.png": "a17038dc226892d86cbcd05565b54133",
"icons/favicon.ico": "78db1593752c5a874e08e48246f1b219",
"icons/apple-icon-144x144.png": "8360bded4953d3c8044fb0fd122079b3",
"icons/apple-icon-76x76.png": "95cd7538826d36b7ec37cd87154a867d",
"icons/ms-icon-150x150.png": "db700ff1d544f1867e0783a6a4ba53f1",
"icons/android-icon-48x48.png": "767c07b950d20dc5cae13972d1ddbd42",
"icons/apple-icon.png": "081adc1e4928aef9b65384a38407f16a",
"icons/apple-icon-precomposed.png": "081adc1e4928aef9b65384a38407f16a",
"icons/android-icon-36x36.png": "80abce0c89642102ebc5971e2d1b5ba8",
"icons/manifest.json": "b58fcfa7628c9205cb11a1b2c3e8f99a",
"icons/apple-icon-152x152.png": "7691feb7fdcfa4293e834499a98da7ba",
"icons/apple-icon-72x72.png": "ffb880a841c9b87b78a134d03a67c84b",
"icons/favicon-96x96.png": "df9f3ff9b0ac7befa5ea788dbc195991",
"icons/apple-icon-114x114.png": "8536819bfc1fda09d503e8f13ca711c3",
"icons/apple-icon-60x60.png": "9e16d8341ed8889030d5f7c0a6c474a0",
"icons/apple-icon-180x180.png": "362babcc554c7c93d89f6ec8029d9521",
"icons/android-icon-96x96.png": "df9f3ff9b0ac7befa5ea788dbc195991",
"icons/android-icon-192x192.png": "ba45a9b939d925fc121633b410cffedd",
"icons/browserconfig.xml": "653d077300a12f09a69caeea7a8947f8",
"icons/ms-icon-144x144.png": "8360bded4953d3c8044fb0fd122079b3",
"icons/ms-icon-310x310.png": "c5a6f8b59d2ec88e18ca7134431b9038",
"icons/apple-icon-57x57.png": "3beed4d80456eedc6534a856060ea93d",
"icons/favicon-16x16.png": "c747c15fe2a804f4a6ea61fe22181afb",
"icons/apple-icon-120x120.png": "328c01ffd6b64096c96fb67b2a274bb7",
"icons/favicon-32x32.png": "e09fbbfee2e2bf3a683e52377bfd1662",
"icons/android-icon-72x72.png": "ffb880a841c9b87b78a134d03a67c84b",
"icons/android-icon-144x144.png": "8360bded4953d3c8044fb0fd122079b3",
"index.html": "617022a2f9ee8c9547a001061fe6f692",
"/": "617022a2f9ee8c9547a001061fe6f692",
"main.dart.js": "7321e600b5932f6ebccbe77dbe0cd889",
"manifest.json": "96be909ed45e575ce7064cd6311f5765",
"version.json": "9590c8af2c25f77b719dad67687bc5f2",
"assets/fonts/MaterialIcons-Regular.otf": "f86938fff85e4f8d09b26543b6d4ebc2",
"assets/AssetManifest.bin": "8595e1161f8929324558970e9fdb383f",
"assets/AssetManifest.json": "63121a1c0376b59a7be06231328f338c",
"assets/NOTICES": "fa7459ac565c52955983feaa865d7067",
"assets/shaders/ink_sparkle.frag": "4096b5150bac93c41cbc9b45276bd90f",
"assets/assets/lottie/rocket.json": "eab441d366e30b383096e702a538d0f8",
"assets/assets/images/icon.png": "a69319e43e4c20c437f0a946fb04b950",
"assets/assets/images/favicon.png": "730af02f007dadbbc6d0f3a5dfa15603",
"assets/FontManifest.json": "5a32d4310a6f5d9a6b651e75ba0d7372",
"assets/AssetManifest.bin.json": "afd32a8ef27d236aa6c8ecd1ff6ae808",
"assets/packages/font_awesome_flutter/lib/fonts/fa-solid-900.ttf": "658b490c9da97710b01bd0f8825fce94",
"assets/packages/font_awesome_flutter/lib/fonts/fa-brands-400.ttf": "d7791ef376c159f302b8ad90a748d2ab",
"assets/packages/font_awesome_flutter/lib/fonts/fa-regular-400.ttf": "5070443340d1d8cceb516d02c3d6dee7",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "89ed8f4e49bcdfc0b5bfc9b24591e347",
"canvaskit/skwasm.js": "87063acf45c5e1ab9565dcf06b0c18b8",
"canvaskit/skwasm.worker.js": "bfb704a6c714a75da9ef320991e88b03",
"canvaskit/chromium/canvaskit.wasm": "143af6ff368f9cd21c863bfa4274c406",
"canvaskit/chromium/canvaskit.js": "0ae8bbcc58155679458a0f7a00f66873",
"canvaskit/canvaskit.wasm": "73584c1a3367e3eaf757647a8f5c5989",
"canvaskit/skwasm.wasm": "2fc47c0a0c3c7af8542b601634fe9674",
"canvaskit/canvaskit.js": "eb8797020acdbdf96a12fb0405582c1b",
"flutter.js": "7d69e653079438abfbb24b82a655b0a4"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
