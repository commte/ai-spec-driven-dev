# TODO App

Spec-Driven Developmentで構築したTODOアプリケーションです。

## 技術スタック

- **Next.js 16** (App Router)
- **React 19**
- **Tailwind CSS 4**
- **shadcn/ui**
- **Vitest** + Testing Library
- **Biome** (Linter / Formatter)
- **bun** (Package Manager)

## プロジェクト構成

```
specs/               # 仕様ファイル（自然言語による振る舞い定義）
  ├── todo-crud.spec.md
  ├── todo-filter.spec.md
  └── todo-validation.spec.md
__tests__/           # 仕様から生成したテスト
src/
  ├── app/           # App Router ページ
  ├── components/    # UI コンポーネント
  ├── hooks/         # カスタムフック（状態管理）
  ├── lib/           # ユーティリティ（localStorage, バリデーション）
  └── types/         # 型定義
docs/                # アーキテクチャドキュメント
```

## 開発の流れ

このプロジェクトは以下の順序で構築されています。

1. **仕様定義** (`specs/`) — 機能の振る舞いを自然言語で記述
2. **テスト生成** (`__tests__/`) — 仕様に基づきテストコードを生成
3. **実装生成** (`src/`) — テストを満たすコードを生成

仕様ファイルが Single Source of Truth として機能し、テストと実装の整合性を担保します。

## セットアップ

```bash
bun install
```

## コマンド

```bash
bun run dev        # 開発サーバー起動
bun run build      # 本番ビルド
bun run test       # テスト実行
bun run test:watch # テスト（ウォッチモード）
bun run lint       # リント
bun run format     # フォーマット
```

## 設計方針

- **Client Components 中心**: localStorage によるデータ永続化のため
- **カスタムフックで状態管理**: `use-todos`, `use-todo-filter`
- **サーバー不要**: すべてクライアントサイドで完結

## ライセンス

Private
