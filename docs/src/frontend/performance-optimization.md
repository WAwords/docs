# 前端性能优化

本文档整理前端性能优化的常用方法和最佳实践，帮助开发者提升应用的加载速度、运行性能和用户体验。

## 性能指标

### 核心 Web 指标 (Core Web Vitals)

- **LCP (Largest Contentful Paint)**：最大内容绘制，衡量加载性能，目标 < 2.5s
- **FID (First Input Delay)**：首次输入延迟，衡量交互性，目标 < 100ms
- **CLS (Cumulative Layout Shift)**：累积布局偏移，衡量视觉稳定性，目标 < 0.1

## 资源加载优化

### 图片优化

```html
<!-- 使用适当的图片格式 -->
<img src="image.webp" alt="WebP 格式图片" />

<!-- 使用 srcset 实现响应式图片 -->
<img
  src="image-small.jpg"
  srcset="image-small.jpg 480w, image-medium.jpg 768w, image-large.jpg 1200w"
  sizes="(max-width: 600px) 480px, (max-width: 1000px) 768px, 1200px"
  alt="响应式图片"
/>

<!-- 懒加载 -->
<img loading="lazy" src="image.jpg" alt="懒加载图片" />
```

### 字体优化

```css
/* 使用 font-display 控制字体加载行为 */
@font-face {
  font-family: 'CustomFont';
  src: url('custom-font.woff2') format('woff2');
  font-display: swap; /* 先显示备用字体，加载完成后替换 */
}
```

### 资源压缩

- 使用 Gzip 或 Brotli 压缩文本资源
- 压缩图片（使用 TinyPNG、Squoosh 等工具）
- 压缩 SVG 图标

## 代码优化

### JavaScript 优化

```js
// 减少重排重绘
// 批量修改 DOM
const fragment = document.createDocumentFragment();
for (let i = 0; i < 100; i++) {
  const div = document.createElement('div');
  fragment.appendChild(div);
}
document.body.appendChild(fragment);

// 使用 requestAnimationFrame 进行动画
function animate() {
  // 动画逻辑
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

// 防抖
function debounce(fn, delay = 300) {
  let timer = null;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// 节流
function throttle(fn, delay = 300) {
  let last = 0;
  return function(...args) {
    const now = Date.now();
    if (now - last > delay) {
      fn.apply(this, args);
      last = now;
    }
  };
}
```

### CSS 优化

```css
/* 避免过度使用通配符选择器 */
* {
  box-sizing: border-box;
}

/* 使用 transform 代替 top/left 进行动画 */
.animate {
  transition: transform 0.3s ease;
}

/* 减少重排：优先使用 transform 和 opacity */
.element {
  transform: translateX(100px);
  opacity: 0.8;
}
```

## 缓存策略

### HTTP 缓存

```nginx
# Nginx 配置示例
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff2)$ {
  expires 1y;
  add_header Cache-Control "public, immutable";
}
```

### Service Worker 缓存

```js
// 注册 Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}
```

## 打包优化

### 代码分割

```js
// 使用动态导入实现代码分割
const loadModule = () => import('./module.js');

// React 懒加载
import React, { lazy, Suspense } from 'react';
const LazyComponent = lazy(() => import('./LazyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
```

### Tree Shaking

确保使用 ES6 模块语法（import/export），打包工具会自动移除未使用的代码。

## 网络优化

### 使用 CDN

将静态资源托管到 CDN，利用边缘节点加速访问。

### 预加载和预连接

```html
<!-- 预连接 -->
<link rel="preconnect" href="https://api.example.com">

<!-- 预加载关键资源 -->
<link rel="preload" href="critical.js" as="script">
<link rel="preload" href="critical.css" as="style">
```

## 性能监控

### 使用 Chrome DevTools

- Performance 面板：分析运行时性能
- Network 面板：分析网络加载
- Lighthouse：综合性能审计

### 真实用户监控 (RUM)

```js
// 发送性能数据
const performanceData = {
  lcp: performance.getEntriesByType('largest-contentful-paint')[0]?.startTime,
  fid: performance.getEntriesByType('first-input')[0]?.processingStart,
  cls: performance.getEntriesByType('layout-shift').reduce((sum, entry) => sum + entry.value, 0)
};
// 发送到后端
fetch('/api/performance', {
  method: 'POST',
  body: JSON.stringify(performanceData)
});
```
