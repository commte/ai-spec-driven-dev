"use client";

import { useTodos } from "@/hooks/use-todos";
import { useTodoFilter } from "@/hooks/use-todo-filter";
import { TodoForm } from "@/components/todo-form";
import { TodoFilter } from "@/components/todo-filter";
import { TodoList } from "@/components/todo-list";

export default function Home() {
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodos();
  const { filter, setFilter, filterTodos, activeCount } = useTodoFilter();

  const filteredTodos = filterTodos(todos);

  return (
    <main className="mx-auto max-w-lg px-4 py-12">
      <h1 className="mb-8 text-center text-3xl font-bold text-gray-900">
        TODO
      </h1>
      <div className="space-y-6">
        <TodoForm onAdd={addTodo} />
        <TodoFilter
          current={filter}
          onChange={setFilter}
          activeCount={activeCount(todos)}
        />
        <TodoList
          todos={filteredTodos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
        />
      </div>
    </main>
  );
}
