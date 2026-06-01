# Git Rebase 使用指南

## 什么是 Git Rebase？

Git Rebase 是一种将一个分支的提交移动或合并到另一个分支的方法。与 merge 不同，rebase 会重写提交历史，使提交线更加线性清晰。

## 基本概念

### Rebase 与 Merge 的区别

| 特性 | Merge | Rebase |
|------|-------|--------|
| 提交历史 | 保留完整历史，包含合并节点 | 线性历史，无合并节点 |
| 冲突处理 | 一次性处理所有冲突 | 逐个提交处理冲突 |
| 适用场景 | 公共分支 | 个人特性分支 |
| 历史改写 | 不改写 | 改写历史 |

## 常用命令

### 基础用法

```sh
# 将当前分支基于目标分支进行 rebase
git rebase <目标分支>

# 交互式 rebase，允许修改提交历史
git rebase -i <目标分支>

# 从指定提交开始 rebase
git rebase -i <commit-id>

# 中止 rebase 操作
git rebase --abort

# 继续 rebase（解决冲突后）
git rebase --continue

# 跳过当前提交
git rebase --skip
```

### 交互式 Rebase

交互式 rebase 提供了强大的历史编辑能力：

```sh
git rebase -i HEAD~3
```

这会打开一个编辑器，显示最近 3 个提交：

```
pick abc1234 第一次提交
pick def5678 第二次提交
pick ghi9012 第三次提交

# 命令说明：
# p, pick = 使用提交
# r, reword = 使用提交，但修改提交信息
# e, edit = 使用提交，但暂停以便修改
# s, squash = 使用提交，但合并到前一个提交
# f, fixup = 类似 squash，但丢弃提交信息
# d, drop = 移除提交
```

## 实用场景

### 场景一：保持特性分支整洁

在开发特性分支时，定期将主分支的更新合并到特性分支：

```sh
# 切换到特性分支
git checkout feature-login

# 将特性分支基于 main 分支重新提交
git rebase main

# 如果有冲突，解决冲突后继续
git add .
git rebase --continue
```

### 场景二：合并多个提交

将多个小提交合并为一个清晰的提交：

```sh
# 将最近 3 个提交合并
git rebase -i HEAD~3

# 在编辑器中将后续提交改为 squash
pick abc1234 实现登录功能
s def5678 修复登录按钮样式
s ghi9012 更新测试用例
```

### 场景三：修改历史提交信息

```sh
# 修改最近一个提交的信息
git rebase -i HEAD~1

# 将 pick 改为 reword
r abc1234 原提交信息

# 保存后会打开编辑器修改提交信息
```

### 场景四：删除错误提交

```sh
# 查看提交历史
git log --oneline

# 删除指定提交
git rebase -i <要删除提交的前一个提交ID>

# 在编辑器中将该提交改为 drop
d abc1234 错误的提交
```

## 解决冲突

### 冲突产生的原因

当两个分支修改了同一文件的同一位置时，rebase 会暂停并提示冲突。

### 解决步骤

```sh
# 1. 查看冲突文件
git status

# 2. 手动编辑冲突文件，解决冲突
# 冲突标记：
# <<<<<<< HEAD
# 当前分支的内容
# =======
# 要合并的内容
# >>>>>>> commit-id

# 3. 添加解决后的文件
git add <冲突文件>

# 4. 继续 rebase
git rebase --continue

# 如果需要跳过当前提交
git rebase --skip

# 如果需要完全中止 rebase
git rebase --abort
```

## 高级技巧

### 自动解决冲突

```sh
# 使用 ours 策略（保留当前分支的修改）
git rebase -X ours <目标分支>

# 使用 theirs 策略（保留要合并分支的修改）
git rebase -X theirs <目标分支>
```

### 在特定提交处暂停

```sh
git rebase -i HEAD~5

# 将需要修改的提交改为 edit
e abc1234 需要修改的提交

# rebase 会在该提交处暂停，可以修改代码
git add .
git commit --amend

# 继续 rebase
git rebase --continue
```

### 从远程分支拉取并 rebase

```sh
# 拉取远程主分支并 rebase
git pull --rebase origin main
```

## 注意事项

::: warning 重要提醒
1. **不要在公共分支上使用 rebase**：会改写历史，导致团队成员的提交混乱
2. **rebase 会改变提交 ID**：所有被 rebase 的提交都会生成新的 ID
3. **及时备份**：在执行复杂 rebase 前，建议创建临时分支作为备份
4. **理解风险**：rebase 是破坏性操作，可能丢失提交
:::

## 最佳实践

::: tip 推荐实践
1. **只在个人分支使用**：rebase 适合整理个人特性分支的提交历史
2. **保持提交粒度合理**：一个提交应该是一个完整的逻辑单元
3. **编写清晰的提交信息**：便于后续查找和理解
4. **定期同步主分支**：避免特性分支落后太多导致复杂冲突
5. **使用交互模式审查**：在推送到远程前，使用 `-i` 参数检查提交历史
:::

## 常见问题

### Q: rebase 和 merge 应该怎么选择？

A: 一般原则：
- **公共分支（如 main）**：使用 merge，保留完整历史
- **个人特性分支**：使用 rebase，保持历史整洁

### Q: rebase 过程中不小心中止了怎么办？

A: 使用 `git rebase --abort` 可以恢复到 rebase 前的状态。如果已经解决了部分冲突，可以使用 `git rebase --continue` 继续。

### Q: 如何撤销已经推送到远程的 rebase？

A: 如果已经将 rebase 后的提交推送到远程，不建议强制覆盖。最好的做法是使用 `git revert` 创建撤销提交。

### Q: rebase 后为什么我的提交消失了？

A: 可能是在交互式 rebase 中不小心删除了提交，或者在冲突解决时跳过了。可以使用 `git reflog` 查找丢失的提交。