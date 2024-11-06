import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "笔记",
  description: "这里有一堆笔记",
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
          { text: "temp", link: "/temp/api-examples" },
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
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
