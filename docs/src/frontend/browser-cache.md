# 浏览器缓存机制

本文档整理浏览器缓存的基本概念与实战技巧，提升页面性能与用户体验。

## 缓存类型概览

### 浏览器缓存层级

| 缓存类型 | 存储位置 | 生命周期 | 容量大小 |
|---------|---------|---------|---------|
| Service Worker | 内存/磁盘 | 可编程控制 | 可配置 |
| Memory Cache | 内存 | 标签页关闭前 | 浏览器自动管理 |
| Disk Cache | 磁盘 | 可配置 | 可配置 |
| Push Cache | 内存 | 会话级别 | 较小 |

## HTTP 缓存

### 强缓存

#### Cache-Control

```nginx
# 表示缓存有效期为 31536000 秒（1年）
Cache-Control: max-age=31536000, immutable

# 其他常用指令
# public - 允许浏览器和代理服务器缓存
# private - 仅允许浏览器缓存
# no-cache - 每次使用缓存前必须与服务器验证
# no-store - 完全不缓存
# must-revalidate - 缓存过期后必须验证
```

#### Expires

```nginx
# 过期时间（GMT 格式）
Expires: Wed, 21 Oct 2026 07:28:00 GMT
```

::: tip 提示
`Cache-Control` 优先级高于 `Expires`，两者同时存在时以 `Cache-Control` 为准。
:::

### 协商缓存

#### Last-Modified 与 If-Modified-Since

```nginx
# 服务器响应
Last-Modified: Wed, 21 Oct 2026 07:28:00 GMT

# 浏览器再次请求
If-Modified-Since: Wed, 21 Oct 2026 07:28:00 GMT
```

#### ETag 与 If-None-Match

```nginx
# 服务器响应（文件内容的唯一标识）
ETag: "33a64df551425fcc55e4d42a148795d9f25f89d4"

# 浏览器再次请求
If-None-Match: "33a64df551425fcc55e4d42a148795d9f25f89d4"
```

::: tip 提示
ETag 优先级高于 Last-Modified，精度更高，能解决后者无法处理的问题（如文件在 1 秒内多次修改）。
:::

### 缓存决策流程

```
请求发起
    │
    ▼
是否存在强缓存？
    │
    ├─ 是 ── 缓存有效 ── 直接返回缓存
    │
    └─ 否 ── 发起请求 ── 是否存在协商缓存？
                    │
                    ├─ 是 ── 缓存是否新鲜？
                    │       │
                    │       ├─ 是 ── 返回 304，使用缓存
                    │       │
                    │       └─ 否 ── 返回新资源，更新缓存
                    │
                    └─ 否 ── 返回新资源
```

## Service Worker 缓存

### 基本使用

```js
// 注册 Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(reg => console.log('SW 注册成功', reg.scope))
    .catch(err => console.error('SW 注册失败', err));
}
```

### 缓存策略

```js
// sw.js - 缓存优先策略
const CACHE_NAME = 'my-cache-v1';
const urlsToCache = [
  '/',
  '/styles/main.css',
  '/scripts/main.js',
  '/images/logo.png'
];

// 安装阶段 - 预缓存资源
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('打开缓存');
        return cache.addAll(urlsToCache);
      })
  );
});

// 激活阶段 - 清理旧缓存
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('删除旧缓存:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// 请求拦截 - 根据策略返回
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // 缓存命中则返回缓存，否则发起网络请求
        return response || fetch(event.request);
      })
  );
});
```

### 常用缓存策略

| 策略名称 | 适用场景 | 说明 |
|---------|---------|-----|
| Cache First | 静态资源、版本化资源 | 先读缓存，缓存不存在再请求网络 |
| Network First | API 数据、实时性内容 | 优先网络请求，失败时使用缓存 |
| Stale-While-Revalidate | 读多写少的内容 | 立即返回缓存，同时更新缓存 |
| Network Only | 实时数据、认证内容 | 仅使用网络请求 |

```js
// Network First 策略
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // 网络成功，克隆响应并缓存
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseClone);
        });
        return response;
      })
      .catch(() => {
        // 网络失败，使用缓存
        return caches.match(event.request);
      })
  );
});

// Stale-While-Revalidate 策略
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(CACHE_NAME).then(cache => {
      return cache.match(event.request).then(cachedResponse => {
        // 发起网络请求更新缓存
        const fetchPromise = fetch(event.request).then(networkResponse => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
        // 立即返回缓存，同时异步更新
        return cachedResponse || fetchPromise;
      });
    })
  );
});
```

## IndexedDB 本地存储

### 基本操作

```js
// 打开数据库
const request = indexedDB.open('MyDatabase', 1);

request.onerror = () => console.error('数据库打开失败');

request.onsuccess = (event) => {
  const db = event.target.result;
  console.log('数据库打开成功');
};

request.onupgradeneeded = (event) => {
  const db = event.target.result;
  // 创建对象存储区
  if (!db.objectStoreNames.contains('users')) {
    const store = db.createObjectStore('users', { keyPath: 'id' });
    store.createIndex('name', 'name', { unique: false });
  }
};

// 添加数据
function addUser(db, user) {
  const transaction = db.transaction(['users'], 'readwrite');
  const store = transaction.objectStore('users');
  store.add(user);
}

// 读取数据
function getUser(db, id) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['users'], 'readonly');
    const store = transaction.objectStore('users');
    const request = store.get(id);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}
```

## 实际应用建议

### 缓存文件类型

```nginx
# HTML 文件 - 不缓存或短期缓存
Cache-Control: no-cache

# 静态资源（JS/CSS/图片）- 长期缓存 + 版本化
Cache-Control: max-age=31536000

# API 接口 - 根据数据特性决定
Cache-Control: no-cache  # 实时数据
Cache-Control: max-age=60 # 低频更新数据
```

### 版本化策略

```js
// 文件名版本化
<script src="/app.v1.0.0.js"></script>

// 或在请求中添加版本参数
<img src="/logo.png?v=1.0.0" />
```

### 缓存验证

```js
// 检查缓存是否可用
console.log('Service Worker' in navigator);

// 查看缓存存储
caches.keys().then(names => console.log(names));

// 清除所有缓存（浏览器控制台）
caches.keys().then(names => names.forEach(name => caches.delete(name)));
```

## 常见问题排查

| 问题 | 可能原因 | 解决方案 |
|-----|---------|---------|
| 缓存未更新 | 使用了强缓存 | 添加版本号或使用 no-cache |
| SW 不生效 | 作用域问题 | 检查 register 路径和 scope |
| 404 但有缓存 | 资源被移除 | 清理旧缓存，添加错误处理 |
| 隐私数据被缓存 | 未设置合适的 header | 使用 Cache-Control: private |

## 总结

合理使用浏览器缓存可以显著提升应用性能，建议：

- 静态资源使用长期缓存 + 版本化
- HTML 使用 no-cache 确保获取最新版本
- API 缓存根据数据特性选择合适策略
- Service Worker 用于离线支持和高级缓存控制
- 定期清理无用缓存，避免占用过多存储空间
