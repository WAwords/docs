# 前端项目初始化与脚手架配置

本文档整理前端项目初始化流程、常用脚手架工具及最佳实践，帮助快速搭建高质量项目。

## 项目初始化流程

### 1. 确定项目需求

在开始项目前，需要明确以下问题：

- 项目类型（Web 应用、小程序、桌面应用等）
- 技术栈（框架、构建工具等）
- 项目规模与团队规模
- 部署环境

### 2. 选择合适的脚手架

根据项目需求选择合适的脚手架工具：

- **React 项目**：Vite、Create React App、Next.js
- **Vue 项目**：Vite、Vue CLI、Nuxt.js
- **多框架通用**：Vite、Create Vite App

---

## Vite 项目初始化

### 创建 React 项目

```bash
# 使用 npm
npm create vite@latest my-react-app -- --template react

# 使用 pnpm
pnpm create vite my-react-app --template react

# 使用 TypeScript
pnpm create vite my-react-app --template react-ts
```

### 创建 Vue 项目

```bash
# Vue 3 + JavaScript
pnpm create vite my-vue-app --template vue

# Vue 3 + TypeScript
pnpm create vite my-vue-app --template vue-ts
```

### 可用模板

Vite 官方提供以下模板：

- `vanilla`、`vanilla-ts`
- `vue`、`vue-ts`
- `react`、`react-ts`
- `preact`、`preact-ts`
- `lit`、`lit-ts`
- `svelte`、`svelte-ts`

---

## 基础项目配置

### 1. 配置 ESLint 与 Prettier

#### 安装依赖

```bash
# 安装 ESLint
pnpm add -D eslint

# 安装 Prettier 及相关插件
pnpm add -D prettier eslint-config-prettier eslint-plugin-prettier
```

#### 配置 Prettier

创建 `.prettierrc` 文件：

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "bracketSpacing": true,
  "arrowParens": "avoid"
}
```

创建 `.prettierignore` 文件：

```
node_modules
dist
.DS_Store
*.log
```

#### 配置 ESLint

创建 `.eslintrc.cjs` 文件：

```js
module.exports = {
  root: true,
  env: { browser: true, es2020: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended'
  ],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true }
    ],
    'react/react-in-jsx-scope': 'off',
    'no-console': 'warn'
  }
};
```

### 2. 配置 Husky 与 lint-staged

#### 安装与初始化

```bash
# 安装 Husky
pnpm add -D husky

# 初始化
npx husky install

# 添加 prepare 脚本到 package.json
npm set-script prepare "husky install"
```

#### 配置 commit 钩子

```bash
# 添加 pre-commit 钩子
npx husky add .husky/pre-commit "npx lint-staged"
```

#### 配置 lint-staged

在 `package.json` 中添加：

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": ["eslint --fix"],
    "*.{js,jsx,ts,tsx,json,css,md}": ["prettier --write"]
  }
}
```

### 3. 配置路径别名

在 `vite.config.ts` 中配置：

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});
```

在 `tsconfig.json` 中配置（TypeScript 项目）：

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

---

## 环境变量配置

### 创建环境变量文件

```
.env                # 所有环境都会加载
.env.local          # 所有环境都会加载，会被 git 忽略
.env.[mode]         # 只在指定模式下加载
.env.[mode].local   # 只在指定模式下加载，会被 git 忽略
```

### 环境变量使用

```bash
# .env.development
VITE_APP_TITLE=开发环境
VITE_API_BASE_URL=http://localhost:3000/api

# .env.production
VITE_APP_TITLE=生产环境
VITE_API_BASE_URL=https://api.example.com
```

在代码中使用：

```ts
console.log(import.meta.env.VITE_APP_TITLE);
console.log(import.meta.env.VITE_API_BASE_URL);
```

::: warning 注意
只有以 `VITE_` 开头的变量才会暴露到客户端代码中。
:::

---

## 项目结构建议

### React 项目结构

```
src/
├── assets/           # 静态资源
│   ├── images/
│   └── styles/
├── components/       # 通用组件
│   ├── Button/
│   └── Input/
├── hooks/           # 自定义 Hooks
│   └── useAuth.ts
├── layouts/         # 布局组件
│   └── MainLayout.tsx
├── pages/           # 页面组件
│   ├── Home/
│   └── About/
├── services/        # API 服务
│   └── api.ts
├── stores/          # 状态管理
│   └── userStore.ts
├── utils/           # 工具函数
│   └── format.ts
├── types/           # TypeScript 类型定义
│   └── index.ts
├── App.tsx
├── main.tsx
└── vite-env.d.ts
```

### Vue 项目结构

```
src/
├── assets/           # 静态资源
├── components/       # 通用组件
├── composables/      # 组合式函数
├── layouts/         # 布局组件
├── views/           # 页面组件
├── router/          # 路由配置
├── stores/          # 状态管理
├── utils/           # 工具函数
├── types/           # 类型定义
├── App.vue
└── main.ts
```

---

## 常用工具库推荐

### 状态管理

- **React**：Zustand、Jotai、Redux Toolkit
- **Vue**：Pinia、Vuex

### 路由

- **React**：React Router
- **Vue**：Vue Router

### UI 组件库

- **React**：Ant Design、Material-UI、Chakra UI
- **Vue**：Element Plus、Ant Design Vue、Naive UI

### 工具函数

- Lodash / Lodash-es
- Day.js 或 date-fns（日期处理）
- Axios（HTTP 请求）
- classnames 或 clsx（类名拼接）

---

## package.json 脚本配置

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "lint:fix": "eslint . --ext ts,tsx --fix",
    "format": "prettier --write \"src/**/*.{ts,tsx,css,md,json}\"",
    "prepare": "husky install"
  }
}
```

---

## 总结

良好的项目初始化配置能够：

1. 提升开发效率
2. 保证代码质量
3. 统一团队规范
4. 降低维护成本

根据项目实际需求，灵活选择和调整配置方案。
