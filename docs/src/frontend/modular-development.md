# 前端模块化开发

模块化是一种将复杂系统拆分为可独立开发、测试和部署的最小单元的开发方式。

## 模块化发展历程

### 早期：无模块化
```javascript
// 全局变量污染
var name = 'global';
function foo() {
  console.log(name);
}
```

### IIFE 立即执行函数
```javascript
// 使用 IIFE 创建独立作用域
(function(global) {
  var privateVar = 'private';
  
  global.module = {
    getValue: function() {
      return privateVar;
    }
  };
})(window);
```

### CommonJS（Node.js）
```javascript
// 导出
module.exports = {
  add: function(a, b) {
    return a + b;
  }
};

// 导入
const math = require('./math');
math.add(1, 2);
```

### AMD 异步模块定义
```javascript
define(['jquery', './utils'], function($, utils) {
  return {
    init: function() {
      $(document).ready(function() {
        utils.log('模块初始化');
      });
    }
  };
});
```

### ES Module（ES6+）
```javascript
// 命名导出
export const name = 'module';
export function add(a, b) {
  return a + b;
}

// 默认导出
export default function() {
  return 'default';
}

// 导入
import { name, add } from './module';
import defaultExport from './module';
```

## 模块化规范对比

| 规范 | 加载方式 | 环境 | 循环依赖 | 动态导入 |
|------|---------|------|---------|---------|
| CommonJS | 同步 | Node.js | 支持（存在风险）| 支持（require） |
| AMD | 异步 | 浏览器 | 支持但复杂 | 不支持 |
| ES Module | 异步（静态） | 浏览器/Node.js | 支持 | 支持（import()） |
| UMD | 兼容多种 | 浏览器/Node.js | 复杂 | 不支持 |

## 模块化开发最佳实践

### 1. 合理的模块划分
```javascript
// 按职责划分
src/
├── components/     # UI 组件
├── hooks/          # 自定义 Hooks
├── utils/          # 工具函数
├── services/       # API 服务
├── stores/         # 状态管理
└── constants/      # 常量定义
```

### 2. 清晰的文件命名
```
// ✅ 推荐
userProfile.ts
useLocalStorage.ts
apiClient.ts

// ❌ 避免
user.ts
util.ts
helper.ts
```

### 3. 统一的导出方式
```javascript
// 统一使用命名导出，便于 tree-shaking
export function formatDate() {}
export function formatCurrency() {}

// 默认导出用于整个模块的主要入口
export default UserService;
```

### 4. 避免循环依赖
```javascript
// a.js
import { b } from './b';
export const a = 'a';
export function getA() {
  return a + b;  // 可能出问题
}

// 更好的方式：重构模块结构，或使用依赖注入
```

## 常用模块化工具

### Webpack
```javascript
// webpack.config.js
module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist',
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx'],
  },
};
```

### Rollup
```javascript
// rollup.config.js
export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'es',
  },
};
```

### Vite
```javascript
// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router'],
        },
      },
    },
  },
});
```

## Tree Shaking 优化

确保模块支持 tree-shaking：

```javascript
// 1. 使用 ES Module 语法
export function used() {}
export function unused() {}

// 2. 确保 sideEffects 为 false 或精确配置
// package.json
{
  "sideEffects": false
}

// 3. 在 Webpack/Vite 中会自动识别未使用的导出并移除
```

## 动态导入

```javascript
// 路由懒加载
const Home = () => import('./views/Home.vue');

// 条件加载
async function loadModule(condition) {
  if (condition) {
    const module = await import('./modules/feature.js');
    return module.default;
  }
}

// 按需加载多个模块
Promise.all([
  import('./utils/a.js'),
  import('./utils/b.js'),
]).then(([moduleA, moduleB]) => {
  // 使用模块
});
```

## 模块联邦（Module Federation）

Webpack 5 引入了模块联邦，用于微前端架构：

```javascript
// host/webpack.config.js
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'host',
      remotes: {
        remote: 'remote@http://localhost:3001/remote.js',
      },
      shared: ['vue'],
    }),
  ],
};

// remote/webpack.config.js
module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'remote',
      filename: 'remote.js',
      exposes: {
        './Button': './src/Button.vue',
      },
      shared: ['vue'],
    }),
  ],
};
```

## 总结

- **CommonJS** 适用于 Node.js 服务端
- **ES Module** 是前端模块化的未来，浏览器和 Node.js 都原生支持
- 使用 **Vite** 或 **Webpack** 进行模块打包
- 遵循单一职责原则，保持模块粒度合理
- 利用 **tree-shaking** 减少打包体积
- 复杂项目考虑 **模块联邦** 实现微前端架构
