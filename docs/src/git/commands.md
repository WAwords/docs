# 一些命令

## 从远程仓库获取最新的分支信息

```sh
git fetch -p
```

## 推送标签

```sh
git push --tags
```

## 获取最新的远程分支信息（清除本地的远程分支缓存）

```sh
git fetch --all --prune
```

## 取消提交（~后接取消的提交数量）

```sh
git reset --soft HEAD~1
```

## 关联远程仓库

```sh
git remote add origin https://gitee.com/waword/tool.git
```

## git 拉取换行符不同导致大量格式化警告

```sh
git config --global core.autocrlf false
```

## git 清除用户名密码

```sh
git credential-manager uninstall
```

## 添加远程仓库

```sh
git remote add origin <你的项目地址>
```

## 移除远程仓库

```sh
git remote rm origin
```

## 提交到相应分支

```sh
git push origin HEAD:main
```
