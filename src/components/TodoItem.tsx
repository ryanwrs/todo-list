import { useState } from "react";
import {
  Trash2,
  CheckCircle,
  Circle,
  Pencil,
  X,
  Check,
} from "lucide-react";
import type { Todo, Priority } from "../types";
import { PRIORITIES, priorityConfig, dueStatusConfig, getDueStatus, formatDueDate } from "../constants";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Pick<Todo, "text" | "priority" | "dueDate">>) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onUpdate, onDelete }: TodoItemProps) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState("");
  const [editPriority, setEditPriority] = useState<Priority>("medium");
  const [editDueDate, setEditDueDate] = useState("");

  const startEdit = () => {
    setEditText(todo.text);
    setEditPriority(todo.priority);
    setEditDueDate(todo.dueDate || "");
    setEditing(true);
  };

  const saveEdit = () => {
    if (editText.trim() === "") return;
    onUpdate(todo.id, {
      text: editText.trim(),
      priority: editPriority,
      dueDate: editDueDate || null,
    });
    setEditing(false);
  };

  const cancelEdit = () => {
    setEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") saveEdit();
    else if (e.key === "Escape") cancelEdit();
  };

  const dueStatus = getDueStatus(todo.dueDate);

  return (
    <li className="group flex items-center gap-3 p-4 hover:bg-indigo-50/50 transition-colors duration-200">
      <button
        onClick={() => onToggle(todo.id)}
        className="flex-shrink-0 transition-colors duration-200"
      >
        {todo.completed ? (
          <CheckCircle size={24} className="text-green-500" />
        ) : (
          <Circle size={24} className="text-gray-300 hover:text-sky-400" />
        )}
      </button>

      <div className={`w-2 h-2 rounded-full ${priorityConfig[todo.priority].dot}`} />

      {editing ? (
        <div className="flex-1 flex flex-col gap-2">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            className="px-3 py-1 bg-indigo-50 border-2 border-indigo-200 rounded-lg text-gray-700 focus:outline-none focus:border-indigo-400 transition-all duration-200"
          />
          <input
            type="date"
            value={editDueDate}
            onChange={(e) => setEditDueDate(e.target.value)}
            className="px-3 py-1 bg-indigo-50 border-2 border-indigo-200 rounded-lg text-gray-700 text-sm focus:outline-none focus:border-indigo-400 transition-all duration-200"
          />
          <div className="flex items-center gap-3">
            {PRIORITIES.map((p) => (
              <button
                key={p}
                onClick={() => setEditPriority(p)}
                className={`flex flex-1 items-center justify-center gap-3 border-2 text-gray-700 text-sm font-semibold rounded-lg py-2 px-4 transition-all duration-200 active:scale-95 ${
                  p === editPriority
                    ? priorityConfig[p].color
                    : "bg-indigo-50 text-gray-400 border-gray-200 hover:border-gray-300 hover:text-gray-600"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${p !== editPriority ? priorityConfig[p].dot : "bg-white/70"}`}
                />
                {priorityConfig[p].label}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center gap-2 min-w-0">
          <span
            className={`flex-1 text-gray-700 transition-all duration-200 truncate ${
              todo.completed ? "line-through text-gray-400" : ""
            }`}
          >
            {todo.text}
          </span>
          {todo.dueDate && !todo.completed && dueStatus && (
            <span
              className={`shrink-0 text-xs px-2 py-0.5 rounded-full border ${dueStatusConfig[dueStatus].bgColor} ${dueStatusConfig[dueStatus].textColor} ${dueStatusConfig[dueStatus].borderColor}`}
            >
              {formatDueDate(todo.dueDate)}
            </span>
          )}
          {todo.dueDate && todo.completed && (
            <span className="shrink-0 text-xs px-2 py-0.5 rounded-full bg-gray-50 text-gray-400 border border-gray-100">
              {formatDueDate(todo.dueDate)}
            </span>
          )}
        </div>
      )}

      {editing ? (
        <div className="flex gap-1">
          <button
            onClick={saveEdit}
            className="p-2 text-green-500 hover:bg-green-50 rounded-lg transition-all duration-200"
          >
            <Check size={18} />
          </button>
          <button
            onClick={cancelEdit}
            className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition-all duration-200"
          >
            <X size={18} />
          </button>
        </div>
      ) : (
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200">
          <button
            onClick={startEdit}
            className="p-2 text-gray-300 hover:text-indigo-500 hover:bg-indigo-50 rounded-lg transition-all duration-200"
          >
            <Pencil size={18} />
          </button>
          <button
            onClick={() => onDelete(todo.id)}
            className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
          >
            <Trash2 size={18} />
          </button>
        </div>
      )}
    </li>
  );
}
