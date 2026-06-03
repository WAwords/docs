# Bun 使用指南

## 简介

Bun 是一个高速的 JavaScript 运行时、包管理器和打包工具，旨在成为 Node.js 的替代品。它使用 Zig 编写，在性能上相比 Node.js 有显著提升。

## 核心优势

- **极速启动**：比 Node.js 启动速度快数倍
- **内置打包工具**：自带 bundler 功能，无需额外安装
- **兼容 Node.js**：支持大部分 Node.js API 和 npm 包
- **TypeScript 原生支持**：无需额外配置即可运行 TypeScript
- **内置包管理器**：安装速度比 npm/yarn/pnpm 更快

## 安装

### macOS/Linux

```bash
curl -fsSL https://bun.sh/install | bash
```

### Windows

```powershell
powershell -c "irm bun.sh/install.ps1 | iex"
```

### 使用 npm 安装

```bash
npm install -g bun
```

### 更新 Bun

```bash
bun --upgrade
```

## 常用命令

### 运行时命令

```bash
# 运行 JavaScript 文件
bun run index.js

# 运行 TypeScript 文件
bun run index.ts

# 运行 package.json 中的脚本
bun run dev
bun run build
bun test
```

### 包管理命令

```bash
# 安装所有依赖
bun install

# 安装指定包
bun add <package>

# 开发依赖
bun add -d <package>

# 移除包
bun remove <package>

# 更新包
bun update
```

### 工具命令

```bash
# 创建新项目
bun create <template> <project-name>

# 初始化新项目
bun init

# 更新依赖
bun update

# 漏洞检测
bun audit
```

## Bun 特有的功能

### 内置 TypeScript 支持

Bun 原生支持 TypeScript，可直接运行 `.ts` 文件无需编译：

```typescript
// index.ts
const greet = (name: string): string => {
  return `Hello, ${name}!`;
};

console.log(greet("Bun"));
```

直接运行：

```bash
bun index.ts
```

### 内置 SQLite 支持

```typescript
import { Database } from "bun:sqlite";

const db = new Database(":memory:");
db.run("CREATE TABLE users (name TEXT, age INTEGER)");

db.run("INSERT INTO users VALUES ('Alice', 25)");
db.run("INSERT INTO users VALUES ('Bob', 30)");

const result = db.query("SELECT * FROM users").all();
console.log(result);
```

### 内置 file system glob

```typescript
import { glob } from "bun";

const files = await glob("**/*.ts");
for await (const file of files) {
  console.log(file);
}
```

### Bun.write 快速写入

```typescript
await Bun.write("./output.txt", "Hello Bun!");
```

### HTTP 服务

```typescript
Bun.serve({
  port: 3000,
  fetch(req) {
    return new Response("Hello from Bun!");
  },
});
```

## 与 Node.js 的差异

| 特性 | Bun | Node.js |
|------|-----|--------|
| 启动速度 | 极快 | 较慢 |
| TypeScript | 原生支持 | 需要编译 |
| 包安装速度 | 极快 | 较慢 |
| SQLite 支持 | 内置 | 需要第三方库 |
| Fetch API | 原生支持 | 原生支持 |
| npm 兼容性 | 高 | 完全兼容 |

## 常见问题

### Bun 与 Node.js 模块的兼容性

Bun 兼容大部分 Node.js 模块，但少数模块可能存在差异。遇到问题时可：

1. 检查官方兼容性列表
2. 使用 `bun:compat` 适配层
3. 回退到 Node.js

### 全局包安装

```bash
# 安装全局工具
bun add -g <package>

# 列出全局包
bun pm global ls
```

### 使用 Bun 运行脚本

在 package.json 中指定运行时：

```json
{
  "script": {
    "dev": "bun --watch run dev.ts"
  }
}
```

## 最佳实践

1. **迁移策略**：逐步将项目迁移到 Bun，先从脚本工具开始
2. **使用 --bun 标志**：在 shebang 中使用 `#!/usr/bin/env bun` 确保使用 Bun 运行
3. **利用原生功能**：使用 Bun 内置的 SQLite、HTTP 等功能减少依赖
4. **测试兼容**：在迁移前充分测试，确保关键依赖正常工作

## 相关资源

- [Bun 官方文档](https://bun.sh/)
- [Bun GitHub 仓库](https://github.com/oven-sh/bun)
- [Bun 官方 Discord](https://discord.gg/bun)
