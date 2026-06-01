# 代码提交规范

## 概述

代码提交规范是团队协作中非常重要的一环，良好的提交信息可以帮助团队成员快速了解代码变更的历史和目的。

## 提交信息格式

### 基础格式

```
<类型>(<范围>): <简短描述>

[可选的正文]

[可选的脚注]
```

### 提交类型

| 类型 | 描述 |
|------|------|
| `feat` | 新功能 |
| `fix` | 修复 bug |
| `docs` | 文档变更 |
| `style` | 代码格式调整，不影响代码逻辑 |
| `refactor` | 重构代码 |
| `perf` | 性能优化 |
| `test` | 添加或修改测试 |
| `chore` | 构建过程或辅助工具的变动 |

### 实际示例

```bash
feat(用户模块): 添加用户登录功能

- 实现用户名密码登录
- 添加 token 验证机制
- 优化错误处理

关闭 #123

feat(auth): 实现第三方登录集成

新增 GitHub 和 Google 登录支持
修复 token 刷新机制中的竞态条件
相关问题: #456
```

## Git 钩子配置

### 安装 husky

```bash
npm install husky --save-dev
npx husky install
```

### 配置提交信息验证

在 `.husky/commit-msg` 中添加验证脚本：

```bash
#!/bin/sh
. "$(dirname "$0")/_/shell.sh"

npx --no-install commitlint --edit "$1"
```

## 最佳实践

- 每次提交只做一件事
- 提交信息应该清晰、简洁
- 使用祈使语气描述变更
- 详细说明为什么要做这个变更
- 关联相关的 Issue 或 PR 编号

## 相关资源

- [Conventional Commits 规范](https://www.conventionalcommits.org/)
- [Git 最佳实践](./git/commands.md)
