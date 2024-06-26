import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/learn-typescript/',
  lang: 'zh-CN',
  title: "vvfan blog 11",
  description: "vvfan blog desc",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '网站动态', link: '/vitepress-blog' }
    ],

    sidebar: [
      {
        text: '文章列表',
        items: [
          { text: '博客搭建', link: '/vitepress-blog' }
        ]
      },
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
