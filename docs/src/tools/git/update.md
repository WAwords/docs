# 版本更新时的操作

使用 Gitflow 的项目，在更新正式版本时，涉及到的 Git 分支会有三个：`master`、`release`、`develop`，在`release`的问题修复完毕后，我们需要使用一样的步骤和设置才能确保`更少出问题`和`更工整的提交记录`。
::: tip
在下边的操作中，`master`和`develop`分支并没有直接合并，是通过`release`分支来使其保持一致的。
:::

## 1. 变更版本

版本变更提交需要在`release`分支上进行。

```sh
# release分支
git commit -m '【版本】0.1.0'
```

## 2. `master` 合并分支

在`master`分支上合并`release`分支

```sh
# master分支
git marge --no-ff release
```

::: tip
注意，在合并时不用使用快进，这会让每次合并都多一个合并提交，会使提交记录`更工整`。当然，每次合并都是用命令的形式不太舒服，可以在 Git 中设置[合并时的操作](./setting)。
:::

## 3. `master` 打标签

版本标签需要在`master`分支上打

打标签：

```sh
# master分支
git tag '0.1.0'
```

推送标签至远程：

```sh
# master分支
git push --tags
```

## 4. `develop` 合并分支

```sh
# develop分支
git marge --no-ff release
```

::: tip
注意，合并分支时，`develop`分支需要合并`release`分支，而不是`master`分支。
:::
