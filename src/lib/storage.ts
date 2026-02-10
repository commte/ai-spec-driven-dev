import { Todo } from "@/types/todo";

const STORAGE_KEY = "todo-app-todos";

export function getTodos(): Todo[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    return JSON.parse(data) as Todo[];
  } catch {
    return [];
  }
}

export function saveTodos(todos: Todo[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch {
    // 保存失敗時は何もしない
  }
}
