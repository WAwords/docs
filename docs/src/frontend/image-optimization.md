# 前端图片优化指南

:::tip 为什么要优化图片
图片是网页中体积最大的资源之一，通常占页面总大小的 60% 以上。优化图片可以显著提升页面加载速度，改善用户体验，同时减少带宽成本。
:::

## 选择合适的图片格式

### 现代图片格式对比

| 格式 | 优势 | 适用场景 | 浏览器支持 |
|------|------|----------|------------|
| WebP | 更好的压缩率，支持透明和动画 | 绝大多数场景 | ~98% |
| AVIF | 比 WebP 更优秀的压缩率 | 照片类图片 | ~90% |
| PNG | 无损压缩，支持透明 | 图标、简单图形 | 全部 |
| JPEG | 有损压缩，体积小 | 照片类图片 | 全部 |
| SVG | 矢量图形，可无限缩放 | 图标、Logo | 全部 |

### 使用现代图片格式

使用 `&lt;picture&gt;` 标签提供多种格式，让浏览器选择最优格式：

```html
&lt;picture&gt;
  &lt;source srcset="image.avif" type="image/avif"&gt;
  &lt;source srcset="image.webp" type="image/webp"&gt;
  &lt;img src="image.jpg" alt="描述文字"&gt;
&lt;/picture&gt;
```

## 图片尺寸优化

### 使用正确的尺寸

不要使用比显示尺寸大得多的图片，确保图片尺寸与实际显示尺寸匹配。

```html
&lt;!-- 错误示例：2000x2000 的图片显示为 200x200 --&gt;
&lt;img src="large-image.jpg" width="200" height="200" alt="图片"&gt;

&lt;!-- 正确示例：使用与显示尺寸匹配的图片 --&gt;
&lt;img src="optimized-image.jpg" width="200" height="200" alt="图片"&gt;
```

### 响应式图片

使用 `srcset` 和 `sizes` 提供不同尺寸的图片：

```html
&lt;img 
  srcset="image-300.jpg 300w,
          image-600.jpg 600w,
          image-1200.jpg 1200w"
  sizes="(max-width: 600px) 300px,
         (max-width: 1200px) 600px,
         1200px"
  src="image-600.jpg" 
  alt="响应式图片"
&gt;
```

## 压缩图片

### 使用工具压缩

推荐的图片压缩工具：

- **在线工具**：
  - [Squoosh](https://squoosh.app/) - 支持多种格式
  - [TinyPNG](https://tinypng.com/) - PNG/JPEG 压缩
- **命令行工具**：
  - `sharp` - Node.js 图片处理库
  - `imagemin` - 批量压缩工具

### 使用 Sharp 批量压缩

```javascript
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const inputDir = './src/images';
const outputDir = './dist/images';

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.readdirSync(inputDir).forEach(file =&gt; {
  const inputPath = path.join(inputDir, file);
  const outputPath = path.join(outputDir, path.parse(file).name + '.webp');

  sharp(inputPath)
    .webp({ quality: 80 })
    .toFile(outputPath)
    .then(() =&gt; console.log(`处理完成: ${file}`))
    .catch(err =&gt; console.error(`处理失败: ${file}`, err));
});
```

## 懒加载

### 原生懒加载

使用 `loading="lazy"` 属性：

```html
&lt;img src="image.jpg" loading="lazy" alt="懒加载图片"&gt;
&lt;iframe src="video.html" loading="lazy"&gt;&lt;/iframe&gt;
```

### Intersection Observer API

对于需要更精细控制的场景：

```javascript
const lazyImages = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries, observer) =&gt; {
  entries.forEach(entry =&gt; {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
      observer.unobserve(img);
    }
  });
});

lazyImages.forEach(img =&gt; imageObserver.observe(img));
```

使用时：

```html
&lt;img data-src="image.jpg" alt="懒加载图片"&gt;
```

## 占位符技术

### 低质量图片占位符 (LQIP)

先加载一个低质量、体积小的模糊图片作为占位符，等高质量图片加载完成后替换：

```html
&lt;img 
  src="placeholder-low-quality.jpg" 
  data-src="high-quality.jpg"
  alt="图片"
  class="lazy-image"
&gt;
```

```css
.lazy-image {
  filter: blur(10px);
  transition: filter 0.3s;
}

.lazy-image.loaded {
  filter: blur(0);
}
```

### SVG 占位符

使用简单的 SVG 作为占位符：

```html
&lt;img 
  src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%23f0f0f0' width='400' height='300'/%3E%3C/svg%3E"
  data-src="actual-image.jpg"
  alt="图片"
  width="400"
  height="300"
&gt;
```

## 图片 CDN

使用图片 CDN 可以自动处理格式转换、尺寸调整、压缩等：

```html
&lt;!-- Cloudinary 示例 --&gt;
&lt;img 
  src="https://res.cloudinary.com/demo/image/upload/w_300,h_200,c_fill,q_auto,f_webp/sample.jpg"
  alt="CDN 优化图片"
&gt;

&lt;!-- 七牛云示例 --&gt;
&lt;img 
  src="https://example.com/image.jpg?imageView2/1/w/300/h/200/format/webp"
  alt="CDN 优化图片"
&gt;
```

## 最佳实践总结

1. **优先使用现代格式**：WebP、AVIF
2. **提供多种格式**：使用 `&lt;picture&gt;` 标签
3. **匹配尺寸**：确保图片尺寸与显示尺寸一致
4. **响应式图片**：使用 `srcset` 和 `sizes`
5. **懒加载**：对非首屏图片使用懒加载
6. **压缩图片**：在保证质量的前提下尽量压缩
7. **使用 CDN**：利用 CDN 的自动优化功能
