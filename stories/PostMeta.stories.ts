import type { Meta, StoryObj } from "@storybook/vue3";
import PostMeta from "../components/PostMeta.vue";

const meta: Meta<typeof PostMeta> = {
  title: "Components/PostMeta",
  component: PostMeta,
  tags: ["autodocs"],
  argTypes: {
    date: {
      control: "text",
      description: "記事の投稿日",
    },
    tags: {
      control: "object",
      description: "記事のタグリスト",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    date: "2024-01-15",
    tags: ["Nuxt", "Vue.js", "TypeScript"],
  },
};

export const WithoutTags: Story = {
  args: {
    date: "2024-01-15",
  },
};

export const SingleTag: Story = {
  args: {
    date: "2024-01-15",
    tags: ["お知らせ"],
  },
};

export const ManyTags: Story = {
  args: {
    date: "2024-01-15",
    tags: ["Nuxt", "Vue.js", "TypeScript", "TailwindCSS", "Vitest", "Playwright"],
  },
};
