
# 终端美化

本文档介绍如何美化终端，提升开发体验。

## Oh My Posh 安装配置

### 1. 安装 Oh My Posh

使用 winget 安装：

```powershell
winget install JanDeDobbeleer.OhMyPosh -s winget
```

### 2. 配置 PowerShell 主题

::: tip
Oh My Posh 提供了丰富的预置主题，你可以在官方文档中查看所有主题：https://ohmyposh.dev/docs/themes
:::

在 PowerShell 配置文件中添加：

```powershell
# 打开配置文件
notepad $PROFILE
```

如果文件不存在，先创建：

```powershell
New-Item -Path $PROFILE -Type Force
```

在配置文件中添加以下内容：

```powershell
# 初始化 Oh My Posh
oh-my-posh init pwsh --config "$env:POSH_THEMES_PATH\jandedobbeleer.omp.json" | Invoke-Expression
```

### 3. 安装 Nerd Fonts

Oh My Posh 需要 Nerd Fonts 才能正常显示图标。推荐安装 Meslo LGM Nerd Font：

```powershell
# 使用 Oh My Posh 安装字体
oh-my-posh font install
```

安装后，在终端设置中将字体更改为 Nerd Font。

### 4. 更换主题

你可以随时更换主题，只需修改配置文件中的主题路径：

```powershell
# 查看所有可用主题
Get-ChildItem -Path $env:POSH_THEMES_PATH
```

修改配置文件中的主题配置，例如：

```powershell
oh-my-posh init pwsh --config "$env:POSH_THEMES_PATH\agnoster.omp.json" | Invoke-Expression
```

## Terminal Icons 安装

### 1. 安装 Terminal Icons 模块

```powershell
Install-Module -Name Terminal-Icons -Repository PSGallery -Force
```

### 2. 在配置文件中导入

在 `$PROFILE` 中添加：

```powershell
# 导入 Terminal-Icons
Import-Module -Name Terminal-Icons
```

## PSReadLine 增强

### 1. 安装或更新 PSReadLine

```powershell
Install-Module -Name PSReadLine -AllowPrerelease -Force
```

### 2. 配置 PSReadLine

在 `$PROFILE` 中添加：

```powershell
# PSReadLine 配置
Set-PSReadLineOption -PredictionSource History
Set-PSReadLineOption -PredictionViewStyle ListView
Set-PSReadLineOption -EditMode Windows
```

## 常用快捷键

| 快捷键 | 功能 |
|--------|------|
| `Ctrl + r` | 搜索历史命令 |
| `Tab` | 自动补全 |
| `Ctrl + d` | 删除光标后字符 |
| `Ctrl + u` | 清空当前行 |
| `Ctrl + l` | 清屏 |

## 完整配置示例

```powershell
# Oh My Posh 初始化
oh-my-posh init pwsh --config "$env:POSH_THEMES_PATH\jandedobbeleer.omp.json" | Invoke-Expression

# 导入 Terminal-Icons
Import-Module -Name Terminal-Icons

# PSReadLine 配置
Set-PSReadLineOption -PredictionSource History
Set-PSReadLineOption -PredictionViewStyle ListView
Set-PSReadLineOption -EditMode Windows

# 设置别名
Set-Alias ll ls
Set-Alias g git
Set-Alias vim nvim
```
