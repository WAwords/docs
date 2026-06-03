# 前端本地存储最佳实践

在前端开发中，本地存储是非常重要的功能。本文将介绍常用的本地存储方案及其最佳实践。

## 存储方案对比

### localStorage
- **容量**：约 5-10MB
- **生命周期**：永久存储，除非手动清除
- **特点**：同步操作，键值对存储，仅支持字符串

```javascript
// 存储
localStorage.setItem('username', '张三');

// 读取
const username = localStorage.getItem('username');

// 删除
localStorage.removeItem('username');

// 清空
localStorage.clear();
```

### sessionStorage
- **容量**：约 5-10MB
- **生命周期**：会话级，标签页关闭即清除
- **特点**：同步操作，键值对存储，仅支持字符串

```javascript
// 存储
sessionStorage.setItem('tempData', '临时数据');

// 读取
const tempData = sessionStorage.getItem('tempData');
```

### IndexedDB
- **容量**：无限制（受硬盘空间限制）
- **生命周期**：永久存储，除非手动清除
- **特点**：异步操作，支持事务，可存储结构化数据

```javascript
// 打开数据库
const request = indexedDB.open('myDatabase', 1);

request.onsuccess = function(event) {
  const db = event.target.result;
  console.log('数据库打开成功');
};

request.onupgradeneeded = function(event) {
  const db = event.target.result;
  // 创建对象仓库
  if (!db.objectStoreNames.contains('users')) {
    db.createObjectStore('users', { keyPath: 'id' });
  }
};
```

### Cookie
- **容量**：约 4KB
- **生命周期**：可设置过期时间
- **特点**：每次 HTTP 请求都会携带，有安全限制

```javascript
// 设置 Cookie
document.cookie = 'username=张三; expires=' + new Date(Date.now() + 86400000).toUTCString() + '; path=/';

// 读取 Cookie
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
```

## 封装 localStorage 工具

### 支持 JSON 存储

```javascript
const Storage = {
  /**
   * 设置存储
   * @param {string} key - 键名
   * @param {any} value - 值
   */
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('存储失败:', error);
    }
  },

  /**
   * 获取存储
   * @param {string} key - 键名
   * @param {any} defaultValue - 默认值
   * @returns {any}
   */
  get(key, defaultValue = null) {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : defaultValue;
    } catch (error) {
      console.error('读取失败:', error);
      return defaultValue;
    }
  },

  /**
   * 删除存储
   * @param {string} key - 键名
   */
  remove(key) {
    localStorage.removeItem(key);
  },

  /**
   * 清空所有存储
   */
  clear() {
    localStorage.clear();
  }
};

// 使用示例
Storage.set('user', { name: '张三', age: 18 });
const user = Storage.get('user');
```

### 带过期时间的存储

```javascript
const ExpireStorage = {
  /**
   * 设置带过期时间的存储
   * @param {string} key - 键名
   * @param {any} value - 值
   * @param {number} expire - 过期时间（毫秒）
   */
  set(key, value, expire) {
    const data = {
      value,
      expire: expire ? Date.now() + expire : null
    };
    localStorage.setItem(key, JSON.stringify(data));
  },

  /**
   * 获取存储
   * @param {string} key - 键名
   * @param {any} defaultValue - 默认值
   * @returns {any}
   */
  get(key, defaultValue = null) {
    const item = localStorage.getItem(key);
    if (!item) return defaultValue;

    try {
      const data = JSON.parse(item);
      if (data.expire && Date.now() > data.expire) {
        localStorage.removeItem(key);
        return defaultValue;
      }
      return data.value;
    } catch (error) {
      return defaultValue;
    }
  }
};

// 使用示例：存储 1 小时过期
ExpireStorage.set('token', 'abc123', 3600 * 1000);
```

## IndexedDB 封装

```javascript
class IndexedDB {
  /**
   * 构造函数
   * @param {string} dbName - 数据库名称
   * @param {number} version - 版本号
   * @param {Object} stores - 存储配置
   */
  constructor(dbName, version, stores) {
    this.dbName = dbName;
    this.version = version;
    this.stores = stores;
    this.db = null;
  }

  /**
   * 打开数据库
   * @returns {Promise}
   */
  open() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve(this.db);
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        for (const [storeName, options] of Object.entries(this.stores)) {
          if (!db.objectStoreNames.contains(storeName)) {
            db.createObjectStore(storeName, options);
          }
        }
      };
    });
  }

  /**
   * 添加数据
   * @param {string} storeName - 仓库名称
   * @param {any} data - 数据
   * @returns {Promise}
   */
  add(storeName, data) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.add(data);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * 获取数据
   * @param {string} storeName - 仓库名称
   * @param {any} key - 键
   * @returns {Promise}
   */
  get(storeName, key) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName]);
      const store = transaction.objectStore(storeName);
      const request = store.get(key);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * 获取所有数据
   * @param {string} storeName - 仓库名称
   * @returns {Promise}
   */
  getAll(storeName) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName]);
      const store = transaction.objectStore(storeName);
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
}

// 使用示例
const db = new IndexedDB('myApp', 1, {
  users: { keyPath: 'id' }
});

await db.open();
await db.add('users', { id: 1, name: '张三' });
const users = await db.getAll('users');
```

## 存储容量检测

```javascript
/**
 * 检测 localStorage 剩余空间
 * @returns {Object} 容量信息
 */
function checkStorageQuota() {
  let used = 0;
  for (const key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      used += (localStorage[key].length + key.length) * 2;
    }
  }
  return {
    used: (used / 1024 / 1024).toFixed(2) + 'MB',
    remaining: (5 - used / 1024 / 1024).toFixed(2) + 'MB'
  };
}
```

## 安全最佳实践

1. **不要存储敏感信息**
   - 避免在 localStorage 中存储密码、token 等敏感信息
   - 使用 HttpOnly Cookie 存储认证信息

2. **数据加密**
   - 对敏感数据进行加密存储

3. **数据验证**
   - 读取数据时进行类型检查和验证
   - 防止 XSS 攻击

4. **容量管理**
   - 定期清理过期数据
   - 监控存储容量，避免超出限制

5. **错误处理**
   - 捕获存储操作的异常
   - 提供降级方案
