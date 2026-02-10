"use client";

import { FilterType } from "@/types/todo";
import { cn } from "@/lib/utils";

type Props = {
  current: FilterType;
  onChange: (filter: FilterType) => void;
  activeCount: number;
};

const filters: { value: FilterType; label: string }[] = [
  { value: "all", label: "すべて" },
  { value: "active", label: "未完了" },
  { value: "completed", label: "完了" },
];

export function TodoFilter({ current, onChange, activeCount }: Props) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-1">
        {filters.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => onChange(value)}
            className={cn(
              "rounded-md px-3 py-1 text-sm font-medium",
              current === value
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
            )}
          >
            {label}
          </button>
        ))}
      </div>
      <span className="text-sm text-gray-500">
        未完了: {activeCount}件
      </span>
    </div>
  );
}
