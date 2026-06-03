# 前端环境变量配置指南

## 前言

环境变量在前端开发中用于管理不同环境（开发、测试、生产）的配置，正确使用环境变量可以提高应用的安全性和可维护性。

---

## 1. 环境变量基础

### 什么是环境变量

环境变量是在构建或运行时注入的配置值，用于区分不同环境的设置。

### 环境变量文件命名约定

```
.env                 # 默认，所有环境加载
.env.local          # 本地覆盖，不会被提交
.env.development    # 开发环境
.env.test           # 测试环境
.env.production     # 生产环境
.env.[mode]         # 自定义模式（如 .env.staging）
```

::: tip 优先级规则
环境变量文件按以下顺序加载，后者覆盖前者：
:::
`env文件` < `env.[mode]` < `env.[mode].local` < `env.local`

---

## 2. Vite 中使用环境变量

### 基本配置

```javascript
// #region ======================== Vite 环境变量配置 // #endregion ======================== End of Vite 环境变量配置

// .env 文件示例
VITE_APP_TITLE=我的应用
VITE_API_BASE_URL=https://api.example.com
VITE_ENABLE_LOGGING=true

// 以 VITE_ 开头的变量才会被暴露给客户端代码

// #endregion ======================== End of Vite 环境变量配置
```

### 在代码中使用

```javascript
// #region ======================== 访问环境变量 // #endregion ======================== End of 访问环境变量

// 在 JavaScript 中访问
console.log(import.meta.env.VITE_APP_TITLE);
console.log(import.meta.env.VITE_API_BASE_URL);

// 判断环境
if (import.meta.env.DEV) {
  console.log("开发环境");
}

if (import.meta.env.PROD) {
  console.log("生产环境");
}

if (import.meta.env.MODE === "test") {
  console.log("测试环境");
}

// #endregion ======================== End of 访问环境变量
```

### 在 HTML 中使用

```html
<!-- 在 index.html 中使用 -->
<title>%VITE_APP_TITLE%</title>
```

### 类型提示配置

```typescript
// #region ======================== 环境变量类型提示 // #endregion ======================== End of 环境变量类型提示

// src/env.d.ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_API_BASE_URL: string;
  readonly VITE_ENABLE_LOGGING: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// #endregion ======================== End of 环境变量类型提示
```

---

## 3. Webpack 中使用环境变量

### DefinePlugin 配置

```javascript
// #region ======================== Webpack 环境变量配置 // #endregion ======================== End of Webpack 环境变量配置

// webpack.config.js
const webpack = require("webpack");

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      "process.env.API_BASE_URL": JSON.stringify(process.env.API_BASE_URL),
    }),
  ],
};

// .env 文件
// API_BASE_URL=https://api.example.com

// #endregion ======================== End of Webpack 环境变量配置
```

### dotenv 使用

```javascript
// #region ======================== dotenv 配置 // #endregion ======================== End of dotenv 配置

// 安装：npm install dotenv
require("dotenv").config();

// 在代码中使用
console.log(process.env.API_BASE_URL);
console.log(process.env.VUE_APP_TITLE);

// #endregion ======================== End of dotenv 配置
```

---

## 4. 常见使用场景

### API 配置

```javascript
// #region ======================== API 环境配置 // #endregion ======================== End of API 环境配置

// 环境隔离的 API 地址
const apiConfig = {
  development: "http://localhost:3000/api",
  test: "https://test-api.example.com/api",
  production: "https://api.example.com/api",
};

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || apiConfig[import.meta.env.MODE];

// #endregion ======================== End of API 环境配置
```

### 功能开关

```javascript
// #region ======================== 功能开关配置 // #endregion ======================== End of 功能开关配置

// .env 文件
// VITE_ENABLE_ANALYTICS=true
// VITE_ENABLE_DEBUG_MODE=false

export const featureFlags = {
  enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === "true",
  enableDebugMode: import.meta.env.VITE_ENABLE_DEBUG_MODE === "true",
};

// 使用
if (featureFlags.enableAnalytics) {
  // 初始化分析工具
}

// #endregion ======================== End of 功能开关配置
```

### 第三方服务密钥

```javascript
// #region ======================== 第三方服务配置 // #endregion ======================== End of 第三方服务配置

// .env 文件
// VITE_MAP_API_KEY=your_map_api_key
// VITE_ANALYTICS_ID=your_analytics_id

export const thirdPartyConfig = {
  mapApiKey: import.meta.env.VITE_MAP_API_KEY,
  analyticsId: import.meta.env.VITE_ANALYTICS_ID,
};

// #endregion ======================== End of 第三方服务配置
```

---

## 5. 安全最佳实践

### 敏感信息保护

```javascript
// #region ======================== 安全最佳实践 // #endregion ======================== End of 安全最佳实践

// 1. 敏感密钥只用于服务端，绝不暴露到客户端
// 错误做法：将 SECRET_KEY 放在 .env 并以 VITE_ 开头

// 2. 使用 .env.local 或 .env.production.local 存储敏感配置
// 这些文件默认被 git 忽略

// 3. 不要将 secrets 提交到版本控制
// .env 文件应添加到 .gitignore

// 4. 生产环境使用服务器注入的环境变量
// 而非在代码仓库中存储敏感信息

// #endregion ======================== End of 安全最佳实践
```

### .gitignore 配置

```gitignore
# #region ======================== .gitignore 配置 // #endregion ======================== End of .gitignore 配置

# 环境变量文件（包含敏感信息）
.env
.env.local
.env.*.local

# 但保留模板文件
# !.env.example

# #endregion ======================== End of .gitignore 配置
```

---

## 6. 多环境配置示例

### Vite 多环境

```bash
# .env.development
VITE_API_BASE_URL=http://localhost:3000
VITE_ENABLE_LOGGING=true

# .env.staging
VITE_API_BASE_URL=https://staging-api.example.com
VITE_ENABLE_LOGGING=true

# .env.production
VITE_API_BASE_URL=https://api.example.com
VITE_ENABLE_LOGGING=false
```

### 构建指定环境

```bash
# #region ======================== 构建命令 // #endregion ======================== End of 构建命令

# 开发环境
npm run dev

# 测试环境打包
npm run build -- --mode staging

# 生产环境打包
npm run build

# #endregion ======================== End of 构建命令
```

---

## 7. 总结

- 使用以特定前缀（VITE_、REACT_APP_）开头的变量暴露给客户端
- 敏感信息绝不存储在前端环境变量中
- 利用 `.env.local` 文件进行本地覆盖
- 善用环境变量实现功能开关和环境隔离
- 保持环境变量文档的更新，确保团队成员了解配置含义
