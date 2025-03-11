# 右键菜单

::: tip
使用注册表来变更右键菜单
:::

## 1. 进入注册表

打开注册表编辑器：按下 `Win + R` 键，输入 `regedit` 进入。

## 2. 定位到注册表项

有以下四种：

* 在 `HKEY_CLASSES_ROOT\DesktopBackground\shell` 下创建，只会在 `桌面` 右击菜单中显示；
* 在 `HKEY_CLASSES_ROOT\Directory\Background\shell` 下创建，则在 `桌面和文件夹空白处` 右击菜单都会显示；
* 在 `HKEY_CLASSES_ROOT\Directory\shell` 下创建，则只会在选中 `文件夹` 的右击菜单中显示；
* 在 `HKEY_CLASSES_ROOT\*\shell` 下创建，则只会在选中 `文件` 的右击菜单中显示。

## 3. 创建项

在shell下创建项，如 `Cursor` ，在 `Cursor` 下创建 `command` 项，并设置 `默认` 值为 `"C:\Users\Administrator\AppData\Local\Programs\cursor\Cursor.exe" "%1"`。

| 参数 | 说明 |
|------|------|
| %1 | 传入当前文件路径 |
| %2 | 系统默认的打印机 |
| %3 | 文件扇区 |
| %4 | 端口 |
| %D | 文件路径 |
| %L | 文件长路径 |
| %V | 文件路径 |
| %W | 当前文件的父目录的路径 |


