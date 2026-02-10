"use client";

import { useState } from "react";

type Props = {
  onAdd: (title: string) => { success: boolean; error?: string };
};

export function TodoForm({ onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string | undefined>();

  function handleSubmit() {
    const result = onAdd(title);
    if (result.success) {
      setTitle("");
      setError(undefined);
    } else {
      setError(result.error);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handleSubmit();
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="新しいTODOを入力..."
          className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <button
          onClick={handleSubmit}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          追加
        </button>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
