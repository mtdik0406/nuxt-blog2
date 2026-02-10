# Nuxt Blog 作成計画

## Context
個人用のブログサイトを新規作成する。Nuxt Contentを使用してMarkdownファイルでコンテンツを管理し、シンプルでミニマルなデザインで読みやすさを重視する。

GitHubでタスク管理を行い、Issue → 設計 → 実装 → テスト → レビューのワークフローで進める。

## 技術スタック
- **Nuxt 3**: Vue.jsベースのフレームワーク
- **Nuxt Content v2**: Markdownコンテンツ管理
- **TailwindCSS**: スタイリング
- **TypeScript**: 型安全性
- **Vercel**: デプロイ先

## 追加機能
- **SEO**: メタタグ、OGP、sitemap、robots.txt
- **ダークモード**: TailwindCSS dark:クラスで実装
- **RSS**: 不要

---

## 開発ルール

### コミットメッセージ規約（Conventional Commits）

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

**例:**
```
feat(blog): 記事一覧ページを追加
fix(header): モバイルでのナビゲーション崩れを修正
```

### コードスタイル（Biome）

```bash
pnpm add -D @biomejs/biome
pnpm biome init
```

**package.jsonスクリプト:**
```json
{
  "lint": "biome lint .",
  "format": "biome format --write .",
  "check": "biome check --write ."
}
```

### 命名規則

| 種類           | 規則       | 例               |
| -------------- | ---------- | ---------------- |
| コンポーネント | PascalCase | `PostCard.vue`   |
| composables    | use接頭辞  | `usePostList.ts` |
| ユーティリティ | camelCase  | `formatDate.ts`  |
| 型定義         | PascalCase | `types/Post.ts`  |

### エラーハンドリング方針

- ユーザー向けエラーは日本語で表示
- 開発時はconsole.errorでログ
- 404/500ページをカスタマイズ

### アクセシビリティ（a11y）

**必須対応:**
- セマンティックHTML（header, main, nav, article）
- 画像にalt属性
- フォーカス可視化（:focus-visible）
- コントラスト比 4.5:1以上

**チェックリスト（各Issue完了時）:**
- [ ] キーボード操作可能
- [ ] スクリーンリーダー対応
- [ ] 適切な見出し階層

### パフォーマンス基準

**Lighthouse目標:**
| 指標           | 目標 |
| -------------- | ---- |
| Performance    | 90+  |
| Accessibility  | 100  |
| Best Practices | 100  |
| SEO            | 100  |

**最適化項目:**
- 画像: WebP形式、lazy loading
- フォント: display: swap
- SSG: `nuxt generate`で静的生成

---

## GitHub設定
- **リポジトリ**: 新規作成（`nuxt-blog`）
- **ブランチ戦略**: Feature Branch
  - `main`: 本番用ブランチ
  - `feature/issue-N-xxx`: Issue毎の作業ブランチ
  - 各IssueはPRでレビュー後にmainへマージ

### GitHub Actions

**CI Workflow（`.github/workflows/ci.yml`）:**
```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v4
        with:
          version: 9

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install

      - name: Lint & Format check
        run: pnpm check

      - name: Type check
        run: pnpm nuxi typecheck

      - name: Build
        run: pnpm build

      - name: Test
        run: pnpm test
```

**ブランチ保護ルール:**
- `main`ブランチへの直接プッシュ禁止
- PRマージにはCIパス必須
- 最低1件のレビュー承認必須（任意）

### PRマージ条件
| チェック   | 必須 |
| ---------- | ---- |
| CI通過     | ✅    |
| Biome lint | ✅    |
| Type check | ✅    |
| Build成功  | ✅    |
| テスト通過 | ✅    |

## セキュリティ設定

### CLAUDE.mdでのセキュリティルール
プロジェクトの`CLAUDE.md`に以下のセキュリティルールを設定：

```markdown
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
```

### Hookify設定
`/hookify:configure` で以下のルールを設定：

| ルール             | 説明                                      |
| ------------------ | ----------------------------------------- |
| 機密ファイル保護   | .env*, credentials*への書き込みをブロック |
| Force Push防止     | `git push --force`をブロック              |
| 本番操作防止       | 本番環境へのデプロイコマンドをブロック    |
| 破壊的コマンド防止 | `rm -rf`, `git reset --hard`をブロック    |

