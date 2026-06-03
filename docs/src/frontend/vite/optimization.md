# Vite 构建优化指南

本文档整理 Vite 项目的构建优化策略，提升开发体验和生产环境性能。

## 依赖预构建优化

### 预构建配置

```js
// vite.config.js
export default {
  optimizeDeps: {
    // 强制预构建的依赖
    include: ['vue', 'vue-router', 'pinia'],
    // 排除预构建的依赖
    exclude: ['your-local-package'],
    // 预构建时的 esbuild 配置
    esbuildOptions: {
      target: 'es2020'
    }
  }
}
```

### 自定义预构建逻辑

```js
// vite.config.js
export default {
  optimizeDeps: {
    // 强制重新预构建
    force: true,
    // 自定义预构建入口
    entries: ['src/main.js', 'src/other-entry.js']
  }
}
```

## 构建产物优化

### 代码分割

```js
// vite.config.js
export default {
  build: {
    rollupOptions: {
      output: {
        // 手动分包
        manualChunks: {
          'vue-vendor': ['vue', 'vue-router', 'pinia'],
          'ui-vendor': ['element-plus', '@element-plus/icons-vue'],
          'utils-vendor': ['lodash-es', 'dayjs']
        }
      }
    }
  }
}
```

### 压缩优化

```js
// vite.config.js
export default {
  build: {
    // 使用 terser 压缩（默认 esbuild 更快）
    minify: 'terser',
    terserOptions: {
      compress: {
        // 移除 console
        drop_console: true,
        // 移除 debugger
        drop_debugger: true
      }
    },
    // 生成源映射
    sourcemap: false,
    // 目标环境
    target: 'es2015'
  }
}
```

## 资源优化

### 图片资源

```js
// vite.config.js
export default {
  build: {
    assetsInlineLimit: 4096, // 4kb 以下的图片转为 base64
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js'
      }
    }
  }
}
```

### 使用插件优化

```js
// vite.config.js
import imagemin from 'vite-plugin-imagemin';

export default {
  plugins: [
    imagemin({
      gifsicle: { optimizationLevel: 7 },
      optipng: { optimizationLevel: 7 },
      mozjpeg: { quality: 80 },
      pngquant: { quality: [0.8, 0.9] },
      svgo: {
        plugins: [
          { name: 'removeViewBox' },
          { name: 'removeEmptyAttrs', active: false }
        ]
      }
    })
  ]
}
```

## 开发服务器优化

### 服务器配置

```js
// vite.config.js
export default {
  server: {
    // 端口
    port: 3000,
    // 自动打开浏览器
    open: true,
    // 代理
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    },
    // 开启 CORS
    cors: true,
    // 预热常用文件
    warmup: {
      clientFiles: ['./src/main.js', './src/App.vue']
    }
  }
}
```

### HMR 优化

```js
// vite.config.js
export default {
  server: {
    hmr: {
      // 禁用 HMR
      // overlay: false,
      // HMR 端口
      port: 24678
    }
  }
}
```

## 类型检查优化

### 关闭开发时类型检查

```js
// vite.config.js
import vue from '@vitejs/plugin-vue';

export default {
  plugins: [
    vue({
      script: {
        // 禁用开发时类型检查
        propsDestructure: true
      }
    })
  ]
}
```

### 使用 vue-tsc 进行类型检查

```json
// package.json
{
  "scripts": {
    "type-check": "vue-tsc --noEmit"
  }
}
```

## 插件优化

### 按需引入插件

```js
// vite.config.js
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

export default {
  plugins: [
    Components({
      resolvers: [ElementPlusResolver()],
      dts: 'src/components.d.ts'
    })
  ]
}
```

### 自动导入 API

```js
// vite.config.js
import AutoImport from 'unplugin-auto-import/vite';

export default {
  plugins: [
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia'],
      dts: 'src/auto-imports.d.ts'
    })
  ]
}
```

## 环境变量优化

### 环境变量类型定义

```ts
// env.d.ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_APP_TITLE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

## 构建分析

### 使用 rollup-plugin-visualizer

```js
// vite.config.js
import { visualizer } from 'rollup-plugin-visualizer';

export default {
  plugins: [
    visualizer({
      open: true,
      filename: 'dist/stats.html'
    })
  ]
}
```

## 性能监控

### 配置性能提示

```js
// vite.config.js
export default {
  build: {
    // 块大小警告阈值（默认 500kb）
    chunkSizeWarningLimit: 1000
  }
}
```
