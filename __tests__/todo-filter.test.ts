import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useTodoFilter } from "@/hooks/use-todo-filter";
import type { Todo } from "@/types/todo";

const sampleTodos: Todo[] = [
  { id: "1", title: "未完了タスク1", completed: false, createdAt: 1000 },
  { id: "2", title: "完了タスク1", completed: true, createdAt: 2000 },
  { id: "3", title: "未完了タスク2", completed: false, createdAt: 3000 },
];

describe("useTodoFilter", () => {
  it("初期フィルターは'all'である", () => {
    const { result } = renderHook(() => useTodoFilter());
    expect(result.current.filter).toBe("all");
  });

  it("setFilterでフィルターが変更される", () => {
    const { result } = renderHook(() => useTodoFilter());

    act(() => {
      result.current.setFilter("active");
    });

    expect(result.current.filter).toBe("active");

    act(() => {
      result.current.setFilter("completed");
    });

    expect(result.current.filter).toBe("completed");
  });

  it("filterTodos: 'all'は全件返す", () => {
    const { result } = renderHook(() => useTodoFilter());

    const filtered = result.current.filterTodos(sampleTodos);
    expect(filtered).toHaveLength(3);
  });

  it("filterTodos: 'active'は未完了のみ返す", () => {
    const { result } = renderHook(() => useTodoFilter());

    act(() => {
      result.current.setFilter("active");
    });

    const filtered = result.current.filterTodos(sampleTodos);
    expect(filtered).toHaveLength(2);
    expect(filtered.every((t) => !t.completed)).toBe(true);
  });

  it("filterTodos: 'completed'は完了のみ返す", () => {
    const { result } = renderHook(() => useTodoFilter());

    act(() => {
      result.current.setFilter("completed");
    });

    const filtered = result.current.filterTodos(sampleTodos);
    expect(filtered).toHaveLength(1);
    expect(filtered[0].completed).toBe(true);
  });

  it("activeCount: 未完了件数を返す", () => {
    const { result } = renderHook(() => useTodoFilter());

    const count = result.current.activeCount(sampleTodos);
    expect(count).toBe(2);
  });
});
