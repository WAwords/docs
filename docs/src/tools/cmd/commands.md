# CMD 命令

## 基础操作

### 清屏
```cmd
cls
```

### 查看当前目录
```cmd
dir
```

### 切换目录
```cmd
cd <目录路径>
```

### 返回上级目录
```cmd
cd ..
```

### 切换盘符
```cmd
D:
```

## 文件操作

### 创建文件夹
```cmd
mkdir <文件夹名>
```

### 删除文件夹
```cmd
rmdir <文件夹名>
```

### 删除空文件夹
```cmd
rd <文件夹名>
```

### 创建文件
```cmd
type nul > <文件名>
```

### 删除文件
```cmd
del <文件名>
```

### 复制文件
```cmd
copy <源文件> <目标文件>
```

### 移动文件
```cmd
move <源文件> <目标位置>
```

### 重命名文件
```cmd
ren <旧文件名> <新文件名>
```

## 查看文件内容

### 显示文件内容
```cmd
type <文件名>
```

### 分页显示文件内容
```cmd
more <文件名>
```

## 网络操作

### 查看 IP 地址
```cmd
ipconfig
```

### 查看网络连接
```cmd
netstat
```

### 测试网络连通性
```cmd
ping <地址>
```

### 跟踪路由
```cmd
tracert <地址>
```

## 系统信息

### 查看系统信息
```cmd
systeminfo
```

### 查看进程列表
```cmd
tasklist
```

### 结束进程
```cmd
taskkill /f /im <进程名>
```

### 查看系统日期
```cmd
date
```

### 查看系统时间
```cmd
time
```

## 环境变量

### 查看所有环境变量
```cmd
set
```

### 查看某个环境变量
```cmd
set <变量名>
```

### 设置临时环境变量（仅当前窗口有效）
```cmd
set <变量名>=<值>
```

## 其他实用命令

### 查看命令历史
```cmd
doskey /history
```

### 循环执行命令
```cmd
for /l %i in (1,1,10) do echo %i
```

### 延时执行
```cmd
timeout /t <秒数>
```

### 关机
```cmd
shutdown /s /t 0
```

### 重启
```cmd
shutdown /r /t 0
```

### 注销
```cmd
shutdown /l
```
