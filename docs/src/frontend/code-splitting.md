# 代码分割与懒加载

代码分割和懒加载是前端性能优化的重要技术手段，可以显著减小首屏加载体积，提升用户体验。

## 一、代码分割概述

### 1.1 什么是代码分割

代码分割是将应用代码拆分成多个小块（chunk），按需加载的技术。

**核心优势：**
- 减小首屏加载体积
- 实现按需加载
- 提高首屏渲染速度
- 优化用户体验

### 1.2 代码分割策略

| 策略 | 说明 | 适用场景 |
|------|------|----------|
| 入口分割 | 按入口文件分割 | 多页应用 |
| 公共模块抽取 | 抽取公共依赖 | 多个页面共享的代码 |
| 动态导入 | 按需加载模块 | 路由懒加载、条件加载 |
| 预加载 | 提前加载关键资源 | 首屏关键资源 |

## 二、Webpack 代码分割配置

### 2.1 入口配置

```javascript
module.exports = {
  entry: {
    main: './src/main.js',
    vendor: ['react', 'react-dom']
  },
  output: {
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].chunk.js'
  }
};
```

### 2.2 SplitChunks 配置

```javascript
optimization: {
  splitChunks: {
    chunks: 'all',
    cacheGroups: {
      vendors: {
        test: /[\\/]node_modules[\\/]/,
        priority: -10,
        filename: 'vendors.[contenthash].js'
      },
      common: {
        minChunks: 2,
        priority: -20,
        reuseExistingChunk: true,
        filename: 'common.[contenthash].js'
      }
    }
  }
}
```

## 三、动态导入与懒加载

### 3.1 React 路由懒加载

```javascript
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./Home'));
const About = lazy(() => import('./About'));
const Contact = lazy(() => import('./Contact'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
```

### 3.2 Vue 路由懒加载

```javascript
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('./views/Home.vue')
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('./views/About.vue')
    }
  ]
});
```

### 3.3 组件级懒加载

```javascript
const HeavyComponent = React.lazy(() => import('./HeavyComponent'));

function MyComponent() {
  const [showHeavy, setShowHeavy] = useState(false);
  
  return (
    <div>
      <button onClick={() => setShowHeavy(true)}>加载组件</button>
      {showHeavy && (
        <Suspense fallback={<div>Loading...</div>}>
          <HeavyComponent />
        </Suspense>
      )}
    </div>
  );
}
```

## 四、资源懒加载

### 4.1 图片懒加载

```html
<img 
  data-src="image.jpg" 
  class="lazy" 
  alt="图片描述"
/>
```

```javascript
document.addEventListener('DOMContentLoaded', () => {
  const lazyImages = document.querySelectorAll('.lazy');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        observer.unobserve(img);
      }
    });
  });
  
  lazyImages.forEach(img => imageObserver.observe(img));
});
```

### 4.2 视频懒加载

```html
<video 
  data-src="video.mp4" 
  class="lazy-video"
  muted
  playsinline
>
</video>
```

## 五、预加载与预获取

### 5.1 Link 预加载

```html
<link rel="preload" href="critical.css" as="style">
<link rel="preload" href="critical.js" as="script">
<link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin>
```

### 5.2 Link 预获取

```html
<link rel="prefetch" href="/about" as="document">
<link rel="prefetch" href="vendor.js" as="script">
```

### 5.3 Webpack Prefetch/Preload

```javascript
import(/* webpackPrefetch: true */ './HeavyComponent');
import(/* webpackPreload: true */ './CriticalComponent');
```

## 六、性能监控与分析

### 6.1 使用 Bundle Analyzer

```javascript
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin()
  ]
};
```

### 6.2 关键指标

| 指标 | 说明 | 优化目标 |
|------|------|----------|
| TTI | 可交互时间 | < 5s |
| TBT | 阻塞时间 | < 300ms |
| LCP | 最大内容绘制 | < 2.5s |
| CLS | 布局偏移 | < 0.1 |

## 七、最佳实践总结

1. **路由级别懒加载**：对非首屏路由进行懒加载
2. **公共依赖抽取**：将第三方库抽取为单独 chunk
3. **组件级懒加载**：对大型组件按需加载
4. **资源懒加载**：图片、视频等资源使用懒加载
5. **合理使用预加载**：对关键资源使用 preload
6. **监控分析**：定期使用 bundle analyzer 分析打包体积

通过合理运用代码分割和懒加载技术，可以显著提升应用的加载性能和用户体验。