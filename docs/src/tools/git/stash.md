# Git Stash 使用指南

## 什么是 Git Stash？

Git Stash 是一个临时存储工作区更改的功能，当你需要切换分支但又不想提交当前的修改时，这个功能非常有用。

## 常用命令

### 保存当前修改

```sh
# 保存当前修改（不包含未跟踪的文件）
git stash

# 保存当前修改（包含未跟踪的文件）
git stash -u

# 保存当前修改并添加描述信息
git stash save "修改了用户登录功能"
```

### 查看暂存的修改

```sh
# 查看所有暂存的修改列表
git stash list

# 查看最近一次暂存的具体内容
git stash show

# 查看最近一次暂存的详细修改内容
git stash show -p
```

### 恢复暂存的修改

```sh
# 恢复最近一次的暂存（同时保留暂存记录）
git stash apply

# 恢复最近一次的暂存（同时删除暂存记录）
git stash pop

# 恢复指定序号的暂存（例如 stash@{0}）
git stash apply stash@{1}

# 恢复指定序号并删除暂存记录
git stash pop stash@{0}
```

### 删除暂存记录

```sh
# 删除最近一次的暂存记录
git stash drop

# 删除指定序号的暂存记录
git stash drop stash@{0}

# 清空所有暂存记录
git stash clear
```

## 实用场景

### 场景一：临时切换分支

当你正在开发一个新功能，但突然需要紧急修复一个 bug 时：

```sh
# 1. 保存当前修改
git stash

# 2. 切换到修复分支
git checkout bugfix-branch

# 3. 修复 bug 并提交
git commit -m "修复了XX问题"

# 4. 切回原分支
git checkout feature-branch

# 5. 恢复之前的修改
git stash pop
```

### 场景二：避免合并冲突

当你的分支落后于主分支，需要先拉取最新代码时：

```sh
# 1. 先暂存本地修改
git stash

# 2. 拉取最新代码
git pull origin main

# 3. 恢复本地修改
git stash pop

# 4. 如果有冲突，解决冲突后继续开发
```

### 场景三：多人协作时临时保存

当你需要让别人帮忙检查代码，但又不方便直接提交时：

```sh
# 1. 暂存当前修改
git stash -u

# 2. 创建临时分支
git checkout -b temp-branch

# 3. 恢复修改
git stash pop

# 4. 提交临时分支让其他人查看
git commit -m "临时提交供审查"

# 5. 审查完后切回原分支
git checkout original-branch

# 6. 删除临时分支
git branch -D temp-branch
```

## 高级技巧

### 1. 从 stash 创建分支

```sh
# 从指定的 stash 创建新分支
git stash branch new-branch-name stash@{0}
```

### 2. 暂存特定文件

```sh
# 只暂存特定文件
git stash push -m "message" file1.js file2.css

# 暂存特定目录
git stash push -m "message" src/components/
```

### 3. 查看 stash 的提交信息

```sh
# 显示 stash 的详细信息，包括文件列表
git stash list --format='%gd: %s' --format='%gD %ci'

# 或者直接查看
git stash show -p stash@{0}
```

### 4. 工作流建议

::: tip 推荐实践
1. **及时清理**：完成恢复后及时删除不需要的 stash，避免堆积
2. **添加描述**：使用 `git stash save "描述信息"` 方便后续查找
3. **定期检查**：使用 `git stash list` 定期检查暂存列表
4. **不要过度依赖**：Stash 适合短期临时保存，长期开发建议使用分支
:::

## 注意事项

::: warning 重要提醒
- `git stash` 默认不会暂存忽略的文件（.gitignore 中的文件）
- `git stash pop` 在恢复失败时不会自动删除 stash 记录
- stash 是基于分支的，不同分支的 stash 列表是独立的
- 建议在 stash 描述中添加时间和任务信息，便于后续查找
:::

## 常见问题

### Q: stash 和 commit 有什么区别？

A: commit 会永久保存修改到版本历史，而 stash 只是临时存储，可以随时恢复或删除。

### Q: stash 可以跨分支使用吗？

A: stash 本身是跟分支绑定的，不能直接跨分支使用。但可以通过 `git stash show` 查看内容，然后在其他分支手动应用。

### Q: stash 太多怎么管理？

A: 建议：
1. 给每个 stash 起描述性名称
2. 定期清理不需要的 stash
3. 使用 `git stash list` 定期检查
4. 完成一个任务后及时删除相关的 stash
