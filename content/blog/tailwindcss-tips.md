---
title: "TailwindCSS実践Tips"
description: "TailwindCSSを使った効率的なスタイリングのコツと、よく使うユーティリティクラスのパターンを紹介します。"
date: "2024-01-20"
tags:
  - TailwindCSS
  - CSS
  - デザイン
---

## TailwindCSSとは

TailwindCSSは、ユーティリティファーストのCSSフレームワークです。事前定義されたクラスを組み合わせることで、カスタムデザインを素早く構築できます。

## よく使うパターン

### レスポンシブデザイン

TailwindCSSでは、ブレークポイントプレフィックスを使ってレスポンシブデザインを実装します。

```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <!-- カードコンポーネント -->
</div>
```

### ダークモード対応

`dark:` プレフィックスを使って、ダークモード時のスタイルを定義できます。

```html
<div class="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
  ダークモード対応のコンテンツ
</div>
```

### Flexboxレイアウト

```html
<!-- 中央寄せ -->
<div class="flex items-center justify-center h-screen">
  コンテンツ
</div>

<!-- スペース均等配置 -->
<div class="flex items-center justify-between">
  <span>左</span>
  <span>右</span>
</div>
```

### カードコンポーネント

```html
<article class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow">
  <h2 class="text-xl font-bold mb-2">タイトル</h2>
  <p class="text-gray-600 dark:text-gray-400">説明文</p>
</article>
```

## カスタマイズ

`tailwind.config.js` でテーマをカスタマイズできます：

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
        secondary: '#64748b',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
}
```

## ベストプラクティス

1. **コンポーネント化**: 繰り返し使うスタイルはVueコンポーネントとして抽出
2. **@apply の使用は最小限に**: ユーティリティクラスをそのまま使う方が保守性が高い
3. **カスタムカラーの活用**: ブランドカラーは`tailwind.config.js`で定義

## まとめ

TailwindCSSは、一度慣れると非常に効率的にスタイリングができます。特にコンポーネントベースの開発との相性が良く、Vue.jsやReactとの組み合わせがおすすめです。
