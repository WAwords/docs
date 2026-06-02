# npm scripts 使用技巧

## 基本概念

`npm scripts` 是定义在 `package.json` 中的脚本命令，可以通过 `npm run` 或 `yarn` 执行。

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

## 常用技巧

### 1. 组合多个命令

#### 使用 `&&` 顺序执行

```json
{
  "scripts": {
    "build": "npm run clean && npm run compile"
  }
}
```

#### 使用 `&` 并行执行

```json
{
  "scripts": {
    "dev": "npm run server & npm run client"
  }
}
```

#### 使用 `|` 管道传递

```json
{
  "scripts": {
    "log": "npm run build | head -n 10"
  }
}
```

### 2. 使用 npm-run-all 并行/串行执行

```json
{
  "scripts": {
    "build": "npm-run-all --parallel build:*"
  }
}
```

#### 串行执行（一个完成再执行下一个）

```json
{
  "scripts": {
    "build": "npm-run-all --serial clean compile test"
  }
}
```

#### 并行执行（同时执行多个）

```json
{
  "scripts": {
    "dev": "npm-run-all --parallel dev:*"
  }
}
```

### 3. 使用环境变量

```json
{
  "scripts": {
    "dev": "NODE_ENV=development vite",
    "build": "NODE_ENV=production vite build"
  }
}
```

#### 跨平台兼容的环境变量设置

安装 `cross-env`：

```sh
npm install --save-dev cross-env
```

使用：

```json
{
  "scripts": {
    "dev": "cross-env NODE_ENV=development vite"
  }
}
```

### 4. 传递参数

#### 使用 `--` 传递参数

```json
{
  "scripts": {
    "test": "vitest --run"
  }
}
```

运行：

```sh
npm run test -- --coverage
```

#### 使用环境变量传递

```json
{
  "scripts": {
    "serve": "vite --port $PORT"
  }
}
```

运行：

```sh
PORT=3000 npm run serve
```

### 5. 使用占位符

```json
{
  "scripts": {
    "build:es": "esbuild src/index.js --outdir=dist --format=esm",
    "build:cjs": "esbuild src/index.js --outdir=dist --format=cjs"
  }
}
```

### 6. 清理脚本

```json
{
  "scripts": {
    "clean": "rimraf dist coverage"
  }
}
```

### 7. 监听文件变化

```json
{
  "scripts": {
    "watch": "vitest --watch"
  }
}
```

### 8. 常用的脚本命名约定

| 脚本名 | 用途 |
|--------|------|
| `start` | 启动开发服务器 |
| `dev` | 开发模式 |
| `build` | 构建生产版本 |
| `preview` | 预览构建结果 |
| `test` | 运行测试 |
| `lint` | 代码检查 |
| `format` | 代码格式化 |
| `clean` | 清理临时文件 |
| `deploy` | 部署 |

### 9. 使用 pre 和 post 钩子

npm 会自动运行 `pre` 和 `post` 钩子：

```json
{
  "scripts": {
    "prebuild": "npm run clean",
    "build": "vite build",
    "postbuild": "npm run upload"
  }
}
```

### 10. 私有脚本

以 `_` 开头的脚本不会显示在 `npm run` 列表中：

```json
{
  "scripts": {
    "_internal": "some command"
  }
}
```

## 实用示例

### 完整的开发工作流

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest",
    "test:coverage": "vitest --coverage",
    "lint": "eslint src --ext .vue,.js,.ts",
    "lint:fix": "eslint src --ext .vue,.js,.ts --fix",
    "format": "prettier --write \"src/**/*.{vue,js,ts,json}\"",
    "clean": "rimraf dist coverage",
    "prepare": "husky install"
  }
}
```

### Git Hooks 集成

安装 husky：

```sh
npm install --save-dev husky
```

配置：

```json
{
  "scripts": {
    "prepare": "husky install"
  }
}
```

添加 hook：

```sh
npx husky add .husky/pre-commit "npm run lint"
```

## 最佳实践

1. **保持简洁**：脚本命令不要太长，复杂的逻辑放到单独的文件中
2. **添加注释**：在 `package.json` 中添加清晰的脚本说明
3. **跨平台兼容**：使用 `cross-env`、`rimraf` 等跨平台工具
4. **使用工具**：善用 `npm-run-all`、`concurrently` 等工具简化脚本
5. **文档化**：编写 README 说明项目的 scripts 用法
