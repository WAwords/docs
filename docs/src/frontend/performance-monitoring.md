# 前端性能监控与分析

本文档整理前端性能监控的常用指标、工具和方法，帮助开发者快速定位和解决性能问题。

## 核心性能指标

### Web Vitals

Web Vitals 是 Google 提出的衡量用户体验的核心指标。

```js
// 测量 Core Web Vitals
import { getCLS, getFID, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getLCP(console.log);
getTTFB(console.log);
```

### 关键指标说明

| 指标 | 全称 | 推荐值 | 说明 |
|------|------|--------|------|
| LCP | Largest Contentful Paint | ≤ 2.5s | 最大内容绘制时间 |
| FID | First Input Delay | ≤ 100ms | 首次输入延迟 |
| CLS | Cumulative Layout Shift | ≤ 0.1 | 累积布局偏移 |
| TTFB | Time To First Byte | ≤ 800ms | 首字节时间 |
| FCP | First Contentful Paint | ≤ 1.8s | 首次内容绘制 |

## 性能监控 API

### Performance API

```js
// 获取页面加载时间
const performanceTiming = performance.timing;
const loadTime = performanceTiming.loadEventEnd - performanceTiming.navigationStart;
console.log('页面加载时间:', loadTime, 'ms');

// 获取资源加载时间
const resources = performance.getEntriesByType('resource');
resources.forEach(resource => {
  console.log(`${resource.name}: ${resource.duration}ms`);
});
```

### PerformanceObserver

```js
// 监听 LCP
const lcpObserver = new PerformanceObserver((list) => {
  const entries = list.getEntries();
  const lastEntry = entries[entries.length - 1];
  console.log('LCP:', lastEntry.startTime);
});
lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

// 监听 CLS
const clsObserver = new PerformanceObserver((list) => {
  let clsValue = 0;
  for (const entry of list.getEntries()) {
    if (!entry.hadRecentInput) {
      clsValue += entry.value;
    }
  }
  console.log('CLS:', clsValue);
});
clsObserver.observe({ entryTypes: ['layout-shift'] });
```

## 错误监控

### 全局错误捕获

```js
// 捕获 JavaScript 错误
window.onerror = function(message, source, lineno, colno, error) {
  console.error('Error:', { message, source, lineno, colno, error });
  // 上报错误
  reportError({ type: 'js_error', message, source, lineno, colno });
  return true;
};

// 捕获 Promise 未处理的拒绝
window.addEventListener('unhandledrejection', function(event) {
  console.error('Unhandled Rejection:', event.reason);
  reportError({ type: 'promise_rejection', reason: event.reason });
});
```

### 资源加载错误

```js
// 捕获资源加载错误
window.addEventListener('error', function(event) {
  if (event.target !== window) {
    const target = event.target;
    console.error('Resource Error:', {
      tag: target.tagName,
      url: target.src || target.href
    });
    reportError({ 
      type: 'resource_error', 
      tag: target.tagName, 
      url: target.src || target.href 
    });
  }
}, true);
```

## 用户行为监控

### 页面访问记录

```js
// 记录页面访问
function recordPageView() {
  const data = {
    url: window.location.href,
    referrer: document.referrer,
    userAgent: navigator.userAgent,
    timestamp: Date.now()
  };
  reportEvent({ type: 'page_view', ...data });
}

recordPageView();
```

### 点击事件追踪

```js
// 全局点击监听
document.addEventListener('click', function(event) {
  const target = event.target;
  const elementData = {
    tag: target.tagName,
    id: target.id,
    className: target.className,
    text: target.textContent?.slice(0, 50),
    path: getElementPath(target)
  };
  reportEvent({ type: 'click', ...elementData });
});

// 获取元素路径
function getElementPath(element) {
  const path = [];
  while (element && element.nodeType === Node.ELEMENT_NODE) {
    let selector = element.tagName.toLowerCase();
    if (element.id) {
      selector += `#${element.id}`;
    } else if (element.className && typeof element.className === 'string') {
      selector += `.${element.className.split(' ').join('.')}`;
    }
    path.unshift(selector);
    element = element.parentNode;
  }
  return path.join(' > ');
}
```

## 数据上报

### 发送数据方法

```js
// 使用 sendBeacon 上报（推荐，不阻塞页面）
function reportData(data) {
  const url = '/api/performance';
  const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
  
  if (navigator.sendBeacon) {
    navigator.sendBeacon(url, blob);
  } else {
    // 降级到 fetch
    fetch(url, {
      method: 'POST',
      body: blob,
      headers: { 'Content-Type': 'application/json' },
      keepalive: true
    });
  }
}

// 使用 Image 上报（传统方法）
function reportWithImage(data) {
  const img = new Image();
  const params = new URLSearchParams(data);
  img.src = `/api/report?${params.toString()}`;
}
```

## 采样策略

```js
// 采样率配置
const SAMPLING_RATE = 0.1; // 10% 采样率

function shouldSample() {
  return Math.random() < SAMPLING_RATE;
}

// 带采样的数据上报
function reportWithSampling(data) {
  if (shouldSample()) {
    reportData(data);
  }
}

// 错误全量上报，性能数据采样
function reportPerformance(data) {
  if (data.type === 'error') {
    reportData(data);
  } else {
    reportWithSampling(data);
  }
}
```

## 常用监控工具

### 自研 SDK 示例

```js
class PerformanceMonitor {
  constructor(options) {
    this.options = {
      url: '/api/monitor',
      samplingRate: 0.1,
      ...options
    };
    this.init();
  }

  init() {
    this.trackErrors();
    this.trackPerformance();
    this.trackPageView();
  }

  trackErrors() {
    // 错误追踪逻辑
  }

  trackPerformance() {
    // 性能追踪逻辑
  }

  trackPageView() {
    // 页面访问记录
  }

  send(data) {
    // 数据发送
  }
}

// 使用
const monitor = new PerformanceMonitor({
  url: 'https://your-api.com/report',
  samplingRate: 0.2
});
```

### 第三方服务

- **Sentry**: 错误追踪
- **New Relic**: 全栈性能监控
- **Datadog**: 可观测性平台
- **Google Analytics**: 用户行为分析

## 最佳实践

1. **区分环境**: 只在生产环境上报数据
2. **数据脱敏**: 敏感信息不上报
3. **合并上报**: 减少请求次数
4. **异常处理**: 监控代码自身不能影响业务
5. **性能影响**: 监控代码本身要轻量

```js
// 检查生产环境
if (process.env.NODE_ENV === 'production') {
  initMonitor();
}
```
