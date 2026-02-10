"use client";

import { useState } from "react";
import { Todo, FilterType } from "@/types/todo";

export function useTodoFilter() {
  const [filter, setFilter] = useState<FilterType>("all");

  function filterTodos(todos: Todo[]): Todo[] {
    switch (filter) {
      case "active":
        return todos.filter((todo) => !todo.completed);
      case "completed":
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  }

  function activeCount(todos: Todo[]): number {
    return todos.filter((todo) => !todo.completed).length;
  }

  return { filter, setFilter, filterTodos, activeCount };
}