### .gitignore設定
```
.env
.env.local
.env.*.local
*.pem
*.key
credentials.json
```

### Claude Code自動実行設定

**許可するコマンド（settings.jsonで設定）:**
```json
{
  "permissions": {
    "allow": [
      "Bash(pnpm:*)",
      "Bash(git add:*)",
      "Bash(git commit:*)",
      "Bash(git checkout:*)",
      "Bash(git branch:*)",
      "Bash(git push:*)",
      "Bash(git status)",
      "Bash(git diff:*)",
      "Bash(git log:*)",
      "Bash(gh issue:*)",
      "Bash(gh pr:*)",
      "Bash(mkdir:*)",
      "Bash(ls:*)",
      "Read",
      "Edit",
      "Write",
      "Glob",
      "Grep"
    ],
    "deny": [
      "Bash(rm -rf:*)",
      "Bash(git push --force:*)",
      "Bash(git reset --hard:*)",
      "Bash(vercel --prod:*)"
    ]
  }
}
```

**自動実行の流れ:**
1. Issueごとにブランチ作成 → 自動
2. コード実装 → 自動
3. Biomeチェック → 自動
4. コミット → 自動（Conventional Commits形式）
5. プッシュ → 自動
6. PR作成 → 自動
7. **マージ → 手動確認必須**

**安全のための制約:**
- **Sandboxモードで実行**（`claude --sandbox`）
- mainブランチへの直接プッシュ禁止
- PRマージは手動確認
- 本番デプロイは手動確認
- プロジェクト外へのファイル書き込み禁止

## Claude Code環境設定

### Memory設定
プロジェクト固有の情報をClaude Codeのメモリに保存：
- プロジェクト構造とファイルパス
- コーディングパターンと規約
- よく使うコマンド

保存先: `~/.claude/projects/nuxt-blog/memory/`

### MCP Server設定
**既存**
- `aws-documentation`: AWS関連ドキュメント
- `context7`: ライブラリドキュメント参照
- `serena`: シンボリックコード操作

**追加設定**
- `playwright`: E2Eテスト・UI確認自動化
  - ブラウザ操作の自動化
  - スクリーンショット取得
  - アクセシビリティスナップショット

### テスト環境
**Vitest**を使用：
- ユニットテスト（コンポーネント、ユーティリティ）
- Nuxt Test Utilsとの連携

```bash
pnpm add -D vitest @vue/test-utils happy-dom @nuxt/test-utils
```

### Storybook
**コンポーネントカタログ・ビジュアルテスト:**

```bash
pnpm add -D @storybook/vue3-vite @storybook/addon-essentials @storybook/addon-a11y
pnpm dlx storybook@latest init --type vue3
```

**package.jsonスクリプト:**
```json
{
  "storybook": "storybook dev -p 6006",
  "build-storybook": "storybook build"
}
```

**用途:**
- コンポーネントのドキュメント化
- ビジュアルリグレッションテスト
- アクセシビリティチェック（addon-a11y）
- デザイナーとの共有

## 開発ワークフロー

### 自動実行モード
Claude Codeに以下のように指示して全Issueを自動実行：

```
Issue #1から順番に実装してください。
各Issueで：
1. ブランチ作成
2. 実装
3. テスト実行
4. コミット＆プッシュ
5. PR作成
PRマージは私が手動で行います。
```

### 各Issueの進め方（自動実行）

| ステップ        | 作業内容                              | 実行     |
| --------------- | ------------------------------------- | -------- |
| 1. ブランチ作成 | `git checkout -b feature/issue-N-xxx` | 自動     |
| 2. 実装         | コード作成・編集                      | 自動     |
| 3. Lint/Format  | `pnpm check`                          | 自動     |
| 4. テスト       | `pnpm test`（該当時）                 | 自動     |
| 5. コミット     | Conventional Commits形式              | 自動     |
| 6. プッシュ     | `git push -u origin`                  | 自動     |
| 7. PR作成       | `gh pr create`                        | 自動     |
| 8. **マージ**   | PR確認後                              | **手動** |

### 使用するClaude Code機能

