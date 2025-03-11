import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "",
  description: "",
  base: "/docs/",
  srcDir: "./src",
  themeConfig: {
    logo: { src: "/logo.svg", width: 24, height: 24 },

    outline: {
      label: "页面导航",
    },

    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "主页", link: "/" },
      {
        text: "笔记",
        items: [
          { text: "网页文档", link: "/webdocs/vitepress/deploy" },
          { text: "git", link: "/git/commands" },
          { text: "uniapp", link: "/uniapp/app-update" },
          { text: "未分类", link: "/unclassified" },
          { text: "规范", link: "/rule/project" },
          { text: "运维相关", link: "/om/docker" },
        ],
      },
    ],

    sidebar: {
      "/webdocs/": [
        {
          text: "VitePress",
          items: [
            {
              text: "安装及初始化",
              link: "/webdocs/vitepress/install",
            },
            {
              text: "使用",
              link: "/webdocs/vitepress/use",
            },
            {
              text: "部署",
              link: "/webdocs/vitepress/deploy",
            },
          ],
        },
      ],
      "/git/": [
        {
          text: "git",
          items: [
            {
              text: "一些命令",
              link: "/git/commands",
            },
            {
              text: "版本更新时的操作",
              link: "/git/update",
            },
            {
              text: "设置",
              link: "/git/setting",
            },
          ],
        },
      ],
      "/uniapp/": [
        {
          text: "uniapp",
          items: [
            {
              text: "应用更新",
              link: "/uniapp/app-update",
            },
          ],
        },
      ],
      "/rule/": [
        {
          text: "规范",
          items: [
            {
              text: "项目规范",
              link: "/rule/project",
            },
          ],
        },
      ],
      "/om/": [
        {
          text: "运维相关",
          items: [
            {
              text: "Docker使用",
              link: "/om/docker",
            },
          ],
        },
      ],
    },

    socialLinks: [{ icon: "github", link: "https://github.com/WAwords/docs" }],
  },
});
