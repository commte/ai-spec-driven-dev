# TODOアプリ アーキテクチャ

## 技術スタック

| カテゴリ | 技術 | 選定理由 |
|---------|------|---------|
| フレームワーク | Next.js 15 (App Router) | React最新機能との統合、ファイルベースルーティング |
| スタイリング | Tailwind CSS 4 | ユーティリティファーストで高速なUI構築 |
| UIコンポーネント | shadcn/ui (CVA + clsx + tailwind-merge) | コピー&ペースト型で柔軟にカスタマイズ可能 |
| アイコン | Lucide React | 軽量でTree-shakingに対応 |
| テスト | Vitest + Testing Library | Vite互換の高速テスト実行 |
| リンター/フォーマッター | Biome | ESLint + Prettierの代替、高速な一体型ツール |
| 言語 | TypeScript 5.8 | 型安全性の確保 |

## コンポーネント構成

```
src/
├── app/
│   ├── layout.tsx          # ルートレイアウト（メタデータ、フォント）
│   ├── page.tsx            # メインページ（TodoApp を配置）
│   └── globals.css         # Tailwind CSSのインポート
├── components/
│   ├── todo-app.tsx        # アプリ全体の統括コンポーネント
│   ├── todo-input.tsx      # TODO入力フォーム
│   ├── todo-list.tsx       # TODOリスト表示
│   ├── todo-item.tsx       # 個別TODO項目
│   └── todo-filter.tsx     # フィルタータブ
├── hooks/
│   ├── use-todos.ts        # TODO CRUD操作のカスタムフック
│   └── use-todo-filter.ts  # フィルター状態管理のカスタムフック
├── lib/
│   ├── storage.ts          # localStorage抽象化レイヤー
│   ├── validators.ts       # バリデーションロジック
│   └── utils.ts            # cn()ヘルパー等の汎用ユーティリティ
└── types/
    └── todo.ts             # Todo型、FilterType型の定義
```

## データフロー

```
localStorage
    ↕ (読み書き)
storage.ts (抽象化レイヤー)
    ↕
useTodos() カスタムフック
    │
    ├── todos: Todo[]           → TodoList → TodoItem
    ├── addTodo(title)          ← TodoInput
    ├── toggleTodo(id)          ← TodoItem
    ├── updateTodo(id, title)   ← TodoItem
    └── deleteTodo(id)          ← TodoItem

useTodoFilter() カスタムフック
    │
    ├── filter: FilterType      → TodoFilter（現在のフィルター表示）
    ├── setFilter(filter)       ← TodoFilter（フィルター切替）
    └── filteredTodos(todos)    → TodoList（フィルター適用済みリスト）
```

## 設計上の判断

### Client Components中心の構成

このアプリはlocalStorageをデータストアとして使用するため、サーバーコンポーネントでのデータ取得は行わない。`page.tsx`からClient Componentとして`TodoApp`を配置し、クライアントサイドで完結する構成とする。

### カスタムフックによる状態管理

外部の状態管理ライブラリ（Redux, Zustand等）を導入せず、React標準の`useState`と`useEffect`をカスタムフックでラップして使用する。TODOアプリ程度の規模では、カスタムフックで十分にロジックとUIを分離できる。

### localStorage抽象化

`storage.ts`でlocalStorageのアクセスを抽象化することで、以下の利点を得る:
- SSR時のwindow未定義エラーを防止
- JSON.parse/stringifyのエラーハンドリングを集約
- テスト時のモック差し替えが容易
