import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "",
  description: "",
  base: "/docs/",
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
          { text: "vitepress", link: "/vitepress/deploy" },
          { text: "git", link: "/git/commands" },
          { text: "uniapp", link: "/uniapp/app-update" },
          { text: "未分类", link: "/unclassified" },
        ],
      },
    ],

    sidebar: {
      "/vitepress/": [
        {
          text: "vitepress",
          items: [
            {
              text: "部署",
              link: "/vitepress/deploy",
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
    },

    socialLinks: [{ icon: "github", link: "https://github.com/WAwords/docs" }],
  },
});
