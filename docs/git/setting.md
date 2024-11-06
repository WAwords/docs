# 设置

## 合并

```sh
# 查看当前的合并策略
git config --global merge.default
# 设置合并策略（不快进合并）
git config --global merge.default no-ff
```

## 拉取

```sh
# 查看当前的拉取策略
git config --global pull.ff
# 设置拉取策略
git config --global pull.ff only
```

::: tip
`pull.ff`有三个选项：`true`，`false`，`only`。默认为`true`。

- `true`：允许快进合并（也允许创建合并提交）
- `false`：不允许快进合并
- `only`：只允许快进合并
  :::
