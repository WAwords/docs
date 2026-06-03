# Vite 配置与使用

## Vite 简介

Vite 是一个新一代前端构建工具，具有快速的冷启动和即时的模块热替换。

## 安装与初始化

### 使用 npm

```bash
npm create vite@latest
```

### 使用 yarn

```bash
yarn create vite
```

### 使用 pnpm

```bash
pnpm create vite
```

## 基础配置

### 配置文件结构

```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
})
```

### 路径别名配置

```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
})
```

## 开发服务器配置

```typescript
export default defineConfig({
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
```

## 构建配置

```typescript
export default defineConfig({
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vue: ['vue', 'vue-router', 'pinia'],
          vendor: ['axios'],
        },
      },
    },
  },
})
```

## 常用插件

### @vitejs/plugin-vue

用于支持 Vue 单文件组件

```bash
npm install @vitejs/plugin-vue -D
```

### vite-plugin-compression

用于 gzip 压缩

```bash
npm install vite-plugin-compression -D
```

```typescript
import viteCompression from 'vite-plugin-compression'

export default defineConfig({
  plugins: [
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
    }),
  ],
})
```

### vite-plugin-imagemin

图片压缩

```bash
npm install vite-plugin-imagemin -D
```

```typescript
import viteImagemin from 'vite-plugin-imagemin'

export default defineConfig({
  plugins: [
    viteImagemin({
      gifsicle: { optimizationLevel: 7 },
      optipng: { optimizationLevel: 7 },
      mozjpeg: { quality: 20 },
      pngquant: { quality: [0.8, 0.9] },
      svgo: {
        plugins: [
          { name: 'removeViewBox' },
          { name: 'removeEmptyAttrs', active: false },
        ],
      },
    }),
  ],
})
```

## 环境变量

### .env 文件

```env
VITE_APP_TITLE=My App
VITE_API_URL=http://localhost:3000
```

### 使用环境变量

```typescript
console.log(import.meta.env.VITE_APP_TITLE)
```

## 构建优化

### 预构建优化

```typescript
export default defineConfig({
  optimizeDeps: {
    include: ['vue', 'vue-router', 'pinia'],
    exclude: ['your-local-package'],
  },
})
```

### 代码分割

```typescript
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.split('/')[id.split('/').indexOf('node_modules') + 1]
          }
        },
      },
    },
  },
})
```

