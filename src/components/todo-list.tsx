"use client";

import { Todo } from "@/types/todo";
import { TodoItem } from "@/components/todo-item";

type Props = {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export function TodoList({ todos, onToggle, onDelete }: Props) {
  if (todos.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-gray-400">
        TODOがありません
      </p>
    );
  }

  return (
    <div className="space-y-2">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
