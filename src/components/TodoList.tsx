import { Search, ClipboardList } from "lucide-react";
import type { Todo } from "../types";
import { getDueStatus } from "../constants";
import { TodoItem } from "./TodoItem";

interface TodoListProps {
  todos: Todo[];
  searchQuery: string;
  onToggle: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Pick<Todo, "text" | "priority" | "dueDate">>) => void;
  onDelete: (id: string) => void;
}

export function TodoList({
  todos,
  searchQuery,
  onToggle,
  onUpdate,
  onDelete,
}: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-12 text-center">
          <div className="mb-4">
            {searchQuery.trim() ? (
              <Search size={64} className="mx-auto text-indigo-200" />
            ) : (
              <ClipboardList size={64} className="mx-auto text-indigo-200" />
            )}
          </div>
          {searchQuery.trim() ? (
            <>
              <p className="text-gray-400 text-lg mb-2">未找到匹配任务</p>
              <p className="text-gray-300 text-sm">试试换个关键词搜索吧</p>
            </>
          ) : (
            <>
              <p className="text-gray-400 text-lg mb-2">暂无任务</p>
              <p className="text-gray-300 text-sm">
                在上方输入框添加你的第一个任务吧~
              </p>
            </>
          )}
        </div>
      </div>
    );
  }

  const sorted = [...todos].sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1;
    const dueOrder = { overdue: 0, today: 1, upcoming: 2, none: 3 };
    const aDue = getDueStatus(a.dueDate) || "none";
    const bDue = getDueStatus(b.dueDate) || "none";
    if (dueOrder[aDue] !== dueOrder[bDue]) return dueOrder[aDue] - dueOrder[bDue];
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <ul className="divide-y divide-gray-100">
        {sorted.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </div>
  );
}
