# Linux 常用命令

本文档整理 Linux 日常开发与运维中常用的命令，便于快速查阅。

## 文件与目录操作

### 查看当前路径

```bash
pwd
```

### 切换目录

```bash
cd /usr/local
cd ~            # 切换到用户主目录
cd ..           # 切换到上一级目录
cd -            # 切换到上一次所在目录
```

### 列出文件

```bash
ls                # 列出当前目录
ls -l             # 详细列表
ls -a             # 显示隐藏文件
ls -lh            # 以人类可读方式显示大小
ls -R             # 递归显示
ls -lt            # 按修改时间倒序
```

### 创建与删除

```bash
mkdir test                    # 创建目录
mkdir -p a/b/c                # 递归创建多级目录
rm file.txt                   # 删除文件
rm -r dir                     # 递归删除目录
rm -rf dir                    # 强制递归删除
touch a.txt                   # 创建空文件或更新时间戳
```

### 复制、移动、重命名

```bash
cp a.txt b.txt                # 复制文件
cp -r src/ dst/               # 递归复制目录
mv a.txt b.txt                # 重命名
mv a.txt /tmp/                # 移动文件
```

### 查看文件内容

```bash
cat file.txt
less file.txt
more file.txt
head -n 20 file.txt           # 查看前 20 行
tail -n 20 file.txt           # 查看末尾 20 行
tail -f log.txt               # 实时跟踪日志
```

## 文件查找与文本处理

### find 查找文件

```bash
find / -name "*.log"                       # 按名称查找
find /etc -name "*.conf" -type f           # 限制文件类型
find . -size +100M                         # 查找大于 100M 的文件
find . -mtime -7                           # 7 天内修改过的文件
find . -name "*.log" -delete               # 查找并删除
```

### grep 文本搜索

```bash
grep "error" file.txt                      # 在文件中搜索
grep -rn "TODO" src/                       # 递归搜索并显示行号
grep -i "error" file.txt                   # 忽略大小写
grep -v "debug" file.txt                   # 反向匹配
grep -E "err|warn" file.txt                # 扩展正则
```

### sed 流编辑

```bash
sed -i 's/old/new/g' file.txt              # 原地替换
sed -n '1,10p' file.txt                    # 打印指定行
sed '/^$/d' file.txt                       # 删除空行
```

### awk 文本处理

```bash
awk '{print $1}' file.txt                  # 打印第一列
awk -F: '{print $1}' /etc/passwd           # 指定分隔符
awk '$3 > 100' file.txt                    # 条件过滤
```

## 权限与用户

### 权限管理

```bash
chmod 755 script.sh                        # 数字方式
chmod +x script.sh                         # 增加执行权限
chmod -R 644 dir/                          # 递归修改

chown user:group file.txt                  # 修改所有者和组
chown -R www:www /var/www                  # 递归修改
```

### 用户与组

```bash
useradd -m username                        # 创建用户
userdel -r username                        # 删除用户
passwd username                            # 修改密码
groupadd dev                               # 创建组
usermod -aG dev username                   # 加入附加组
id username                                # 查看用户信息
```

### 切换用户

```bash
su - root                                  # 切换到 root
sudo command                               # 以管理员权限执行
```

## 进程与服务

### 查看进程

```bash
ps aux                                     # 查看所有进程
ps -ef | grep nginx                        # 过滤进程
top                                        # 动态查看
htop                                       # 增强版 top
pgrep -f "node"                            # 按名称查找进程 PID
```

### 进程控制

```bash
kill 1234                                  # 终止进程
kill -9 1234                               # 强制终止
killall nginx                              # 按名称终止
nohup node app.js &                        # 后台运行
jobs -l                                    # 查看后台任务
fg %1                                      # 调到前台
```

### systemctl 服务管理

