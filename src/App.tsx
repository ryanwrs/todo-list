import { useState, useMemo } from "react";
import { useTodos } from "./hooks/useTodos";
import { useEscapeKey } from "./hooks/useEscapeKey";
import { getDueStatus } from "./constants";
import { Header } from "./components/Header";
import { TodoInput } from "./components/TodoInput";
import { SearchBar } from "./components/SearchBar";
import { StatsBar } from "./components/StatsBar";
import { TodoList } from "./components/TodoList";
import { ConfirmModal } from "./components/ConfirmModal";

function App() {
  const {
    todos,
    addTodo,
    toggleTodo,
    updateTodo,
    deleteTodo,
    clearCompleted,
    clearAll,
  } = useTodos();

  const [searchQuery, setSearchQuery] = useState("");
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEscapeKey(showClearConfirm, () => setShowClearConfirm(false));
  useEscapeKey(deletingId !== null, () => setDeletingId(null));

  const filteredTodos = useMemo(() => {
    if (!searchQuery.trim()) return todos;
    const q = searchQuery.trim().toLowerCase();
    return todos.filter((t) => t.text.toLowerCase().includes(q));
  }, [todos, searchQuery]);

  const completedCount = todos.filter((t) => t.completed).length;
  const uncompletedCount = todos.length - completedCount;
  const overdueCount = todos.filter(
    (t) => !t.completed && getDueStatus(t.dueDate) === "overdue",
  ).length;

  const handleDeleteConfirm = () => {
    if (deletingId !== null) {
      deleteTodo(deletingId);
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-indigo-50 to-purple-100 py-8 px-4">
      <div className="max-w-lg mx-auto">
        <Header />
        <TodoInput onAdd={addTodo} />
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          resultCount={filteredTodos.length}
        />
        <StatsBar
          uncompletedCount={uncompletedCount}
          completedCount={completedCount}
          overdueCount={overdueCount}
          totalCount={todos.length}
          onClearCompleted={clearCompleted}
          onClearAll={() => setShowClearConfirm(true)}
        />
        <TodoList
          todos={filteredTodos}
          searchQuery={searchQuery}
          onToggle={toggleTodo}
          onUpdate={updateTodo}
          onDelete={setDeletingId}
        />

        <ConfirmModal
          visible={showClearConfirm}
          title="确认清空"
          message="确定要清空所有任务吗？此操作无法撤销。"
          onConfirm={() => {
            clearAll();
            setShowClearConfirm(false);
          }}
          onCancel={() => setShowClearConfirm(false)}
        />

        <ConfirmModal
          visible={deletingId !== null}
          title="确认删除"
          message="确定要删除任务吗？此操作无法撤销。"
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeletingId(null)}
        />

        <p className="text-center text-gray-400 text-sm mt-6">
          数据已保存至本地存储
        </p>
      </div>
    </div>
  );
}

export default App;
