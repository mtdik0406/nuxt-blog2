---
title: "Nuxt 3入門：モダンなVue.js開発"
description: "Nuxt 3の基本的な概念と、プロジェクトの始め方について解説します。Vue 3のComposition APIを活用した効率的な開発手法を紹介。"
date: "2024-01-15"
tags:
  - Nuxt
  - Vue.js
  - TypeScript
---

## Nuxt 3とは

Nuxt 3は、Vue.jsをベースにしたフルスタックフレームワークです。サーバーサイドレンダリング（SSR）、静的サイト生成（SSG）、クライアントサイドレンダリング（CSR）を柔軟に選択できます。

## 主な特徴

### 1. Vue 3 + Composition API

Nuxt 3はVue 3を採用しており、Composition APIを使った直感的な状態管理が可能です。

```vue
<script setup lang="ts">
const count = ref(0)
const double = computed(() => count.value * 2)
</script>
```

### 2. 自動インポート

コンポーネントやcomposablesは自動的にインポートされます。

```vue
<script setup>
// useStateやuseAsyncDataは自動インポート
const data = await useAsyncData('key', () => $fetch('/api/data'))
</script>
```

### 3. ファイルベースルーティング

`pages/` ディレクトリにファイルを配置するだけで、自動的にルーティングが生成されます。

```
pages/
├── index.vue        → /
├── about.vue        → /about
└── blog/
    └── [slug].vue   → /blog/:slug
```

## プロジェクトの作成

以下のコマンドで新しいNuxt 3プロジェクトを作成できます：

```bash
npx nuxi@latest init my-app
cd my-app
npm install
npm run dev
```

## まとめ

Nuxt 3は、モダンなWeb開発に必要な機能が揃った優れたフレームワークです。Vue.jsの経験があれば、すぐに始められるでしょう。

次回は、Nuxt Contentを使ったブログの作り方を紹介します。
