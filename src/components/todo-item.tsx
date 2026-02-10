"use client";

import { Todo } from "@/types/todo";
import { cn } from "@/lib/utils";

type Props = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export function TodoItem({ todo, onToggle, onDelete }: Props) {
  return (
    <div className="group flex items-center gap-3 rounded-md border border-gray-200 px-3 py-2">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
      />
      <span
        className={cn(
          "flex-1 text-sm",
          todo.completed && "text-gray-400 line-through"
        )}
      >
        {todo.title}
      </span>
      <button
        onClick={() => onDelete(todo.id)}
        className="invisible text-gray-400 hover:text-red-600 group-hover:visible"
        aria-label="削除"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
}