**Skills（スキル）**
- `/commit` - Gitコミット作成
- `/commit-push-pr` - コミット→プッシュ→PR作成を一括実行
- `/code-review:code-review` - PRのコードレビュー
- `/feature-dev:feature-dev` - 機能開発ガイド

**Agents（エージェント）**
- `feature-dev:code-architect` - アーキテクチャ設計
- `feature-dev:code-explorer` - コードベース調査
- `feature-dev:code-reviewer` - コードレビュー
- `pr-review-toolkit:code-reviewer` - PRレビュー
- `code-simplifier:code-simplifier` - コード簡素化

**自動化ワークフロー例**
```
Issue作成
  ↓
/feature-dev:feature-dev で機能開発開始
  ↓
実装完了後 /commit でコミット
  ↓
/commit-push-pr でPR作成
  ↓
/pr-review-toolkit:review-pr でレビュー
  ↓
マージ
```

---

### Issue #0: 自動実行環境セットアップ（手動）
**この作業は自動実行前に手動で行う**

1. **GitHubリポジトリ作成**
```bash
gh repo create nuxt-blog --public --clone
cd nuxt-blog
```

2. **Claude Code設定（.claude/settings.json）**
```bash
mkdir -p .claude
cat > .claude/settings.json << 'EOF'
{
  "permissions": {
    "allow": [
      "Bash(pnpm:*)",
      "Bash(git add:*)",
      "Bash(git commit:*)",
      "Bash(git checkout:*)",
      "Bash(git branch:*)",
      "Bash(git push:*)",
      "Bash(git status)",
      "Bash(git diff:*)",
      "Bash(git log:*)",
      "Bash(gh issue:*)",
      "Bash(gh pr:*)",
      "Bash(mkdir:*)",
      "Bash(ls:*)"
    ],
    "deny": [
      "Bash(rm -rf:*)",
      "Bash(git push --force:*)",
      "Bash(git reset --hard:*)"
    ]
  }
}
EOF
```

3. **Sandbox有効化**
Claude Codeをsandboxモードで起動：
```bash
claude --sandbox
```

**Sandboxの効果:**
- プロジェクトディレクトリ外へのファイル書き込み禁止
- システムファイルへのアクセス制限
- ネットワークアクセスは許可（pnpm, git, gh用）

**注意:** sandbox内でも以下は実行可能：
- プロジェクト内のファイル編集
- pnpm コマンド
- git / gh コマンド

4. **Hookify設定**
```bash
# Claude Codeで実行
/hookify:configure
```
以下のルールを有効化：
- 機密ファイル保護
- Force Push防止
- 破壊的コマンド防止

5. **自動実行開始**
```
Issue #1から順番に実装してください。
PRマージは私が手動で行います。
```

---

### Phase 0: 初期セットアップ

#### Issue #1: プロジェクト初期化
**設計**
- Nuxt 3プロジェクトの作成
- 必要な依存関係のインストール（@nuxt/content, @nuxtjs/tailwindcss）
- TypeScript設定
- Gitリポジトリ初期化
- GitHub Actions CI設定

**実装**
```bash
pnpm dlx nuxi@latest init . --packageManager pnpm
pnpm add @nuxt/content @nuxtjs/tailwindcss @nuxtjs/color-mode
pnpm add -D @biomejs/biome
pnpm biome init
```

**GitHub Actions設定:**
- `.github/workflows/ci.yml`作成
- Lint, Type check, Build, Testを自動実行

**テスト**
- `pnpm dev` で開発サーバーが起動することを確認
- `pnpm check` でBiomeチェックが通ること
- GitHub ActionsのCIが通ること

---

#### Issue #2: プロジェクトドキュメント作成
**設計**
- プロジェクト固有のルールとドキュメントを定義

**実装**
- **CLAUDE.md**
  - コーディング規約（Vue Composition API, TypeScript）
  - 開発ルール（Conventional Commits, Biome, 命名規則）
  - セキュリティルール
  - コマンド一覧
  - フォルダ構造説明
- **README.md**
  - プロジェクト概要
  - セットアップ手順
  - 開発コマンド一覧
  - ディレクトリ構造
  - デプロイ方法
- **LICENSE**
  - MITライセンス

**テスト**
- 内容の確認

---

### Phase 1: 基本構造

