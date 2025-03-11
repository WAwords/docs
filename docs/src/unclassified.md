# 未分类

## Docker

创建镜像：`docker build -t hello-docker .`，有时会失败，如果是网络的问题，可以配置镜像和buildkit（有时只配置了镜像一还是会报错）：
```
"registry-mirrors": [
    "https://hub.littlediary.cn"
  ],
"features": {
"buildkit": false
}
```

查看镜像列表：`docker images`、`docker image ls`

运行镜像：`docker run hello-docker`


## TS 函数重载

所有 TS 最终都会编译成 JS，而 JS 的重载比较 LOW，所以 TS 写重载不过是添加了点注释

```ts
export function add(a: number, b: number): number;
export function add(a: { a?: number; b: number }): number;

export function add(a: number | { a?: number; b: number }, b?: number): number {
  if (typeof a === "number") {
  } else {
    ({ a = 0, b } = a); // JS函数重载中，解构赋值比较好用
  }
  // 逻辑...
}
```

## 正则表达式

```
‌普通字符 ‌：如 a 到 z 的字母、0 到 9 的数字等。
‌特殊字符 ‌（元字符）：包括但不限于：
.：匹配除换行符以外的任意单个字符。
*：匹配前面的子表达式零次或多次。
+：匹配前面的子表达式一次或多次。
?：匹配前面的子表达式零次或一次。
|：匹配左边或右边的表达式。
()：标记一个子表达式的开始和结束，可以捕获子匹配。
[]：用来表示一组字符，单独列出：[amk] 匹配 'a'，'m' 或 'k'。
{}：用于指定前面的子表达式的出现次数。
```

## 项目创建

使用 vite 创建项目

```sh
pnpm create vite
```

## 命令行
// 查占用端口的pid（查到后到资源管理器找）
netstat /ano | findstr 9999
// 查占用的程序
tasklist | findstr [2196, nginx]
// 杀死进程
taskkill /IM nginx.exe /F
