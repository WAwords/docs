# SSH 常用配置

## 生成 SSH 密钥

### 生成默认密钥（推荐）

```sh
ssh-keygen -t ed25519 -C "your_email@example.com"
```

### 生成 RSA 密钥（兼容性更好）

```sh
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

### 指定文件名生成

```sh
ssh-keygen -t ed25519 -f ~/.ssh/id_ed25519_github -C "your_email@example.com"
```

## 查看与复制公钥

### 查看公钥内容

```sh
cat ~/.ssh/id_ed25519.pub
```

### Windows 一键复制公钥到剪贴板

```sh
# PowerShell
Get-Content ~/.ssh/id_ed25519.pub | Set-Clipboard

# CMD
type %userprofile%\.ssh\id_ed25519.pub | clip
```

## 测试连接

```sh
# GitHub
ssh -T git@github.com

# Gitee
ssh -T git@gitee.com

# GitLab
ssh -T git@gitlab.com
```

## 多账号配置

当同时使用 `GitHub`、`Gitee`、`GitLab` 等多个平台时，需要通过 `config` 文件进行管理。

### 配置步骤

1. 为不同平台生成不同的密钥：

```sh
ssh-keygen -t ed25519 -f ~/.ssh/id_ed25519_github -C "github@email.com"
ssh-keygen -t ed25519 -f ~/.ssh/id_ed25519_gitee -C "gitee@email.com"
```

2. 编辑 `~/.ssh/config` 文件（不存在则新建）：

```ssh-config
# GitHub
Host github.com
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519_github
    PreferredAuthentications publickey
    IdentitiesOnly yes

# Gitee
Host gitee.com
    HostName gitee.com
    User git
    IdentityFile ~/.ssh/id_ed25519_gitee
    PreferredAuthentications publickey
    IdentitiesOnly yes

# 自定义别名（适合自建 Git 服务器）
Host my-git
    HostName git.example.com
    Port 22
    User git
    IdentityFile ~/.ssh/id_ed25519_work
    PreferredAuthentications publickey
    IdentitiesOnly yes
```

3. 克隆仓库（使用别名）：

```sh
git clone git@my-git:owner/repo.git
```

## 常用命令

### 启动 SSH 代理

```sh
# 启动代理
eval "$(ssh-agent -s)"

# 添加私钥到代理
ssh-add ~/.ssh/id_ed25519_github
ssh-add ~/.ssh/id_ed25519_gitee
```

### 启动代理时自动加载密钥（macOS）

将以下内容添加到 `~/.ssh/config`：

```ssh-config
Host *
    AddKeysToAgent yes
    UseKeychain yes
    IdentityFile ~/.ssh/id_ed25519_github
```

### 查看已加载的密钥

```sh
ssh-add -l
```

### 删除已加载的密钥

```sh
ssh-add -D
```

## 常见问题

### 1. 权限被拒绝（Permission denied）

```sh
# 设置正确的文件权限
chmod 700 ~/.ssh
chmod 600 ~/.ssh/id_ed25519
chmod 644 ~/.ssh/id_ed25519.pub
chmod 600 ~/.ssh/config
```

### 2. 连接服务器时跳过 known_hosts 检查

```sh
ssh -o StrictHostKeyChecking=no user@host
```

### 3. 临时指定密钥登录服务器

```sh
ssh -i ~/.ssh/id_ed25519_my user@host
```

### 4. 免密码登录服务器

1. 将本地公钥拷贝到服务器：

```sh
ssh-copy-id -i ~/.ssh/id_ed25519.pub user@host
```

2. 或者手动追加到服务器的 `~/.ssh/authorized_keys` 文件中。

### 5. 修改 SSH 端口

编辑服务器端 `/etc/ssh/sshd_config`：

```ssh-config
Port 2222
```

重启 SSH 服务：

```sh
sudo systemctl restart sshd
```

## 端口转发

### 本地端口转发

```sh
# 将本地 8080 端口的请求转发到远程内网机器的 80 端口
ssh -L 8080:internal-host:80 user@gateway-host
```

### 远程端口转发

```sh
# 将远程 8080 端口的请求转发到本地 80 端口
ssh -R 8080:localhost:80 user@remote-host
```

### 动态端口转发（SOCKS 代理）

```sh
ssh -D 1080 user@remote-host
```

## 配置文件常用项

| 配置项 | 说明 |
|------|------|
| `Host` | 匹配的别名（`*` 表示通配） |
| `HostName` | 真实的主机名或 IP |
| `Port` | SSH 端口，默认 22 |
| `User` | 登录用户名 |
| `IdentityFile` | 使用的私钥路径 |
| `PreferredAuthentications` | 优先使用的认证方式 |
| `IdentitiesOnly` | 仅使用配置的密钥，避免回退到默认密钥 |
| `AddKeysToAgent` | 是否自动将密钥添加到代理 |
| `ServerAliveInterval` | 心跳检测间隔（秒） |
| `ServerAliveCountMax` | 最多允许的心跳失败次数 |
| `StrictHostKeyChecking` | 是否严格校验主机密钥 |
| `Compression` | 是否启用压缩 |

## 调试 SSH 连接

```sh
# 详细输出模式
ssh -v user@host

# 更详细的输出
ssh -vvv user@host
```

观察输出可以快速定位是密钥、权限、网络还是认证的问题。
