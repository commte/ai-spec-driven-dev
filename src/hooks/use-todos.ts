"use client";

import { useState, useEffect } from "react";
import { Todo } from "@/types/todo";
import { getTodos, saveTodos } from "@/lib/storage";
import { validateTodoTitle } from "@/lib/validators";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    setTodos(getTodos());
  }, []);

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  function addTodo(title: string): { success: boolean; error?: string } {
    const validation = validateTodoTitle(title);
    if (!validation.valid) {
      return { success: false, error: validation.error };
    }

    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title: title.trim(),
      completed: false,
      createdAt: Date.now(),
    };

    setTodos((prev) => [newTodo, ...prev]);
    return { success: true };
  }

  function toggleTodo(id: string): void {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  function deleteTodo(id: string): void {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }

  function updateTodo(
    id: string,
    title: string
  ): { success: boolean; error?: string } {
    const validation = validateTodoTitle(title);
    if (!validation.valid) {
      return { success: false, error: validation.error };
    }

    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, title: title.trim() } : todo
      )
    );
    return { success: true };
  }

  return { todos, addTodo, toggleTodo, deleteTodo, updateTodo };
}
