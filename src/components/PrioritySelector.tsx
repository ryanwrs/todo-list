import type { Priority } from "../types";
import { PRIORITIES, priorityConfig } from "../constants";

interface PrioritySelectorProps {
  value: Priority;
  onChange: (p: Priority) => void;
}

export function PrioritySelector({ value, onChange }: PrioritySelectorProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-gray-500 shrink-0">优先级:</span>
      {PRIORITIES.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold border-2 transition-all duration-200 active:scale-95 ${
            value === p
              ? priorityConfig[p].color
              : "bg-white text-gray-400 border-gray-200 hover:border-gray-300 hover:text-gray-600"
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${value === p ? "bg-white/70" : priorityConfig[p].dot}`}
          />
          {priorityConfig[p].label}
        </button>
      ))}
    </div>
  );
}
