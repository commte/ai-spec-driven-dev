## プロジェクト概要

TODOアプリ。Next.js 15 App Router + Tailwind CSS + shadcn/ui

## ディレクトリ構造

- `src/app/` - App Routerページ（Client Components中心）
- `src/components/` - UIコンポーネント
- `src/hooks/` - カスタムフック（状態管理）
- `src/lib/` - ユーティリティ（localStorage抽象化、バリデーション）
- `src/types/` - 型定義
- `specs/` - 仕様ファイル（SDD）

## 開発コマンド

- `bun run dev` - 開発サーバー
- `bun run build` - 本番ビルド
- `bun run test` - Vitestでテスト実行
- `bun run lint` - Biomeでリント

## 設計方針

- Client Components中心（localStorage依存のため）
- 状態管理はカスタムフック（use-todos, use-todo-filter）
- データ永続化はlocalStorage

## 詳細ドキュメント

- アーキテクチャ: docs/architecture.md
- CRUD仕様: specs/todo-crud.spec.md
- フィルター仕様: specs/todo-filter.spec.md
- バリデーション仕様: specs/todo-validation.spec.md
