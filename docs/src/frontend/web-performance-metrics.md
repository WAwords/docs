# Web 性能核心指标

本文档整理 Google 定义的 Web 核心指标（Core Web Vitals）及其他重要性能指标，帮助开发者优化网站性能。

## 核心指标（Core Web Vitals）

### LCP（Largest Contentful Paint）- 最大内容绘制

**定义**：衡量页面加载性能，记录视口中最大内容元素的渲染时间。

**最佳实践**：&lt; 2.5 秒

**评估标准**：
- 良好：&lt; 2.5s
- 需要改进：2.5s - 4s
- 较差：&gt; 4s

**优化建议**：

```html
<!-- 1. 优化图片加载 -->
<img src="image.webp" loading="lazy" alt="..." />

<!-- 2. 使用 CDN -->
<!-- 3. 压缩资源 -->
<!-- 4. 减少服务器响应时间 -->
```

### FID（First Input Delay）- 首次输入延迟

**定义**：衡量交互响应性能，记录用户首次交互到浏览器实际响应的延迟时间。

**注意**：FID 已在 2024 年 3 月被 INP 替代。

**最佳实践**：&lt; 100 毫秒

**评估标准**：
- 良好：&lt; 100ms
- 需要改进：100ms - 300ms
- 较差：&gt; 300ms

### CLS（Cumulative Layout Shift）- 累积布局偏移

**定义**：衡量视觉稳定性，记录页面整个生命周期内所有意外布局偏移的总和。

**最佳实践**：&lt; 0.1

**评估标准**：
- 良好：&lt; 0.1
- 需要改进：0.1 - 0.25
- 较差：&gt; 0.25

**优化建议**：

```css
/* 1. 为图片和视频设置宽高 */
img {
  width: 100%;
  height: auto;
  aspect-ratio: 16/9;
}

/* 2. 避免无尺寸的广告插入 */
/* 3. 避免在视口上方插入内容 */
```

### INP（Interaction to Next Paint）- 交互到下一次绘制

**定义**：衡量整体交互性能，是 FID 的替代指标，记录所有用户交互的延迟。

**最佳实践**：&lt; 200 毫秒

**评估标准**：
- 良好：&lt; 200ms
- 需要改进：200ms - 500ms
- 较差：&gt; 500ms

**优化建议**：

```js
// 1. 优化长任务，使用 requestIdleCallback
function processHeavyTask() {
  requestIdleCallback((deadline) =&gt; {
    while (deadline.timeRemaining() &gt; 50) {
      // 执行任务
    }
  });
}

// 2. 使用 Web Workers 处理耗时计算
const worker = new Worker('worker.js');
```

## 其他重要性能指标

### TTFB（Time to First Byte）- 首字节时间

**定义**：从发起请求到接收到第一个字节的时间。

**最佳实践**：&lt; 800 毫秒

### FCP（First Contentful Paint）- 首次内容绘制

**定义**：浏览器首次渲染文本、图片等内容元素的时间。

**最佳实践**：&lt; 1.8 秒

### TTI（Time to Interactive）- 可交互时间

**定义**：页面完全可以响应用户交互的时间。

**最佳实践**：&lt; 5 秒

### TBT（Total Blocking Time）- 总阻塞时间

**定义**：FCP 到 TTI 之间，所有长任务（&gt; 50ms）的阻塞时间总和。

**最佳实践**：&lt; 200 毫秒

## 性能测量工具

### Chrome DevTools

```js
// 使用 Performance 面板录制和分析
// 使用 Lighthouse 进行全面审计
```

### Web Vitals Extension

浏览器插件，实时显示页面核心指标。

### 使用代码测量

```js
// 安装 web-vitals 库
// npm install web-vitals

import { onLCP, onINP, onCLS } from 'web-vitals';

onLCP(console.log);
onINP(console.log);
onCLS(console.log);
```

## 性能优化 checklist

- [ ] 图片使用 WebP/AVIF 格式
- [ ] 图片懒加载
- [ ] 启用 Gzip/Brotli 压缩
- [ ] 减少 HTTP 请求数量
- [ ] 使用 CDN 加速
- [ ] 优化关键渲染路径
- [ ] 延迟加载非关键资源
- [ ] 减少 DOM 节点数量
- [ ] 使用 Service Worker 缓存
- [ ] 优化 JavaScript 执行
