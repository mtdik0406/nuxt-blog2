# Nuxt Blog

Nuxt 3 + Nuxt Content v2で構築した個人ブログサイト。

## 特徴

- Markdownでコンテンツ管理
- ダークモード対応
- レスポンシブデザイン
- SEO最適化
- 高速な静的生成

## 技術スタック

- [Nuxt 3](https://nuxt.com/)
- [Nuxt Content v2](https://content.nuxt.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)

## セットアップ

```bash
# 依存関係のインストール
pnpm install

# 開発サーバー起動
pnpm dev
```

開発サーバーは http://localhost:3000 で起動します。

## 開発コマンド

```bash
pnpm dev        # 開発サーバー起動
pnpm build      # 本番ビルド
pnpm generate   # 静的生成
pnpm preview    # ビルドプレビュー
pnpm check      # Biomeチェック（lint + format）
pnpm typecheck  # 型チェック
```

## ディレクトリ構造

```
nuxt-blog2/
├── assets/css/        # グローバルスタイル
├── components/        # Vueコンポーネント
├── composables/       # Composition API関数
├── content/blog/      # Markdown記事
├── layouts/           # レイアウト
├── pages/             # ページコンポーネント
├── public/            # 静的ファイル
├── types/             # 型定義
└── utils/             # ユーティリティ関数
```

## 記事の追加

`content/blog/` ディレクトリにMarkdownファイルを追加します。

```markdown
---
title: 記事タイトル
description: 記事の説明
date: 2024-01-01
tags:
  - タグ1
  - タグ2
---

記事の本文...
```

## デプロイ

Vercelで自動デプロイされます。`main`ブランチへのプッシュで本番環境に反映されます。

## ライセンス

MIT
