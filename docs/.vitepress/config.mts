import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  ignoreDeadLinks: true,
  title: "技术文档",
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
        ],
      },
      {
        text: "开发工具",
        items: [
          { text: "Git 使用", link: "/tools/git/commands" },
          { text: "Docker 运维", link: "/tools/docker/usage" },
        ],
      },
      {
        text: "规范与技巧",
        items: [
          { text: "项目规范", link: "/guidelines/project" },
          { text: "实用技巧", link: "/guidelines/tips" },
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
      "/guidelines/": [
        {
          text: "规范与技巧",
          collapsed: false,
          items: [
            { text: "项目规范", link: "/guidelines/project" },
            { text: "实用技巧", link: "/guidelines/tips" },
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
