import type { StorybookConfig } from "@storybook-vue/nuxt";

const config: StorybookConfig = {
  stories: ["../stories/**/*.stories.@(js|ts)"],
  addons: ["@storybook/addon-essentials"],
  framework: {
    name: "@storybook-vue/nuxt",
    options: {},
  },
};

export default config;