#### Issue #3: レイアウト作成
**設計**
```
layouts/
└── default.vue  # ヘッダー、メインコンテンツ、フッター
components/
├── Header.vue   # サイト名、ナビゲーション、ダークモード切替
├── Footer.vue   # コピーライト
└── ThemeToggle.vue  # ダークモード切替ボタン
composables/
└── useColorMode.ts  # テーマ状態管理
pages/
└── error.vue    # 404/500エラーページ
```

**実装**
- シンプルなヘッダー（サイト名、ホームリンク）
- フッター（コピーライト表示）
- セマンティックHTML使用（header, main, nav, footer）
- TailwindCSSでミニマルスタイリング
- フォーカスリング（:focus-visible）対応
- 404/500エラーページ
- **ダークモード対応**
  - `@nuxtjs/color-mode`モジュール使用
  - システム設定に追従（prefers-color-scheme）
  - 手動切替ボタン（ThemeToggle）
  - LocalStorageで設定保持

**テスト**
- レイアウトが正しく表示されることを確認
- キーボード操作可能を確認
- ダークモード切替が動作すること

---

#### Issue #4: トップページ（記事一覧）
**設計**
```
pages/
└── index.vue    # 最新記事一覧
components/
├── PostCard.vue # 記事カード
└── PostMeta.vue # 日付・タグ表示
```

**実装**
- queryContentで記事一覧取得
- PostCardコンポーネントで記事表示
- 日付降順でソート

**テスト**
- 記事一覧が表示されることを確認
- クリックで詳細ページへ遷移することを確認

---

#### Issue #5: 記事詳細ページ
**設計**
```
pages/
└── blog/
    └── [...slug].vue  # 動的ルート
```

**実装**
- ContentDocコンポーネントでMarkdown表示
- 記事メタ情報（日付、タグ）表示
- 前後の記事へのナビゲーション

**テスト**
- 記事が正しく表示されることを確認
- Markdownが適切にレンダリングされることを確認

---

#### Issue #6: タグページ
**設計**
```
pages/
└── tags/
    └── [tag].vue  # タグ別一覧
```

**実装**
- タグでフィルタリングした記事一覧
- タグ一覧ページ（任意）

**テスト**
- タグクリックでフィルタリングされることを確認

---

### Phase 2: コンテンツ

#### Issue #7: サンプル記事作成
**設計**
```
content/
└── blog/
    ├── first-post.md
    └── second-post.md
```

**実装**
- frontmatter（title, description, date, tags）
- 記事本文

**テスト**
- 記事が一覧・詳細ページに表示されることを確認

---

### Phase 3: SEO・デプロイ

#### Issue #8: SEO設定
**設計**
- Nuxt SEOモジュールまたは手動設定

**実装**
- `nuxt.config.ts`にメタタグ設定
- 各ページにOGP設定（useHead/useSeoMeta）
- `public/robots.txt`作成
- `@nuxtjs/sitemap`でsitemap自動生成

**テスト**
- OGPデバッガーでOGP確認
- sitemap.xmlが生成されることを確認

---

#### Issue #9: Vercelデプロイ設定
**設計**
- Vercel CLIまたはGitHub連携

**実装**
- `vercel.json`設定（必要に応じて）
- GitHub連携でデプロイ自動化
- 環境変数設定（必要に応じて）

**テスト**
- Vercelにデプロイされることを確認
- 本番URLでサイトが動作することを確認

---

### Phase 4: テスト・品質

#### Issue #10: テスト環境セットアップ
**設計**
- Vitest + Nuxt Test Utils
- テストディレクトリ構成

**実装**
```bash
pnpm add -D vitest @vue/test-utils happy-dom @nuxt/test-utils
```
- `vitest.config.ts`作成
- `package.json`にテストスクリプト追加

**テスト**
- `pnpm test`が動作することを確認

---

#### Issue #11: E2Eテスト（Playwright）
**設計**
- Playwright MCP Serverを活用
- 主要フローのE2Eテスト

**実装**
- トップページ表示テスト
- 記事詳細遷移テスト
- タグフィルタリングテスト

**テスト**
- 全E2Eテストがパスすることを確認

---

#### Issue #12: Storybook設定
**設計**
- コンポーネントカタログ作成
- ビジュアルテスト環境

