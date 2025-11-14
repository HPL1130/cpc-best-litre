// service-worker.js

// 緩存的名稱 - 再次升級版本號
const CACHE_NAME = 'changhua-food-cache-v18'; 

// 需要預先快取的所有檔案列表 (清單)
// 確保路徑和檔名與您 GitHub 上的檔案完全一致
const urlsToCache = [
  '/',                     
  '/index.html',           
  '/manifest.json',        
  
  // *** PWA ICON 檔案 - 必須快取 ***
  '/icons/icon-192.png',        
  '/icons/icon-512.png',        
  '/icons/apple-touch-icon.png', 
  
  // ... (其他靜態資源, 例如 /data.json)
];

// =======================================================
// 1. 安裝事件：執行預快取 (Pre-caching) 並強制立即激活
self.addEventListener('install', function(event) {
  self.skipWaiting(); 
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        // PWA 安裝成功的關鍵步驟：將核心資源存入快取
        return cache.addAll(urlsToCache); 
      })
  );
});

// =======================================================
// 2. 激活事件：清除舊的快取並控制頁面
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        // 清理舊版本的快取
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('changhua-food-cache-') &&
                 cacheName !== CACHE_NAME;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    }).then(() => self.clients.claim()) 
  );
});

// =======================================================
// 3. 請求事件：快取優先策略
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
