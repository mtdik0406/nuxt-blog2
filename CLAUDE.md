# CLAUDE.md - Nuxt Blog プロジェクト

## プロジェクト概要
Nuxt 3とNuxt Content v2を使用した個人ブログサイト。Markdownでコンテンツを管理し、シンプルでミニマルなデザインで読みやすさを重視。

## 技術スタック
- **Nuxt 3**: Vue.jsベースのフレームワーク
- **Nuxt Content v3**: Markdownコンテンツ管理（queryCollection API）
- **TailwindCSS**: スタイリング（ダークモード対応）
- **TypeScript**: 型安全性
- **Biome**: Linter/Formatter
- **Vitest**: ユニットテスト
- **Playwright**: E2Eテスト
- **Storybook**: コンポーネントカタログ
- **Vercel**: デプロイ先

## コーディング規約

### Vue Composition API
- `<script setup lang="ts">` を使用
- Composition APIのみ使用（Options API禁止）

### TypeScript
- 厳密な型定義を使用
- `any`型の使用を避ける
- インターフェースは`types/`ディレクトリに配置

### 命名規則
| 種類           | 規則       | 例               |
| -------------- | ---------- | ---------------- |
| コンポーネント | PascalCase | `PostCard.vue`   |
| composables    | use接頭辞  | `usePostList.ts` |
| ユーティリティ | camelCase  | `formatDate.ts`  |
| 型定義         | PascalCase | `types/Post.ts`  |

### コミットメッセージ（Conventional Commits）
```
<type>(<scope>): <description>
```

| Type     | 説明                           |
| -------- | ------------------------------ |
| feat     | 新機能                         |
| fix      | バグ修正                       |
| docs     | ドキュメント                   |
| style    | フォーマット（動作に影響なし） |
| refactor | リファクタリング               |
| test     | テスト追加・修正               |
| chore    | ビルド・設定変更               |

## フォルダ構造
```
nuxt-blog2/
├── .storybook/        # Storybook設定
├── assets/css/        # グローバルスタイル
├── components/        # Vueコンポーネント
├── composables/       # Composition API関数
├── content/blog/      # Markdown記事
├── e2e/               # Playwright E2Eテスト
├── layouts/           # レイアウト
├── pages/             # ページコンポーネント
├── public/            # 静的ファイル
├── stories/           # Storybookストーリー
├── tests/             # Vitestユニットテスト
├── types/             # 型定義
└── utils/             # ユーティリティ関数
```

## コマンド一覧
```bash
# 開発
pnpm dev        # 開発サーバー起動
pnpm build      # 本番ビルド
pnpm generate   # 静的生成
pnpm preview    # ビルドプレビュー

# コード品質
pnpm check      # Biomeチェック（lint + format）
pnpm lint       # Biome lint
pnpm format     # Biome format
pnpm typecheck  # 型チェック

# テスト
pnpm test       # Vitest（ウォッチモード）
pnpm test:run   # Vitest（1回実行）
pnpm test:e2e   # Playwright E2Eテスト
pnpm test:e2e:ui # Playwright UIモード

# Storybook
pnpm storybook       # Storybook起動（port 6006）
pnpm build-storybook # Storybookビルド
```

## Security Rules

### 禁止事項
- 環境変数ファイル（.env, .env.local）の直接表示・編集禁止
- 認証情報やAPIキーのハードコーディング禁止
- node_modules、.git内のファイル編集禁止
- 本番環境への直接デプロイ禁止
- `rm -rf`、`git reset --hard`等の破壊的コマンド禁止

### 必須事項
- 機密情報は環境変数で管理
- .gitignoreに機密ファイルを含める
- コミット前にセンシティブ情報がないか確認

## アクセシビリティ（a11y）

### 必須対応
- セマンティックHTML（header, main, nav, article）
- 画像にalt属性
- フォーカス可視化（:focus-visible）
- コントラスト比 4.5:1以上

### チェックリスト（各Issue完了時）
- [ ] キーボード操作可能
- [ ] スクリーンリーダー対応
- [ ] 適切な見出し階層

## パフォーマンス基準

### Lighthouse目標
| 指標           | 目標 |
| -------------- | ---- |
| Performance    | 90+  |
| Accessibility  | 100  |
| Best Practices | 100  |
| SEO            | 100  |

### 最適化項目
- 画像: WebP形式、lazy loading
- フォント: display: swap
- SSG: `nuxt generate`で静的生成