**実装**
```bash
pnpm add -D @storybook/vue3-vite @storybook/addon-essentials @storybook/addon-a11y
pnpm dlx storybook@latest init --type vue3
```
- 各コンポーネントのStory作成
  - `Header.stories.ts`
  - `Footer.stories.ts`
  - `PostCard.stories.ts`
  - `PostMeta.stories.ts`
- addon-a11yでアクセシビリティチェック

**テスト**
- `pnpm storybook`で起動確認
- 全コンポーネントが表示されること
- a11yチェックがパスすること

---

#### Issue #13: Claude Code Memory設定
**設計**
- プロジェクト固有情報の保存

**実装**
- MEMORY.mdにプロジェクト概要
- パターンファイル（patterns.md）作成
- コマンドファイル（commands.md）作成

**テスト**
- 新しいセッションで情報が引き継がれることを確認

---

## ファイル構成（最終形）
```
nuxt-blog/
├── .github/
│   └── workflows/
│       └── ci.yml       # GitHub Actions CI
├── .storybook/
│   ├── main.ts          # Storybook設定
│   └── preview.ts       # プレビュー設定
├── CLAUDE.md
├── README.md            # プロジェクト説明
├── LICENSE              # MITライセンス
├── .gitignore
├── biome.json           # Linter/Formatter設定
├── content/
│   └── blog/
│       ├── first-post.md
│       └── second-post.md
├── components/
│   ├── Header.vue
│   ├── Header.stories.ts
│   ├── Footer.vue
│   ├── Footer.stories.ts
│   ├── PostCard.vue
│   ├── PostCard.stories.ts
│   ├── PostMeta.vue
│   ├── PostMeta.stories.ts
│   ├── ThemeToggle.vue      # ダークモード切替
│   └── ThemeToggle.stories.ts
├── composables/
│   ├── usePostList.ts       # 記事一覧取得ロジック
│   └── useColorMode.ts      # テーマ状態管理
├── types/
│   └── index.ts         # 型定義
├── utils/
│   └── formatDate.ts    # 日付フォーマット
├── pages/
│   ├── index.vue
│   ├── error.vue        # エラーページ
│   ├── blog/
│   │   └── [...slug].vue
│   └── tags/
│       └── [tag].vue
├── layouts/
│   └── default.vue
├── tests/
│   ├── components/      # コンポーネントテスト
│   └── e2e/             # E2Eテスト
├── public/
│   └── robots.txt
├── nuxt.config.ts       # SEO設定含む
├── vitest.config.ts     # テスト設定
├── vercel.json          # デプロイ設定（必要に応じて）
└── package.json
```

**Claude Code Memory** (`~/.claude/projects/.../memory/`)
```
memory/
├── MEMORY.md            # プロジェクト概要
├── patterns.md          # コーディングパターン
└── commands.md          # よく使うコマンド
```

## Issue一覧（全14件）

| Phase | Issue | 内容                             | 実行     |
| ----- | ----- | -------------------------------- | -------- |
| -     | #0    | 自動実行環境セットアップ         | **手動** |
| 0     | #1    | プロジェクト初期化               | 自動     |
| 0     | #2    | CLAUDE.md作成                    | 自動     |
| 1     | #3    | レイアウト作成                   | 自動     |
| 1     | #4    | トップページ（記事一覧）         | 自動     |
| 1     | #5    | 記事詳細ページ                   | 自動     |
| 1     | #6    | タグページ                       | 自動     |
| 2     | #7    | サンプル記事作成                 | 自動     |
| 3     | #8    | SEO設定                          | 自動     |
| 3     | #9    | Vercelデプロイ設定               | 自動     |
| 4     | #10   | テスト環境セットアップ（Vitest） | 自動     |
| 4     | #11   | E2Eテスト（Playwright）          | 自動     |
| 4     | #12   | Storybook設定                    | 自動     |
| 4     | #13   | Claude Code Memory設定           | 自動     |

**注意:** 各IssueのPRマージは手動確認

## 検証方法
1. `pnpm dev` で開発サーバー起動
2. `pnpm check` でBiomeチェック通過
3. トップページで記事一覧表示確認
4. 記事詳細ページ表示確認
5. タグフィルタリング確認
6. モバイル表示確認
7. キーボード操作確認（Tab移動、Enter選択）
8. Lighthouse測定（全指標90+目標）
