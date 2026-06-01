# PowerShell 使用技巧

本文档收录 PowerShell 的常用命令和实用技巧。

## 基本命令

### 获取帮助信息
```powershell
Get-Help <命令名>
Get-Help <命令名> -Examples  # 查看示例
Get-Help <命令名> -Full      # 查看完整帮助
```

### 文件和目录操作
```powershell
Get-ChildItem     # 列出目录内容（相当于 dir/ls）
Get-ChildItem -Recurse  # 递归列出
New-Item -ItemType Directory -Path <路径>  # 创建目录
New-Item -ItemType File -Path <路径>       # 创建文件
Remove-Item <路径>  # 删除文件/目录
Copy-Item <源> <目标>  # 复制
Move-Item <源> <目标>  # 移动
```

### 系统信息
```powershell
Get-Process  # 查看进程
Get-Service  # 查看服务
Get-ComputerInfo  # 查看计算机信息
```

## 文件查找

### 查找文件
```powershell
# 查找所有 .md 文件
Get-ChildItem -Path . -Filter *.md -Recurse

# 查找包含特定内容的文件
Get-ChildItem -Path . -Filter *.md -Recurse | Select-String "关键词"
```

## 别名

PowerShell 支持为常用命令设置别名：
```powershell
# 查看现有别名
Get-Alias

# 设置临时别名（仅当前会话有效）
Set-Alias -Name ll -Value Get-ChildItem

# 查看别名对应的命令
Get-Alias ll
```

## 常用快捷键

| 快捷键 | 说明 |
|--------|------|
| `Ctrl + C` | 中断当前命令 |
| `Ctrl + L` | 清屏 |
| `Tab` | 自动补全 |
| `↑/↓` | 浏览历史命令 |
| `F7` | 显示命令历史 |

## 环境变量

### 查看环境变量
```powershell
Get-ChildItem Env:
$env:PATH  # 查看 PATH 变量
```

### 设置环境变量（临时）
```powershell
$env:TEST = "value"
```

### 添加到 PATH
```powershell
$env:PATH += ";C:\新路径"
```

## 实用技巧

### 查看命令历史
```powershell
Get-History
# 执行历史命令（使用 ID）
Invoke-History -Id 5
```

### 导出结果
```powershell
# 导出为 CSV
Get-Process | Export-Csv -Path processes.csv

# 导出为文本
Get-ChildItem | Out-File -Path files.txt
```

### 执行脚本
```powershell
# 执行当前目录下的脚本
.\script.ps1

# 查看执行策略
Get-ExecutionPolicy

# 设置执行策略（需要管理员权限）
Set-ExecutionPolicy RemoteSigned
```
