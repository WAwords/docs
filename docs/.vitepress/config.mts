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
        ],
      },
      {
        text: "开发工具",
        items: [
          { text: "Git 使用", link: "/tools/git/commands" },
          { text: "VS Code 配置", link: "/tools/vscode/settings" },
          { text: "CMD 命令", link: "/tools/cmd/commands" },
          { text: "PowerShell 使用", link: "/tools/powershell/usage" },
          { text: "Docker 运维", link: "/tools/docker/usage" },
          { text: "Nginx 配置", link: "/tools/nginx/config" },
          { text: "pnpm 包管理", link: "/tools/packageManager/pnpm-usage" },
          { text: "Node.js 命令", link: "/tools/nodejs/commands" },
          { text: "环境问题排查", link: "/tools/troubleshooting/environment" },
          { text: "Linux 常用命令", link: "/tools/linux/commands" },
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
      "/tools/git/": [
        {
          text: "Git",
          collapsed: false,
          items: [
            { text: "常用命令", link: "/tools/git/commands" },
            { text: "版本更新操作", link: "/tools/git/update" },
            { text: "配置设置", link: "/tools/git/settings" },
            { text: "Stash 暂存", link: "/tools/git/stash" },
            { text: "Rebase 变基", link: "/tools/git/rebase" },
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
      "/tools/nodejs/": [
        {
          text: "Node.js",
          collapsed: false,
          items: [
            { text: "常用命令", link: "/tools/nodejs/commands" },
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
