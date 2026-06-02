# Git 工作流程指南

## 分支命名规范

```sh
# 功能分支
feature/功能名称

# 修复分支
fix/问题描述

# 发布分支
release/版本号

# 热修复分支
hotfix/问题描述
```

## 常用工作流程

### 1. 功能开发流程

```sh
# 从 main 分支创建功能分支
git checkout main
git pull origin main
git checkout -b feature/新功能名称

# 开发完成后，提交代码
git add .
git commit -m "【新增】新功能描述"

# 推送功能分支到远程
git push -u origin feature/新功能名称
```

### 2. 代码审查与合并

```sh
# 在 GitHub/GitLab 上创建 Pull Request
# 等待代码审查通过后，进行合并

# 合并完成后，删除功能分支
git checkout main
git pull origin main
git branch -d feature/新功能名称
```

### 3. 紧急修复流程

```sh
# 从 main 分支创建热修复分支
git checkout -b hotfix/紧急问题描述

# 修复完成后，提交并推送
git commit -m "【修复】紧急问题描述"
git push -u origin hotfix/紧急问题描述

# 合并后，删除热修复分支
git checkout main
git merge hotfix/紧急问题描述
git branch -d hotfix/紧急问题描述
```

## 团队协作技巧

### 保持分支最新

```sh
# 定期从 main 分支拉取最新代码
git fetch origin main
git rebase origin/main

# 或者使用 merge
git merge origin/main
```

### 暂存工作进度

```sh
# 暂存当前工作进度
git stash save "工作进度描述"

# 查看暂存列表
git stash list

# 恢复暂存的工作进度
git stash apply stash@{0}

# 删除暂存记录
git stash drop stash@{0}
```

### 撤销操作

```sh
# 撤销工作区的修改
git checkout -- filename

# 撤销暂存区的修改
git reset HEAD filename

# 撤销提交（保留修改）
git reset --soft HEAD~1

# 撤销提交（不保留修改）
git reset --hard HEAD~1
```

## 提交信息规范

### 格式

```sh
git commit -m "【类型】简短描述"
```

### 常用类型

```sh
【新增】添加新功能
【修复】修复问题
【优化】优化代码
【重构】重构代码
【文档】更新文档
【测试】添加测试
【样式】样式修改
【性能】性能优化
```

## 最佳实践

1. **频繁提交**：尽早提交，避免大量代码堆积
2. **清晰描述**：提交信息要清晰准确，便于追溯
3. **代码审查**：重要功能必须经过代码审查
4. **保持同步**：定期从主分支拉取最新代码
5. **分支管理**：合并后及时删除不需要的分支
