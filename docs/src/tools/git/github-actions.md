# GitHub Actions CI/CD

## 简介

GitHub Actions 是 GitHub 提供的持续集成和持续部署（CI/CD）平台，可以自动化构建、测试和部署流程。

## 基本概念

- **Workflow**: 由一个或多个 Job 组成的自动化流程
- **Job**: 在同一 Runner 上执行的一组 Step
- **Step**: 单个任务，可以是 Action 或 Shell 命令
- **Action**: 可复用的自定义应用程序
- **Runner**: 执行 Workflow 的服务器

## 快速开始

### 创建第一个 Workflow

在项目根目录创建 `.github/workflows/` 文件夹，然后创建一个 YAML 文件，例如 `ci.yml`。

```yaml
name: CI

# 触发条件
on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      # 检出代码
      - name: Checkout code
        uses: actions/checkout@v4

      # 设置 Node.js 环境
      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      # 安装依赖
      - name: Install dependencies
        run: npm ci

      # 运行测试
      - name: Run tests
        run: npm test

      # 构建项目
      - name: Build
        run: npm run build
```

## 常用配置

### 1. 定时触发

```yaml
on:
  schedule:
    # 每天 UTC 00:00 执行
    - cron: '0 0 * * *'
```

### 2. 手动触发

```yaml
on:
  workflow_dispatch:
    inputs:
      environment:
        description: '部署环境'
        required: true
        default: 'staging'
        type: choice
        options:
          - staging
          - production
```

### 3. 矩阵策略

```yaml
jobs:
  build:
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [ubuntu-latest, windows-latest, macos-latest]
        node-version: [18, 20, 22]
    
    steps:
      - uses: actions/checkout@v4
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
```

### 4. 缓存依赖

```yaml
- name: Cache node modules
  uses: actions/cache@v4
  with:
    path: |
      ~/.npm
      node_modules
    key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
    restore-keys: |
      ${{ runner.os }}-node-
```

### 5. 部署到 GitHub Pages

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Pages
        uses: actions/configure-pages@v5
      - name: Build
        run: npm run build
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## 常用 Actions

### 1. checkout

```yaml
uses: actions/checkout@v4
```

### 2. setup-node

```yaml
uses: actions/setup-node@v4
with:
  node-version: '20'
  cache: 'npm'
```

### 3. cache

```yaml
uses: actions/cache@v4
with:
  path: path/to/dependencies
  key: ${{ runner.os }}-${{ hashFiles('**/lockfile') }}
```

### 4. upload-artifact / download-artifact

```yaml
# 上传
uses: actions/upload-artifact@v4
with:
  name: my-artifact
  path: path/to/artifact

# 下载
uses: actions/download-artifact@v4
with:
  name: my-artifact
```

## 环境变量和密钥

### 使用密钥

在 GitHub 仓库的 Settings → Secrets and variables → Actions 中添加密钥，然后在 Workflow 中使用：

```yaml
- name: Deploy
  env:
    API_KEY: ${{ secrets.API_KEY }}
  run: npm run deploy
```

### 自定义环境变量

```yaml
env:
  NODE_ENV: production
  APP_NAME: my-app

jobs:
  build:
    runs-on: ubuntu-latest
    env:
      BUILD_VERSION: ${{ github.sha }}
    steps:
      - run: echo $APP_NAME
```

## 条件执行

```yaml
- name: Deploy to Production
  if: github.ref == 'refs/heads/main'
  run: npm run deploy:prod
```

## 错误处理

```yaml
- name: Continue on error
  continue-on-error: true
  run: npm run test:flaky

- name: Retry on failure
  uses: nick-fields/retry@v3
  with:
    timeout_minutes: 10
    max_attempts: 3
    command: npm run deploy
```

## 实战示例：VitePress 自动部署

```yaml
name: Deploy VitePress

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm

      - name: Install pnpm
        uses: pnpm/action-setup@v3
        with:
          version: 9
          run_install: false

      - name: Get pnpm store directory
        shell: bash
        run: |
          echo "STORE_PATH=$(pnpm store path --silent)" >> $GITHUB_ENV

      - name: Setup pnpm cache
        uses: actions/cache@v4
        with:
          path: ${{ env.STORE_PATH }}
          key: ${{ runner.os }}-pnpm-store-${{ hashFiles('**/pnpm-lock.yaml') }}
          restore-keys: |
            ${{ runner.os }}-pnpm-store-

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Build
        run: pnpm run docs:build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./docs/.vitepress/dist
```

## 参考资源

- [GitHub Actions 官方文档](https://docs.github.com/en/actions)
- [GitHub Marketplace](https://github.com/marketplace?type=actions)
