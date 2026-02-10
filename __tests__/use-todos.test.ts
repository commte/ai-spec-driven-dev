import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useTodos } from "@/hooks/use-todos";

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();
Object.defineProperty(window, "localStorage", { value: localStorageMock });

Object.defineProperty(globalThis, "crypto", {
  value: {
    randomUUID: () => "test-uuid-" + Math.random().toString(36).slice(2),
  },
});

describe("useTodos", () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  it("初期状態はlocalStorageの内容を返す", () => {
    const stored = [
      { id: "1", title: "既存タスク", completed: false, createdAt: 1000 },
    ];
    localStorageMock.setItem("todo-app-todos", JSON.stringify(stored));

    const { result } = renderHook(() => useTodos());
    expect(result.current.todos).toEqual(stored);
  });

  it("addTodoでTODOが追加される", () => {
    const { result } = renderHook(() => useTodos());

    act(() => {
      result.current.addTodo("新しいタスク");
    });

    expect(result.current.todos).toHaveLength(1);
    expect(result.current.todos[0].title).toBe("新しいタスク");
    expect(result.current.todos[0].completed).toBe(false);
  });

  it("addTodoで空文字はエラーを返す", () => {
    const { result } = renderHook(() => useTodos());

    let response: { success: boolean; error?: string } | undefined;
    act(() => {
      response = result.current.addTodo("");
    });

    expect(response?.success).toBe(false);
    expect(response?.error).toBeDefined();
    expect(result.current.todos).toHaveLength(0);
  });

  it("toggleTodoでcompletedが切り替わる", () => {
    const stored = [
      { id: "1", title: "タスク", completed: false, createdAt: 1000 },
    ];
    localStorageMock.setItem("todo-app-todos", JSON.stringify(stored));

    const { result } = renderHook(() => useTodos());

    act(() => {
      result.current.toggleTodo("1");
    });

    expect(result.current.todos[0].completed).toBe(true);

    act(() => {
      result.current.toggleTodo("1");
    });

    expect(result.current.todos[0].completed).toBe(false);
  });

  it("deleteTodoでTODOが削除される", () => {
    const stored = [
      { id: "1", title: "タスク1", completed: false, createdAt: 1000 },
      { id: "2", title: "タスク2", completed: false, createdAt: 2000 },
    ];
    localStorageMock.setItem("todo-app-todos", JSON.stringify(stored));

    const { result } = renderHook(() => useTodos());

    act(() => {
      result.current.deleteTodo("1");
    });

    expect(result.current.todos).toHaveLength(1);
    expect(result.current.todos[0].id).toBe("2");
  });

  it("updateTodoでタイトルが変更される", () => {
    const stored = [
      { id: "1", title: "元のタスク", completed: false, createdAt: 1000 },
    ];
    localStorageMock.setItem("todo-app-todos", JSON.stringify(stored));

    const { result } = renderHook(() => useTodos());

    act(() => {
      result.current.updateTodo("1", "更新後のタスク");
    });

    expect(result.current.todos[0].title).toBe("更新後のタスク");
  });
});
