import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "笔记",
  description: "这里有一堆笔记",
  base: "/docs/",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "主页", link: "/" },
      {
        text: "笔记",
        items: [
          { text: "vitepress", link: "/vitepress/deploy" },
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
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
