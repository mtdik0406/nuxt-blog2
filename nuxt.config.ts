// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  modules: [
    "@nuxt/content",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@nuxtjs/sitemap",
  ],

  content: {},

  colorMode: {
    classSuffix: "",
    preference: "system",
    fallback: "light",
  },

  tailwindcss: {
    cssPath: "~/assets/css/main.css",
  },

  site: {
    url: "https://example.com",
    name: "Blog",
  },

  app: {
    head: {
      htmlAttrs: {
        lang: "ja",
      },
      meta: [
        { name: "description", content: "技術ブログ - 開発の学びと気づきを発信" },
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "Blog" },
        { name: "twitter:card", content: "summary" },
      ],
    },
  },
});
