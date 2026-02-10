import type { Meta, StoryObj } from "@storybook/vue3";
import PostCard from "../components/PostCard.vue";

const meta: Meta<typeof PostCard> = {
  title: "Components/PostCard",
  component: PostCard,
  tags: ["autodocs"],
  argTypes: {
    post: {
      control: "object",
      description: "ブログ記事のデータ",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    post: {
      path: "/blog/hello-world",
      title: "ブログを開設しました",
      description:
        "Nuxt 3とNuxt Contentを使って、個人ブログを作成しました。技術的な学びや日々の気づきを発信していきます。",
      date: "2024-01-01",
      tags: ["お知らせ", "ブログ"],
    },
  },
};

export const WithoutDescription: Story = {
  args: {
    post: {
      path: "/blog/no-description",
      title: "説明なしの記事",
      description: "",
      date: "2024-01-15",
      tags: ["テスト"],
    },
  },
};

export const LongTitle: Story = {
  args: {
    post: {
      path: "/blog/long-title",
      title:
        "これは非常に長いタイトルの記事です。タイトルが長い場合のレイアウトを確認するためのサンプルです。",
      description: "タイトルが長い場合のテスト",
      date: "2024-01-20",
      tags: ["テスト"],
    },
  },
};
