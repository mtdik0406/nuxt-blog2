// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  modules: ["@nuxt/content", "@nuxtjs/tailwindcss", "@nuxtjs/color-mode"],

  content: {},

  colorMode: {
    classSuffix: "",
    preference: "system",
    fallback: "light",
  },

  tailwindcss: {
    cssPath: "~/assets/css/main.css",
  },

  app: {
    head: {
      htmlAttrs: {
        lang: "ja",
      },
    },
  },
});
