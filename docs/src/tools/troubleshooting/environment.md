# 常见开发环境问题排查

本文档收录开发过程中常见的环境问题及解决方案。

## Node.js 相关问题

### 1. node_modules 安装失败

::: tip
如果安装时遇到权限问题或网络问题，尝试以下方法
:::

#### 清理缓存
```sh
# 清理 npm 缓存
npm cache clean --force

# 清理 pnpm 缓存
pnpm store prune

# 清理 yarn 缓存
yarn cache clean
```

#### 使用国内镜像源
```sh
# 淘宝镜像
npm config set registry https://registry.npmmirror.com
pnpm config set registry https://registry.npmmirror.com
yarn config set registry https://registry.npmmirror.com

# 或者临时使用
npm install --registry=https://registry.npmmirror.com
```

#### 删除 node_modules 和 lock 文件后重新安装
```sh
# Windows (PowerShell)
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json

# Windows (CMD)
rmdir /s /q node_modules
del package-lock.json

# Linux/Mac
rm -rf node_modules package-lock.json

# 重新安装
pnpm install
```

### 2. 端口被占用

#### 查找占用端口的进程
```sh
# Windows
netstat -ano | findstr :3000

# Linux/Mac
lsof -i :3000
```

#### 结束进程
```sh
# Windows (替换 PID 为实际的进程 ID)
taskkill /PID <PID> /F

# Linux/Mac
kill -9 <PID>
```

### 3. Node 版本不兼容

使用 nvm (Node Version Manager) 管理多个 Node 版本：
```sh
# 安装 nvm (Windows 下载 nvm-windows)
# https://github.com/coreybutler/nvm-windows

# 安装指定版本
nvm install 18.19.0

# 切换版本
nvm use 18.19.0

# 查看已安装版本
nvm ls
```

## Git 相关问题

### 1. LF/CRLF 换行符问题

Windows 使用 CRLF，Linux/Mac 使用 LF，导致 git 提示文件变更但实际内容无变化。

```sh
# 全局配置，提交时转换为 LF，检出时不转换
git config --global core.autocrlf false

# 或者提交时转换为 LF，检出时转换为 CRLF (Windows)
git config --global core.autocrlf true
```

### 2. Git 认证失败

#### 清除凭据
```sh
# Windows
git credential-manager uninstall

# 或者通过 Windows 凭据管理器删除
```

#### 使用 Personal Access Token
在 GitHub/Gitee 设置中生成 Personal Access Token，替代密码使用。

### 3. 远程仓库连接超时

#### 配置代理
```sh
# 设置代理 (如果有代理)
git config --global http.proxy http://127.0.0.1:7890
git config --global https.proxy https://127.0.0.1:7890

# 取消代理
git config --global --unset http.proxy
git config --global --unset https.proxy
```

#### 使用 SSH 替代 HTTPS
```sh
# 生成 SSH 密钥
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"

# 启动 ssh-agent
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_rsa

# 将公钥添加到 GitHub/Gitee
cat ~/.ssh/id_rsa.pub
```

## VS Code 相关问题

### 1. 扩展无法安装

- 检查网络连接
- 尝试使用 VS Code 扩展市场镜像
- 手动下载 .vsix 文件并安装

### 2. ESLint/Prettier 不生效

#### 检查是否安装了相应扩展
- ESLint
- Prettier - Code formatter

#### 检查配置文件是否存在
- `.eslintrc.js` 或 `.eslintrc.json`
- `.prettierrc` 或 `prettier.config.js`

#### 重启 VS Code
按 `Ctrl + Shift + P`，输入 `Reload Window` 重启。

### 3. 终端默认不是 PowerShell

设置默认终端：
1. 按 `Ctrl + Shift + P`
2. 输入 `Terminal: Select Default Profile`
3. 选择 `PowerShell`

## Windows 开发环境

### 1. 开启开发者模式

设置 → 更新和安全 → 开发者选项 → 开启"开发者模式"

### 2. PowerShell 执行策略问题

```powershell
# 查看当前执行策略
Get-ExecutionPolicy

# 设置为 RemoteSigned (允许本地脚本运行)
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### 3. 环境变量不生效

修改环境变量后，需要重启终端或编辑器才能生效。

## 其他常见问题

### 1. 中文乱码

#### 终端编码问题 (Windows)
```sh
# 设置终端编码为 UTF-8
chcp 65001
```

#### 文件编码
确保文件保存为 UTF-8 编码。

### 2. 虚拟内存不足

Windows:
1. 右键"此电脑" → 属性 → 高级系统设置
2. 高级 → 性能 → 设置
3. 高级 → 虚拟内存 → 更改
4. 自定义大小，设置合适的虚拟内存

### 3. 杀毒软件阻止

将项目目录添加到杀毒软件的白名单中。

## 调试技巧

### 1. 查看详细错误日志

多数命令支持 `--verbose` 或 `-v` 参数：
```sh
npm install --verbose
pnpm install -v
```

### 2. 使用 --debug 模式

```sh
node --debug app.js
```

### 3. 检查环境变量

```sh
# Windows
echo %PATH%

# PowerShell
$env:PATH

# Linux/Mac
echo $PATH
```
