import { useState } from "react";
import { Plus, Calendar, XCircle } from "lucide-react";
import type { Priority } from "../types";
import { PrioritySelector } from "./PrioritySelector";

interface TodoInputProps {
  onAdd: (text: string, priority: Priority, dueDate: string | null) => void;
}

export function TodoInput({ onAdd }: TodoInputProps) {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [dueDate, setDueDate] = useState("");

  const handleAdd = () => {
    if (text.trim() === "") return;
    onAdd(text.trim(), priority, dueDate || null);
    setText("");
    setPriority("medium");
    setDueDate("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleAdd();
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 mb-6">
      <div className="flex flex-col gap-3">
        <div className="flex gap-3">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="今天要做什么？"
            className="flex-1 px-4 py-3 bg-indigo-50 border-2 border-indigo-100 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:border-indigo-300 focus:bg-white transition-all duration-200"
          />
          <button
            onClick={handleAdd}
            className="px-5 py-3 bg-gradient-to-r from-sky-500 to-purple-500 text-white rounded-xl font-medium hover:from-sky-600 hover:to-purple-600 active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2"
          >
            <Plus size={20} />
            <span className="hidden sm:inline">添加任务</span>
          </button>
        </div>
        <PrioritySelector value={priority} onChange={setPriority} />
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500 shrink-0 flex items-center gap-1.5">
            <Calendar size={14} />
            截止日期:
          </span>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="flex-1 px-3 py-2 bg-indigo-50 border-2 border-indigo-100 rounded-xl text-gray-700 text-sm focus:outline-none focus:border-indigo-300 focus:bg-white transition-all duration-200"
          />
          {dueDate && (
            <button
              onClick={() => setDueDate("")}
              className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <XCircle size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
