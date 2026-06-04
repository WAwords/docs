
# Node.js 常见问题排查

## 安装问题

### 权限问题导致安装失败

在 Linux 或 macOS 系统上，全局安装 Node.js 包时可能会遇到权限问题。

::: tip 解决方案
使用 nvm（Node Version Manager）管理 Node.js 版本，或者使用以下命令修改 npm 全局安装目录：

```sh
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' &gt;&gt; ~/.bashrc
source ~/.bashrc
```
:::

### 网络问题导致下载缓慢

国内网络环境下，npm 官方源访问可能较慢。

::: tip 解决方案
使用淘宝镜像源：

```sh
npm config set registry https://registry.npmmirror.com
```

或者使用 nrm 工具管理镜像源：

```sh
npm install -g nrm
nrm use taobao
```
:::

## 依赖问题

### node_modules 损坏

项目运行时出现奇怪的错误，可能是 node_modules 损坏。

::: tip 解决方案
删除 node_modules 并重新安装：

```sh
rm -rf node_modules package-lock.json
npm install
```

如果使用 pnpm：

```sh
pnpm store prune
rm -rf node_modules pnpm-lock.yaml
pnpm install
```
:::

### 依赖版本冲突

不同包依赖同一模块的不同版本导致冲突。

::: tip 解决方案
使用 npm ls 查看依赖树，找出冲突的包：

```sh
npm ls &lt;package-name&gt;
```

或者在 package.json 中使用 resolutions 字段固定版本（需要使用 npm-force-resolutions）：

```json
{
  "resolutions": {
    "&lt;package-name&gt;": "&lt;version&gt;"
  }
}
```
:::

### 找不到模块错误

运行项目时提示 "Cannot find module 'xxx'"。

::: tip 解决方案
1. 检查模块是否已安装
2. 检查导入路径是否正确
3. 清除 npm 缓存后重新安装：

```sh
npm cache clean --force
npm install
```
:::

## 运行时问题

### 内存溢出错误

Node.js 进程因内存不足崩溃，报错 "JavaScript heap out of memory"。

::: tip 解决方案
增加 Node.js 内存限制：

```sh
node --max-old-space-size=4096 your-script.js
```

在 package.json 中配置：

```json
{
  "scripts": {
    "start": "node --max-old-space-size=4096 index.js"
  }
}
```
:::

### 端口被占用

启动服务时报错 "EADDRINUSE: address already in use"。

::: tip 解决方案
查找并杀死占用端口的进程：

Windows：
```sh
netstat -ano | findstr :3000
taskkill /PID &lt;进程ID&gt; /F
```

Linux/macOS：
```sh
lsof -ti:3000 | xargs kill -9
```
:::

### 环境变量未生效

代码中读取 process.env 为 undefined。

::: tip 解决方案
1. 使用 dotenv 包加载环境变量：

```sh
npm install dotenv
```

在代码开头添加：
```javascript
require('dotenv').config();
```

2. 创建 .env 文件并添加环境变量：

```env
NODE_ENV=development
PORT=3000
```
:::

## 调试技巧

### 启用调试模式

使用 --inspect 参数启动调试：

```sh
node --inspect your-script.js
```

然后在 Chrome 浏览器访问 chrome://inspect 进行调试。

### 使用 console 调试

```javascript
console.log('普通日志');
console.error('错误日志');
console.warn('警告日志');
console.table(data); // 表格形式展示数据
console.time('计时');
// ... 代码 ...
console.timeEnd('计时');
```

### 性能分析

使用 --prof 参数生成性能分析文件：

```sh
node --prof your-script.js
node --prof-process isolate-0xnnnnnnnnnnnn-v8.log &gt; processed.txt
```

## 常见错误代码

| 错误代码 | 说明 |
|---------|------|
| EACCES | 权限不足 |
| EADDRINUSE | 端口已被占用 |
| ENOENT | 文件或目录不存在 |
| EEXIST | 文件或目录已存在 |
| EISDIR | 目标是一个目录 |
| ENOTDIR | 目标不是一个目录 |
| EMFILE | 打开文件数过多 |
