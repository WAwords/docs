# Node.js 常用命令

## 查看 Node.js 版本

```sh
node -v
```

## 查看 npm 版本

```sh
npm -v
```

## 查看已安装的包

### 查看全局安装的包

```sh
npm list -g --depth 0
```

### 查看当前项目安装的包

```sh
npm list --depth 0
```

## 安装包

### 安装生产依赖

```sh
npm install <包名>
npm i <包名>
```

### 安装开发依赖

```sh
npm install <包名> --save-dev
npm i <包名> -D
```

### 全局安装

```sh
npm install <包名> --global
npm i <包名> -g
```

### 安装指定版本

```sh
npm install <包名>@<版本号>
```

## 卸载包

```sh
npm uninstall <包名>
```

## 更新包

### 更新当前项目的所有包

```sh
npm update
```

### 检查哪些包可以更新

```sh
npm outdated
```

## 运行脚本

### 运行 package.json 中定义的脚本

```sh
npm run <脚本名>
```

## 初始化项目

```sh
npm init
```

### 快速初始化（使用默认配置）

```sh
npm init -y
```

## 清除 npm 缓存

```sh
npm cache clean --force
```

## 查看包信息

```sh
npm info <包名>
```

## 使用 npx

### 临时运行一个包

```sh
npx <包名>
```

## 切换 npm 镜像源

### 查看当前镜像源

```sh
npm config get registry
```

### 设置淘宝镜像源

```sh
npm config set registry https://registry.npmmirror.com
```

### 恢复官方镜像源

```sh
npm config set registry https://registry.npmjs.org
```

## 查看 npm 配置

```sh
npm config list
```

## 发布包

```sh
npm publish
```

## 登录 npm

```sh
npm login
```
