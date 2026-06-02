# 前端错误处理与日志记录

## 概述

前端错误处理是保障应用稳定性和用户体验的重要环节。合理的错误处理策略能够帮助我们及时发现问题、定位问题并快速修复。

## 错误类型

### 1. 语法错误

JavaScript 解析阶段发生的错误，通常是代码书写问题。

```js
// 示例：缺少闭合括号
const result = myFunction(
```

### 2. 运行时错误

代码执行过程中发生的错误。

```js
// 示例：调用未定义的函数
undefinedFunction();
```

### 3. 逻辑错误

代码没有报错，但结果不符合预期。

```js
// 示例：条件判断错误
if (age > 18) {
  // 逻辑错误：应该是 age >= 18
}
```

## 错误捕获方式

### try-catch

用于捕获同步代码中的错误。

```js
try {
  const result = JSON.parse(data);
  return result;
} catch (error) {
  console.error('JSON 解析失败:', error);
  return null;
}
```

### Promise.catch()

用于捕获异步 Promise 中的错误。

```js
fetch('/api/data')
  .then(response => response.json())
  .then(data => processData(data))
  .catch(error => {
    console.error('请求失败:', error);
    showErrorToast('网络请求失败');
  });
```

### async/await + try-catch

异步代码的优雅错误处理方式。

```js
async function fetchData() {
  try {
    const response = await fetch('/api/data');
    if (!response.ok) {
      throw new Error(`HTTP 错误: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('数据获取失败:', error);
    throw error;
  }
}
```

## 全局错误监听

### window.onerror

捕获全局的 JavaScript 运行时错误。

```js
window.onerror = function(message, source, lineno, colno, error) {
  console.error('全局错误:', {
    message,
    source,
    lineno,
    colno,
    error
  });
  
  // 上报到日志系统
  reportError({
    type: 'runtime',
    message,
    source,
    lineno,
    colno,
    stack: error?.stack
  });
  
  return true;
};
```

### window.addEventListener('error')

另一种全局错误监听方式。

```js
window.addEventListener('error', function(event) {
  console.error('捕获到错误:', event);
  reportError({
    type: 'runtime',
    message: event.message,
    source: event.filename,
    lineno: event.lineno,
    colno: event.colno,
    stack: event.error?.stack
  });
});
```

### unhandledrejection

捕获未处理的 Promise 拒绝。

```js
window.addEventListener('unhandledrejection', function(event) {
  console.error('未处理的 Promise 拒绝:', event);
  reportError({
    type: 'promise',
    message: event.reason?.message || 'Promise 拒绝',
    stack: event.reason?.stack
  });
  
  event.preventDefault();
});
```

## 资源加载错误监听

### 图片加载失败

```js
const img = new Image();
img.src = '/path/to/image.jpg';
img.onerror = function() {
  console.error('图片加载失败:', img.src);
  img.src = '/path/to/fallback.jpg';
};
```

### 脚本加载失败

```js
const script = document.createElement('script');
script.src = '/path/to/script.js';
script.onerror = function() {
  console.error('脚本加载失败:', script.src);
};
document.head.appendChild(script);
```

## 日志记录策略

### 日志级别

```js
const LogLevel = {
  DEBUG: 'debug',
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error'
};
```

### 日志工具类

```js
class Logger {
  static debug(message, data) {
    if (process.env.NODE_ENV === 'development') {
      console.debug(`[DEBUG] ${message}`, data);
    }
  }
  
  static info(message, data) {
    console.info(`[INFO] ${message}`, data);
    this.report(message, LogLevel.INFO, data);
  }
  
  static warn(message, data) {
    console.warn(`[WARN] ${message}`, data);
    this.report(message, LogLevel.WARN, data);
  }
  
  static error(message, data) {
    console.error(`[ERROR] ${message}`, data);
    this.report(message, LogLevel.ERROR, data);
  }
  
  static report(message, level, data) {
    if (process.env.NODE_ENV === 'production') {
      // 上报到后端日志系统
      fetch('/api/logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          level,
          message,
          data,
          timestamp: Date.now(),
          userAgent: navigator.userAgent,
          url: window.location.href
        })
      });
    }
  }
}
```

### 使用示例

```js
Logger.debug('组件初始化', { component: 'App' });
Logger.info('用户登录', { userId: 123 });
Logger.warn('API 响应超时', { endpoint: '/api/data' });
Logger.error('数据解析失败', { error: e });
```

## 错误上报

### 上报时机

1. 应用启动时记录基础信息
2. 用户操作出错时上报
3. 定时批量上报日志
4. 页面卸载前上报

### 上报数据结构

```js
{
  timestamp: Date.now(),
  level: 'error',
  message: '错误描述',
  stack: '错误堆栈',
  url: window.location.href,
  userAgent: navigator.userAgent,
  userId: '用户标识',
  sessionId: '会话标识',
  extra: { /* 额外信息 */ }
}
```

## 最佳实践

### 1. 不要忽视错误

始终处理 Promise 的 catch 和 try-catch。

### 2. 提供友好的用户提示

```js
try {
  await fetchData();
} catch (error) {
  showErrorToast('操作失败，请稍后重试');
}
```

### 3. 生产环境隐藏详细错误

只向用户展示友好的错误提示，详细错误信息仅记录到日志系统。

### 4. 使用 Source Map

确保生产环境能够正确映射压缩后的代码到原始源码位置。

### 5. 定期监控日志

建立日志监控系统，及时发现和处理问题。

## 总结

良好的错误处理和日志记录能够帮助我们：
- 快速定位和修复问题
- 提升用户体验
- 保障应用稳定性
- 便于问题追溯和分析
