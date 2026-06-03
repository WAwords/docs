# Husky 与 lint-staged 自动化工作流

## 前言

在团队协作中，保持代码风格统一是基础。ESLint 和 Prettier 可以检查和格式化代码，但如果依赖开发者手动运行，未免太不可靠。Husky 和 lint-staged 可以将代码检查集成到 Git 工作流中，在提交代码时自动执行检查和格式化。

---

## 1. Husky 简介

Husky 是一个 Git 钩子工具，可以让你在 Git 操作（如 commit、push）时触发自定义脚本。

### 工作原理

Git 钩子是一系列在特定 Git 事件发生时执行的脚本。Husky 将这些钩子配置从 `.git/hooks` 目录提取到项目根目录的 `.husky` 文件夹中，方便版本控制和团队共享。

### 安装与初始化

```bash
// #region ======================== Husky 安装步骤 // #endregion ======================== End of Husky 安装步骤

// 1. 安装 husky 和 lint-staged
npm install -D husky lint-staged

// 2. 初始化 husky（创建 .husky 目录）
npx husky init

// 3. 查看生成的配置
ls -la .husky

// #endregion ======================== End of Husky 安装步骤
```

### 创建 Git 钩子

```bash
// #region ======================== 创建 Git 钩子 // #endregion ======================== End of 创建 Git 钩子

// 创建 pre-commit 钩子（在代码提交前执行）
npx husky add .husky/pre-commit "npm test"

// 创建 commit-msg 钩子（在提交信息验证时执行）
npx husky add .husky/commit-msg "npx commitlint --edit $1"

// 创建 pre-push 钩子（在代码推送前执行）
npx husky add .husky/pre-push "npm run build"

// #endregion ======================== End of 创建 Git 钩子
```

生成的 `.husky/pre-commit` 文件内容类似：

```shell
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npm test
```

---

## 2. lint-staged 简介

lint-staged 是针对已暂存（staged）文件执行任务的工具。它只处理将要提交的文件，避免对整个项目进行耗时的检查。

### 工作流程

```
git add file.js    →    文件被暂存
      ↓
git commit         →    Husky 触发 pre-commit 钩子
      ↓
lint-staged        →    只检查已暂存的文件
      ↓
通过检查           →    提交成功
      ↓
未通过检查         →    提交失败（需修复后重新提交）
```

### 配置 lint-staged

在 `package.json` 中配置：

```json
// #region ======================== lint-staged 配置示例 // #endregion ======================== End of lint-staged 配置示例

{
  "lint-staged": {
    "*.{js,ts,jsx,tsx,vue}": [
      "eslint --fix",
      "prettier --write",
      "git add"
    ],
    "*.{css,scss,less}": [
      "stylelint --fix",
      "prettier --write",
      "git add"
    ],
    "*.{json,md,yml,yaml}": [
      "prettier --write",
      "git add"
    ]
  }
}

// #endregion ======================== End of lint-staged 配置示例
```

或者在根目录创建 `.lintstagedrc` 配置文件：

```json
// #region ======================== .lintstagedrc 配置示例 // #endregion ======================== End of .lintstagedrc 配置示例

{
  "*.{js,ts,jsx,tsx,vue}": ["eslint --fix", "prettier --write"],
  "*.{css,scss,less}": ["stylelint --fix", "prettier --write"],
  "*.{json,md,yml,yaml}": "prettier --write"
}

// #endregion ======================== End of .lintstagedrc 配置示例
```

---

## 3. 完整集成配置

### 修改 pre-commit 钩子

编辑 `.husky/pre-commit` 文件：

```shell
// #region ======================== pre-commit 钩子配置 // #endregion ======================== End of pre-commit 钩子配置

#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged

// #endregion ======================== End of pre-commit 钩子配置
```

### package.json 完整配置示例

```json
// #region ======================== package.json 完整配置 // #endregion ======================== End of package.json 完整配置

{
  "name": "my-project",
  "scripts": {
    "lint": "eslint . --ext .js,.ts,.jsx,.tsx,.vue",
    "lint:fix": "eslint . --fix",
    "format": "prettier --write \"**/*.{js,ts,jsx,tsx,vue,css,md,json,yml,yaml}\"",
    "prepare": "husky install"
  },
  "lint-staged": {
    "*.{js,ts,jsx,tsx,vue}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{css,scss,less}": [
      "stylelint --fix",
      "prettier --write"
    ],
    "*.{json,md,yml,yaml}": [
      "prettier --write"
    ]
  },
  "devDependencies": {
    "husky": "^9.0.0",
    "lint-staged": "^15.0.0",
    "eslint": "^8.0.0",
    "prettier": "^3.0.0"
  }
}

// #endregion ======================== End of package.json 完整配置
```

---

## 4. 常见问题与解决方案

### 问题一：提交被拒绝但没有错误信息

```bash
// #region ======================== 调试提交问题 // #endregion ======================== End of 调试提交问题

// 1. 直接运行 lint-staged 查看详细输出
npx lint-staged --debug

// 2. 跳过 Husky 钩子进行测试（不推荐用于正式提交）
git commit -m "message" --no-verify

// 3. 查看 ESLint 详细错误
npm run lint

// #endregion ======================== End of 调试提交问题
```

### 问题二：Windows 环境下 Husky 钩子不执行

```bash
// #region ======================== Windows 环境修复 // #endregion ======================== End of Windows 环境修复

// 1. 确保 .husky 目录下文件有执行权限
git update-index --add --chmod=+x .husky/pre-commit
git update-index --add --chmod=+x .husky/commit-msg

// 2. 或在 package.json 的 prepare 脚本中设置
"prepare": "husky install && git update-index --add --chmod=+x .husky/_/*"

// #endregion ======================== End of Windows 环境修复
```

### 问题三：大型项目 lint-staged 运行缓慢

```json
// #region ======================== 优化 lint-staged 性能 // #endregion ======================== End of 优化 lint-staged 性能

{
  "lint-staged": {
    "*.{js,ts,jsx,tsx,vue}": [
      "eslint --cache",        // 启用缓存加速
      "prettier --write"
    ]
  }
}

// 在 .eslintrc 中启用缓存
{
  "flags": ["--cache"]
}

// #endregion ======================== End of 优化 lint-staged 性能
```

---

## 5. 最佳实践清单

- [ ] 安装 Husky 并初始化
- [ ] 配置 lint-staged 针对不同文件类型执行相应检查
- [ ] 将 ESLint、Prettier 等工具集成到 lint-staged 流程中
- [ ] 添加 commit-msg 钩子验证提交信息格式
- [ ] 在 CI/CD 环境中也执行相同的代码检查
- [ ] 定期更新 husky 和 lint-staged 版本
- [ ] 为团队成员提供清晰的提交规范文档

---

## 6. 相关资源

- [ESLint 与 Prettier 配置](/frontend/eslint-prettier)
- [Git 使用命令](/tools/git/commands)
- [Git 提交规范](/guidelines/commit)

---

## 总结

Husky 和 lint-staged 的组合是前端工程化中不可或缺的工具。它们可以确保团队成员提交的代码都经过统一检查和格式化，减少代码审查中的格式问题，让我们更专注于代码本身的质量。
