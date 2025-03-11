# VitePress 安装及初始化设置

:::tip 前置准备
1. Node.js 18 及以上版本。
2. 使用pnpm作为包管理工具。（确保Node.js安装成功后运行`npm install -g pnpm`）
:::

## VitePress 安装

在`D盘`根目录创建文件夹 `my-docs`，并进入文件夹，安装 vitepress：

::: danger 注意
最好是在`D盘`根目录创建文件夹 `my-docs`，并执行安装和之后的操作。如果在桌面文件夹执行操作的话可能会`导致C盘用户文件夹内容杂乱`。
:::

::: code-group
```sh [pnpm]
pnpm add -D vitepress
```
:::

## 创建项目

使用 VitePress 附带的命令行设置向导构建一个基本项目：

::: code-group
```sh [pnpm]
pnpm vitepress init
```
:::

执行命令后需要回答一些问题：

```sh{4,7,10,13,18}
┌  Welcome to VitePress!
│
◇  Where should VitePress initialize the config?
│  ./
│
◇  Site title:
│  test-project
│
◇  Site description:
│  A VitePress Site
│
◆  Theme:
│  ● Default Theme (Out of the box, good-looking docs)
│  ○ Default Theme + Customization
│  ○ Custom Theme
└

之后可能还有两个选项，选择默认即可。
```

::: details 关于上边回答的第一个问题（在上边的例子中选择的`./`）
需要按照以下规则回答第一个问题：
1. 使用默认的`./`：该项目是纯粹的VitePress文档项目。
2. 使用`./docs`：该项目使用了VitePress文档，且文档只是该项目的一部分。

当然你可以使用其他的路径，比如`./test-docs`、`./test`等。

使用默认的`./`的话，项目中主要进行编写的文件会处于最外层，而使用`./docs`的话，项目主要编写的文件会处于`./docs`文件夹中。

一般来说，如果我们只是做一个`单纯的文档项目`，使用默认的`./`即可。

如果是比较`复杂的项目`而文档只是嵌入到该项目中的一部分的话，建议使用`./docs`，这样的话文档相关的文件会被放到单独的文件夹中。


:::

回答完问题后，项目就已经创建完成了。

然后，我们需要验证项目是否正确安装，在项目根目录`my-docs`下执行以下命令：

```sh [pnpm]
pnpm run docs:dev
```
执行命令后，控制台会输出文档的访问地址（比如：http://localhost:5173），访问它，正常看到文档页面则表示安装和运行成功。

## git 初始化

在项目根目录下执行以下命令：

```sh
git init
```

在项目根目录下创建 `.gitignore` 文件，并添加以下内容：

```
node_modules
cache
dist
*.local
```