```bash
systemctl start nginx                      # 启动服务
systemctl stop nginx                       # 停止服务
systemctl restart nginx                    # 重启服务
systemctl reload nginx                     # 重新加载配置
systemctl status nginx                     # 查看状态
systemctl enable nginx                     # 开机自启
systemctl disable nginx                    # 取消开机自启
systemctl list-units --type=service        # 列出所有服务
```

## 网络相关

### 网络配置

```bash
ip addr                                    # 查看 IP 地址
ifconfig                                   # 旧版命令
ip route                                   # 查看路由表
```

### 网络连通性

```bash
ping -c 4 example.com                      # 测试连通性
curl -I https://example.com                # 仅查看响应头
curl -o file.zip https://example.com/a.zip # 下载文件
wget https://example.com/a.zip             # 下载文件
traceroute example.com                     # 路由跟踪
nslookup example.com                       # DNS 查询
dig example.com                            # 详细 DNS 查询
```

### 端口与连接

```bash
netstat -tunlp                             # 查看监听端口
netstat -an | grep 80                      # 查看 80 端口连接
ss -tunlp                                  # 替代 netstat
lsof -i :8080                              # 查看占用 8080 的进程
```

## 磁盘与资源

### 磁盘使用

```bash
df -h                                      # 查看磁盘使用
du -sh dir/                                # 查看目录大小
du -h --max-depth=1 /                      # 查看一级子目录大小
lsblk                                      # 列出块设备
fdisk -l                                   # 查看分区信息
```

### 内存与 CPU

```bash
free -h                                    # 内存使用
nproc                                      # CPU 核心数
uptime                                     # 运行时长与负载
```

## 压缩与解压

```bash
tar -czvf archive.tar.gz dir/              # 压缩
tar -xzvf archive.tar.gz                   # 解压
tar -cjvf archive.tar.bz2 dir/             # bzip2 压缩
tar -xjvf archive.tar.bz2                  # bzip2 解压
zip -r a.zip dir/                          # zip 压缩
unzip a.zip                                # zip 解压
```

## 软件包管理

### apt（Debian / Ubuntu）

```bash
sudo apt update                            # 更新源
sudo apt upgrade                           # 升级已安装包
sudo apt install nginx                     # 安装软件
sudo apt remove nginx                      # 卸载软件
apt search nginx                           # 搜索软件
```

### yum / dnf（CentOS / RHEL / Fedora）

```bash
sudo yum update
sudo yum install nginx
sudo yum remove nginx
yum search nginx
```

## SSH 与远程操作

```bash
ssh user@host                              # 远程登录
ssh -p 2222 user@host                      # 指定端口
ssh -i key.pem user@host                   # 使用私钥
scp file.txt user@host:/path/              # 远程复制文件
scp -r dir/ user@host:/path/               # 远程复制目录
rsync -avz src/ user@host:/dst/            # 增量同步
```

## 系统信息

```bash
uname -a                                   # 内核信息
hostname                                   # 主机名
cat /etc/os-release                        # 系统版本
date                                       # 当前时间
cal                                        # 日历
history                                    # 历史命令
```

## 实用快捷键

| 快捷键 | 功能 |
|--------|------|
| `Ctrl + C` | 终止当前命令 |
| `Ctrl + D` | 退出当前终端 |
| `Ctrl + L` | 清屏 |
| `Ctrl + R` | 反向搜索历史命令 |
| `Ctrl + A` | 跳到行首 |
| `Ctrl + E` | 跳到行尾 |
| `Ctrl + U` | 删除光标前内容 |
| `Ctrl + K` | 删除光标后内容 |
| `Ctrl + W` | 删除前一个单词 |
| `Tab` | 自动补全 |

## 常用环境变量

```bash
echo $PATH
export PATH=$PATH:/usr/local/bin           # 临时添加路径
export NODE_ENV=production                 # 设置环境变量
```

持久化配置：写入 `~/.bashrc` 或 `~/.zshrc`，然后执行 `source ~/.bashrc` 生效。

## 参考资源

- [Linux 命令大全](https://www.linuxcool.com/)
- [explainshell](https://explainshell.com/)
