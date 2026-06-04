# fetch API 实用指南

## 概述

`fetch` 是现代浏览器提供的原生 HTTP 请求 API，用于替代传统的 `XMLHttpRequest`。它基于 Promise 设计，使用起来更加简洁和灵活。

## 基本用法

```javascript
// GET 请求
fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('请求失败:', error));

// async/await 方式
async function getData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('请求失败:', error);
  }
}
```

## 请求配置

### POST 请求

```javascript
async function postData() {
  const response = await fetch('https://api.example.com/data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: '示例',
      value: 123,
    }),
  });
  return response.json();
}
```

### 带认证的请求

```javascript
async function fetchWithAuth() {
  const response = await fetch('https://api.example.com/protected', {
    headers: {
      'Authorization': 'Bearer your-token-here',
    },
  });
  return response.json();
}
```

## 响应处理

### 状态码检查

```javascript
async function checkResponse() {
  const response = await fetch('https://api.example.com/data');

  if (!response.ok) {
    throw new Error(`HTTP 错误! 状态码: ${response.status}`);
  }

  return response.json();
}
```

### 读取不同类型的数据

```javascript
// JSON 数据
const jsonData = await response.json();

// 文本数据
const textData = await response.text();

// 二进制数据
const blobData = await response.blob();

// 表单数据
const formData = await response.formData();
```

## 高级用法

### 并行请求

```javascript
async function parallelFetch() {
  const [users, posts] = await Promise.all([
    fetch('https://api.example.com/users').then(r => r.json()),
    fetch('https://api.example.com/posts').then(r => r.json()),
  ]);
  return { users, posts };
}
```

### 取消请求（AbortController）

```javascript
const controller = new AbortController();

async function fetchWithCancel() {
  try {
    const response = await fetch('https://api.example.com/data', {
      signal: controller.signal,
    });
    return await response.json();
  } catch (error) {
    if (error.name === 'AbortError') {
      console.log('请求已取消');
    }
    throw error;
  }
}

// 取消请求
controller.abort();
```

### 文件上传

```javascript
async function uploadFile(file) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('https://api.example.com/upload', {
    method: 'POST',
    body: formData,
  });
  return response.json();
}
```

## 常见问题

### CORS 跨域问题

当请求跨域资源时，服务器必须设置正确的 `Access-Control-Allow-Origin` 头。

### 超时处理

`fetch` 本身不支持超时，需要通过 `AbortController` 实现：

```javascript
function fetchWithTimeout(url, options = {}, timeout = 5000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  return fetch(url, {
    ...options,
    signal: controller.signal,
  }).finally(() => clearTimeout(timeoutId));
}
```

### 重试机制

```javascript
async function fetchWithRetry(url, options = {}, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(r => setTimeout(r, 1000 * (i + 1)));
    }
  }
}
```

## 最佳实践

1. **始终检查 `response.ok`** - 确保请求成功
2. **使用 `async/await`** - 代码更清晰
3. **添加错误处理** - 捕获网络错误和服务器错误
4. **设置合理的超时** - 避免请求无限等待
5. **使用 `AbortController`** - 支持取消请求
