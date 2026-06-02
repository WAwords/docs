import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  ignoreDeadLinks: true,
  title: "有个笔记",
  description: "个人技术笔记与文档整理",
  base: "/docs/",
  srcDir: "./src",
  themeConfig: {
    logo: { src: "/logo.svg", width: 24, height: 24 },

    outline: {
      label: "页面导航",
    },

    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "首页", link: "/" },
      {
        text: "前端开发",
        items: [
          { text: "VitePress 文档", link: "/frontend/vitepress/install" },
          { text: "UniApp 开发", link: "/frontend/uniapp/app-update" },
          { text: "uni-push 推送", link: "/frontend/uniapp/uni-push" },
          { text: "TypeScript 类型体操", link: "/frontend/typescript/type-challenges" },
          { text: "Vue.js 常用技巧", link: "/frontend/vuejs/tips" },
          { text: "Vue 3 组合式 API", link: "/frontend/vuejs/composition-api" },
          { text: "ES6+ 语法特性", link: "/frontend/javascript/es6-features" },
          { text: "JavaScript 设计模式", link: "/frontend/javascript/design-patterns" },
          { text: "Promise 与 async/await", link: "/frontend/javascript/promise-async-await" },
          { text: "JavaScript 数组常用方法", link: "/frontend/javascript/array-methods" },
          { text: "JavaScript 字符串常用方法", link: "/frontend/javascript/string-methods" },
          { text: "JavaScript 函数式编程入门", link: "/frontend/javascript/functional-programming" },
          { text: "React Hooks 常用指南", link: "/frontend/reactjs/react-hooks" },
          { text: "React 常用技巧", link: "/frontend/reactjs/tips" },
          { text: "前端性能优化", link: "/frontend/performance-optimization" },
          { text: "浏览器缓存机制", link: "/frontend/browser-cache" },
          { text: "Tailwind CSS 技巧", link: "/frontend/tailwindcss/tips" },
          { text: "CSS 现代布局技巧", link: "/frontend/css/layout" },
          { text: "CSS 动画实用指南", link: "/frontend/css/animation" },
          { text: "错误处理与日志", link: "/frontend/error-handling" },
          { text: "Chrome 开发者工具技巧", link: "/frontend/chromeDevtools/tips" },
          { text: "ESLint 与 Prettier 配置", link: "/frontend/eslint-prettier" },
          { text: "Web 安全防护指南", link: "/frontend/web-security" },
          { text: "Webpack 配置指南", link: "/frontend/webpack/config" },
          { text: "前端常用工具库", link: "/frontend/useful-libraries" },
        ],
      },
      {
        text: "开发工具",
        items: [
          { text: "Git 使用", link: "/tools/git/commands" },
          { text: "Git Bisect 调试", link: "/tools/git/bisect" },
          { text: "Git 工作流", link: "/tools/git/workflow" },
          { text: "Git Submodule 子模块", link: "/tools/git/submodule" },
          { text: "VS Code 配置", link: "/tools/vscode/settings" },
          { text: "Vim 常用命令", link: "/tools/vim/commands" },
          { text: "CMD 命令", link: "/tools/cmd/commands" },
          { text: "PowerShell 使用", link: "/tools/powershell/usage" },
          { text: "终端美化", link: "/tools/terminal/beautify" },
          { text: "Docker 运维", link: "/tools/docker/usage" },
          { text: "Nginx 配置", link: "/tools/nginx/config" },
          { text: "pnpm 包管理", link: "/tools/packageManager/pnpm-usage" },
          { text: "Node.js 命令", link: "/tools/nodejs/commands" },
          { text: "npm scripts 使用技巧", link: "/tools/npmScripts/usage" },
          { text: "环境问题排查", link: "/tools/troubleshooting/environment" },
          { text: "Linux 常用命令", link: "/tools/linux/commands" },
          { text: "Markdown 语法", link: "/tools/markdown/syntax" },
          { text: "正则表达式", link: "/tools/regex/usage" },
          { text: "SSH 常用配置", link: "/tools/ssh/config" },
        ],
      },
      {
        text: "规范与技巧",
        items: [
          { text: "项目规范", link: "/guidelines/project" },
          { text: "实用技巧", link: "/guidelines/tips" },
          { text: "代码提交规范", link: "/guidelines/commit" },
        ],
      },
    ],

    sidebar: {
      "/frontend/vitepress/": [
        {
          text: "VitePress",
          collapsed: false,
          items: [
            { text: "安装及初始化", link: "/frontend/vitepress/install" },
            { text: "基础使用", link: "/frontend/vitepress/usage" },
            { text: "部署配置", link: "/frontend/vitepress/deploy" },
          ],
        },
      ],
      "/frontend/uniapp/": [
        {
          text: "UniApp",
          collapsed: false,
          items: [
            { text: "应用更新", link: "/frontend/uniapp/app-update" },
            { text: "uni-push 推送", link: "/frontend/uniapp/uni-push" },
          ],
        },
      ],
      "/frontend/typescript/": [
        {
          text: "TypeScript",
          collapsed: false,
          items: [
            { text: "类型体操", link: "/frontend/typescript/type-challenges" },
          ],
        },
      ],
      "/frontend/vuejs/": [
        {
          text: "Vue.js",
          collapsed: false,
          items: [
            { text: "常用技巧", link: "/frontend/vuejs/tips" },
            { text: "组合式 API", link: "/frontend/vuejs/composition-api" },
          ],
        },
      ],
      "/frontend/reactjs/": [
        {
          text: "React",
          collapsed: false,
          items: [
            { text: "常用技巧", link: "/frontend/reactjs/tips" },
            { text: "Hooks 常用指南", link: "/frontend/reactjs/react-hooks" },
          ],
        },
      ],
      "/frontend/javascript/": [
        {
          text: "JavaScript",
          collapsed: false,
          items: [
            { text: "ES6+ 语法特性", link: "/frontend/javascript/es6-features" },
            { text: "设计模式", link: "/frontend/javascript/design-patterns" },
            { text: "Promise 与 async/await", link: "/frontend/javascript/promise-async-await" },
            { text: "数组常用方法", link: "/frontend/javascript/array-methods" },
            { text: "字符串常用方法", link: "/frontend/javascript/string-methods" },
            { text: "函数式编程入门", link: "/frontend/javascript/functional-programming" },
          ],
        },
      ],
      "/frontend/tailwindcss/": [
        {
          text: "Tailwind CSS",
          collapsed: false,
          items: [
            { text: "实用技巧", link: "/frontend/tailwindcss/tips" },
          ],
        },
      ],
      "/frontend/css/": [
        {
          text: "CSS",
          collapsed: false,
          items: [
            { text: "现代布局技巧", link: "/frontend/css/layout" },
            { text: "动画实用指南", link: "/frontend/css/animation" },
          ],
        },
      ],
      "/frontend/webpack/": [
        {
          text: "Webpack",
          collapsed: false,
          items: [
            { text: "配置指南", link: "/frontend/webpack/config" },
          ],
        },
      ],
      "/frontend/": [
        {
          text: "前端性能优化",
          collapsed: false,
          items: [
            { text: "性能优化指南", link: "/frontend/performance-optimization" },
          ],
        },
        {
          text: "浏览器缓存机制",
          collapsed: false,
          items: [
            { text: "浏览器缓存机制", link: "/frontend/browser-cache" },
          ],
        },
        {
          text: "错误处理",
          collapsed: false,
          items: [
            { text: "错误处理与日志", link: "/frontend/error-handling" },
          ],
        },
        {
          text: "Chrome 开发者工具",
          collapsed: false,
          items: [
            { text: "使用技巧", link: "/frontend/chromeDevtools/tips" },
          ],
        },
        {
          text: "代码规范",
          collapsed: false,
          items: [
            { text: "ESLint 与 Prettier 配置", link: "/frontend/eslint-prettier" },
          ],
        },
        {
          text: "Web 安全",
          collapsed: false,
          items: [
            { text: "Web 安全防护指南", link: "/frontend/web-security" },
          ],
        },
        {
          text: "工具库",
          collapsed: false,
          items: [
            { text: "前端常用工具库", link: "/frontend/useful-libraries" },
          ],
        },
      ],
      "/tools/git/": [
        {
          text: "Git",
          collapsed: false,
          items: [
            { text: "常用命令", link: "/tools/git/commands" },
            { text: "Bisect 二分调试", link: "/tools/git/bisect" },
            { text: "工作流程", link: "/tools/git/workflow" },
            { text: "版本更新操作", link: "/tools/git/update" },
            { text: "配置设置", link: "/tools/git/settings" },
            { text: "Stash 暂存", link: "/tools/git/stash" },
            { text: "Rebase 变基", link: "/tools/git/rebase" },
            { text: "Submodule 子模块", link: "/tools/git/submodule" },
          ],
        },
      ],
      "/tools/cmd/": [
        {
          text: "CMD",
          collapsed: false,
          items: [
            { text: "常用命令", link: "/tools/cmd/commands" },
          ],
        },
      ],
      "/tools/powershell/": [
        {
          text: "PowerShell",
          collapsed: false,
          items: [
            { text: "使用技巧", link: "/tools/powershell/usage" },
          ],
        },
      ],
      "/tools/terminal/": [
        {
          text: "终端",
          collapsed: false,
          items: [
            { text: "终端美化", link: "/tools/terminal/beautify" },
          ],
        },
      ],
      "/tools/docker/": [
        {
          text: "Docker",
          collapsed: false,
          items: [
            { text: "基础使用", link: "/tools/docker/usage" },
          ],
        },
      ],
      "/tools/nginx/": [
        {
          text: "Nginx",
          collapsed: false,
          items: [
            { text: "常用配置", link: "/tools/nginx/config" },
          ],
        },
      ],
      "/tools/packageManager/": [
        {
          text: "包管理器",
          collapsed: false,
          items: [
            { text: "pnpm 使用技巧", link: "/tools/packageManager/pnpm-usage" },
          ],
        },
      ],
      "/tools/vscode/": [
        {
          text: "VS Code",
          collapsed: false,
          items: [
            { text: "配置与插件", link: "/tools/vscode/settings" },
          ],
        },
      ],
      "/tools/vim/": [
        {
          text: "Vim",
          collapsed: false,
          items: [
            { text: "常用命令", link: "/tools/vim/commands" },
          ],
        },
      ],
      "/tools/nodejs/": [
        {
          text: "Node.js",
          collapsed: false,
          items: [
            { text: "常用命令", link: "/tools/nodejs/commands" },
          ],
        },
      ],
      "/tools/npmScripts/": [
        {
          text: "npm Scripts",
          collapsed: false,
          items: [
            { text: "使用技巧", link: "/tools/npmScripts/usage" },
          ],
        },
      ],
      "/tools/troubleshooting/": [
        {
          text: "问题排查",
          collapsed: false,
          items: [
            { text: "环境问题排查", link: "/tools/troubleshooting/environment" },
          ],
        },
      ],
      "/tools/linux/": [
        {
          text: "Linux",
          collapsed: false,
          items: [
            { text: "常用命令", link: "/tools/linux/commands" },
          ],
        },
      ],
      "/tools/markdown/": [
        {
          text: "Markdown",
          collapsed: false,
          items: [
            { text: "语法指南", link: "/tools/markdown/syntax" },
          ],
        },
      ],
      "/tools/regex/": [
        {
          text: "正则表达式",
          collapsed: false,
          items: [
            { text: "常用正则表达式", link: "/tools/regex/usage" },
          ],
        },
      ],
      "/tools/ssh/": [
        {
          text: "SSH",
          collapsed: false,
          items: [
            { text: "常用配置", link: "/tools/ssh/config" },
          ],
        },
      ],
      "/guidelines/": [
        {
          text: "规范与技巧",
          collapsed: false,
          items: [
            { text: "项目规范", link: "/guidelines/project" },
            { text: "实用技巧", link: "/guidelines/tips" },
            { text: "代码提交规范", link: "/guidelines/commit" },
          ],
        },
      ],
    },

    socialLinks: [{ icon: "github", link: "https://github.com/WAwords/docs" }],

    footer: {
      message: "基于 MIT 许可发布",
      copyright: "Copyright © 2024-present",
    },

    docFooter: {
      prev: "上一页",
      next: "下一页",
    },

    returnToTopLabel: "回到顶部",
    sidebarMenuLabel: "菜单",
    darkModeSwitchLabel: "主题",
  },
});
