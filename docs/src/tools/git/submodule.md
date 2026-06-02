# Git Submodule 子模块使用指南

## 什么是 Git Submodule？

Git Submodule 是 Git 提供的一种机制，允许在一个 Git 仓库中嵌套另一个 Git 仓库。被嵌套的仓库作为子模块存在，主仓库可以精确地引用子模块的某个特定提交，从而实现依赖管理的目的。

## 为什么需要 Submodule？

在实际开发中，我们经常会遇到以下场景：

1. **公共库管理**：多个项目共享同一个工具库或组件库
2. **微服务架构**：主项目依赖多个独立的微服务代码
3. **文档管理**：代码仓库和文档仓库分离但需要关联
4. **第三方依赖**：需要追踪第三方库的具体版本

## 基本操作

### 添加子模块

```sh
# 添加子模块（默认使用 master/main 分支）
git submodule add https://github.com/example/lib-utils.git libs/utils

# 添加子模块到指定分支
git submodule add -b develop https://github.com/example/lib-utils.git libs/utils

# 添加子模块并指定名称
git submodule add https://github.com/example/lib-utils.git my-custom-name
```

### 查看子模块状态

```sh
# 查看所有子模块状态
git submodule status

# 查看子模块详细信息
git submodule status -v

# 查看子模块列表
cat .gitmodules
```

### 克隆包含子模块的仓库

```sh
# 克隆主仓库（子模块目录为空）
git clone https://github.com/example/main-project.git

# 初始化子模块
git submodule init

# 更新子模块（下载子模块代码）
git submodule update

# 或者一步到位
git clone --recurse-submodules https://github.com/example/main-project.git
```

### 更新子模块

```sh
# 更新到子模块仓库的最新提交
cd libs/utils
git fetch origin
git checkout main
git pull origin main
cd ../..
git add libs/utils
git commit -m "更新子模块到最新版本"

# 更新子模块到某个特定的提交
cd libs/utils
git checkout abc123
cd ../..
git add libs/utils
git commit -m "将子模块回退到特定版本"
```

### 删除子模块

删除子模块稍微复杂一些，需要以下步骤：

```sh
# 1. 从暂存区移除子模块
git submodule deinit -f libs/utils

# 2. 从版本控制中移除子模块
git rm -f libs/utils

# 3. 删除子模块的 Git 目录
rm -rf .git/modules/libs/utils

# 4. 提交更改
git commit -m "移除子模块 libs/utils"

# 5. 推送到远程
git push origin main
```

## 实用场景

### 场景一：管理公共组件库

假设我们有多个前端项目，都需要使用同一个 UI 组件库：

```sh
# 在主项目中添加子模块
git submodule add https://github.com/your-team/ui-components.git src/components/ui

# 更新组件库
cd src/components/ui
git pull origin main
cd ../..
git add src/components/ui
git commit -m "更新 UI 组件库"

# 团队成员拉取更新
git submodule update --remote src/components/ui
```

### 场景二：管理微前端子应用

在微前端架构中，主应用需要管理多个子应用：

```sh
# 添加多个子应用作为子模块
git submodule add https://github.com/your-team/app-dashboard.git apps/dashboard
git submodule add https://github.com/your-team/app-settings.git apps/settings
git submodule add https://github.com/your-team/app-analytics.git apps/analytics

# 查看所有子模块状态
git submodule status
```

### 场景三：分离文档仓库

很多项目将文档放在单独的仓库中：

```sh
# 将文档仓库作为子模块添加到项目中
git submodule add https://github.com/your-team/docs.git docs

# 在 CI/CD 中自动构建文档
git submodule update --remote --merge docs
```

## 高级技巧

### 1. 子模块的递归操作

```sh
# 对所有子模块执行命令
git submodule foreach 'git checkout -b feature'

# 对所有子模块执行 pull
git submodule foreach 'git pull origin main'

# 对所有子模块执行状态检查
git submodule foreach 'git status'
```

### 2. 子模块的推送

```sh
# 推送子模块更改（必须在子模块目录中）
cd libs/utils
git push origin main

# 或者让主项目自动检测并推送
git push --recurse-submodules=check

# 强制推送所有子模块
git push --recurse-submodules=on-demand
```

### 3. 子模块的分支管理

```sh
# 查看子模块的所有分支
cd libs/utils
git branch -a

# 在子模块中创建新分支
cd libs/utils
git checkout -b develop

# 将子模块切换到特定分支
cd libs/utils
git checkout main
```

### 4. 子模块的差异对比

```sh
# 查看子模块相对于主项目记录的变化
git diff --cached libs/utils

# 查看子模块工作区的变化
cd libs/utils && git diff
```

## 常见问题

### Q: 子模块目录显示为空？

A: 这通常是因为克隆时没有初始化子模块，执行以下命令即可：

```sh
git submodule init
git submodule update
```

### Q: 子模块无法更新？

A: 检查以下几点：

1. 是否有子模块的写权限
2. 子模块的远程仓库是否可用
3. 指定的分支是否存在

```sh
cd libs/utils
git fetch origin
git log --oneline origin/main
```

### Q: 子模块冲突如何解决？

A: 子模块冲突通常是因为主项目引用的提交和本地子模块的提交不一致：

```sh
# 方法一：使用远程最新版本
git submodule update --remote libs/utils

# 方法二：手动解决
cd libs/utils
git stash
git checkout main
git pull origin main
cd ..
git add libs/utils
git commit -m "解决子模块冲突"
```

### Q: 如何查看子模块的历史记录？

A: 在子模块目录中查看：

```sh
cd libs/utils
git log --oneline -10
```

或者查看主项目中子模块的引用历史：

```sh
git log --oneline --submodule
```

## 最佳实践

::: tip 推荐实践

1. **明确子模块的用途**：只在确实需要独立版本控制时才使用子模块

2. **指定固定版本**：在主项目中始终使用具体的提交 SHA，而不是依赖分支最新提交

3. **保持同步更新**：定期更新子模块，获取上游的 bug 修复和安全更新

4. **清晰的命名**：使用有意义的子模块目录名称，便于理解项目结构

5. **文档化子模块信息**：在项目的 README 中记录所有子模块的用途和更新方式

6. **设置默认分支**：明确子模块使用的分支（推荐使用 main 或 master）

7. **权限管理**：确保团队成员对所有子模块仓库都有适当的访问权限

:::

::: warning 注意事项

- 子模块会增加项目的复杂度，评估是否真的需要使用
- 子模块的更新需要额外的手动操作，不要忽略更新
- 在 CI/CD 中需要特殊配置才能正确处理子模块
- 删除子模块时要小心，确保不再需要该依赖
- 多人协作时，要协调好子模块的更新节奏

:::

## CI/CD 集成

### GitHub Actions

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          submodules: true  # 自动克隆子模块

      - name: Update submodules
        run: |
          git submodule update --remote --merge
```

### GitLab CI

```yaml
variables:
  GIT_SUBMODULE_STRATEGY: recursive

build:
  script:
    - git submodule update --remote --merge
    - npm install
    - npm run build
```

## 总结

Git Submodule 是一个强大的工具，可以帮助我们管理复杂的项目依赖关系。但使用时需要谨慎，确保团队成员都理解其工作原理。通过本指南的学习，你应该能够：

- 熟练添加、更新和删除子模块
- 理解子模块在团队协作中的应用场景
- 掌握子模块的高级操作技巧
- 在 CI/CD 流程中正确处理子模块
- 避免使用子模块时的常见陷阱

合理使用子模块，可以让项目管理更加清晰和高效！
