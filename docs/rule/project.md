# 项目规范

## 目录结构

```txt
my-project-name/
 |- node_modules   // 下载的依赖包
 |- public // 静态页面目录，一般只放ioc
 |- src            // 源码目录
     |- api        // http 请求目录
     |- assets     // 静态资源目录
         |- img    // 图片存放目录
     |- components     // 组件
     |- router         // 路由
     |- store          // 全局状态管理目录
     |- utils          // 工具存放目录
     |- request         // 请求封装相关
     |- views          // 页面存放目录
     |- App.vue        // 根组件
     |- main.js        // 入口文件
 |- .gitignore     // git 忽略规则
 |- index.html // 项目入口
 |- package.json // 依赖
 |- README.md // 项目 README
 |- vite.config.ts // vite 配置
```

## 目录命名

一般采用小写方式， 优先选择单个单词命名，多个单词命名以短横线分隔。
:::tip
组件为特殊情况，组件目录以大写开头，如果有多个单词，采用单词首字母大写的形式。
:::

```sh
|- temp
  |- index
|- ParentView
  |- index.vue
```

## JS 、TS 文件命名

全部采用小写方式， 优先选择单个单词命名，多个单词命名以短横线分隔。

```sh
|- index.js
|- util.ts
|- date-util.js
|- account-model.ts
|- collapse-transition.ts
```
