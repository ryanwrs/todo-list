import { useState, useEffect } from 'react';
import { Plus, Trash2, CheckCircle, Circle, ClipboardList, Pencil, X, Check, AlertCircle, Search, XCircle } from 'lucide-react';

type Priority = 'high' | 'medium' | 'low';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  priority: Priority;
  createdAt: number;
}

const priorityConfig = {
  high: { label: '高优先', color: 'bg-red-500 text-white border-red-500 shadow-md shadow-red-200', dot: 'bg-red-500' },
  medium: { label: '中优先', color: 'bg-amber-400 text-white border-amber-400 shadow-md shadow-amber-200', dot: 'bg-amber-500' },
  low: { label: '低优先', color: 'bg-green-500 text-white border-green-500 shadow-md shadow-green-200', dot: 'bg-green-500' },
};

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });
  const [inputValue, setInputValue] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (inputValue.trim() === '') return;
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text: inputValue.trim(),
      completed: false,
      priority,
      createdAt: Date.now(),
    };
    setTodos([newTodo, ...todos]);
    setInputValue('');
    setPriority('medium');
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const clearAll = () => {
    setTodos([]);
    setShowClearConfirm(false);
  };

  const startEdit = (todo: Todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const saveEdit = () => {
    if (editText.trim() === '' || editingId === null) return;
    setTodos(
      todos.map((todo) =>
        todo.id === editingId ? { ...todo, text: editText.trim() } : todo
      )
    );
    setEditingId(null);
    setEditText('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  const handleEditKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      saveEdit();
    } else if (e.key === 'Escape') {
      cancelEdit();
    }
  };

  const completedCount = todos.filter((t) => t.completed).length;
  const uncompletedCount = todos.filter((t) => !t.completed).length;
  const totalCount = todos.length;

  const filteredTodos = searchQuery.trim()
    ? todos.filter((t) => t.text.toLowerCase().includes(searchQuery.trim().toLowerCase()))
    : todos;

  const sortedTodos = [...filteredTodos].sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1;
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-indigo-50 to-purple-100 py-8 px-4">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <ClipboardList size={36} className="text-indigo-500" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-sky-600 to-purple-600 bg-clip-text text-transparent">
              我的待办清单
            </h1>
          </div>
          <p className="text-indigo-400">记录你的每一天</p>
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-2xl shadow-lg p-4 mb-6">
          <div className="flex flex-col gap-3">
            <div className="flex gap-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="今天要做什么？"
                className="flex-1 px-4 py-3 bg-indigo-50 border-2 border-indigo-100 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:border-indigo-300 focus:bg-white transition-all duration-200"
              />
              <button
                onClick={addTodo}
                className="px-5 py-3 bg-gradient-to-r from-sky-500 to-purple-500 text-white rounded-xl font-medium hover:from-sky-600 hover:to-purple-600 active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2"
              >
                <Plus size={20} />
                <span className="hidden sm:inline">添加任务</span>
              </button>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500 shrink-0">优先级:</span>
              {(['high', 'medium', 'low'] as Priority[]).map((p) => (
                <button
                  key={p}
                  onClick={() => setPriority(p)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold border-2 transition-all duration-200 active:scale-95 ${
                    priority === p
                      ? priorityConfig[p].color
                      : 'bg-white text-gray-400 border-gray-200 hover:border-gray-300 hover:text-gray-600'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${priority === p ? 'bg-white/70' : priorityConfig[p].dot}`} />
                  {priorityConfig[p].label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white rounded-2xl shadow-lg p-4 mb-6">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索任务..."
              className="w-full pl-10 pr-10 py-3 bg-indigo-50 border-2 border-indigo-100 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:border-indigo-300 focus:bg-white transition-all duration-200"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <XCircle size={18} />
              </button>
            )}
          </div>
          {searchQuery.trim() && (
            <p className="text-gray-400 text-sm mt-2 ml-1">
              找到 {sortedTodos.length} 条匹配任务
            </p>
          )}
        </div>

        {/* Stats */}
        <div className="flex gap-4 mb-6 items-stretch">
          <div className="flex-1 grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl shadow p-4 text-center">
              <div className="text-2xl font-bold text-sky-600">{uncompletedCount}</div>
              <div className="text-gray-500 text-sm">待完成</div>
            </div>
            <div className="bg-white rounded-xl shadow p-4 text-center">
              <div className="text-2xl font-bold text-green-500">{completedCount}</div>
              <div className="text-gray-500 text-sm">已完成</div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            {completedCount > 0 && (
              <button
                onClick={clearCompleted}
                className="px-4 py-2 bg-white rounded-xl shadow text-gray-500 hover:text-red-500 hover:bg-red-50 transition-all duration-200 text-sm whitespace-nowrap"
              >
                清空已完成
              </button>
            )}
            {totalCount > 0 && (
              <button
                onClick={() => setShowClearConfirm(true)}
                className="px-4 py-2 bg-white rounded-xl shadow text-gray-500 hover:text-red-500 hover:bg-red-50 transition-all duration-200 text-sm whitespace-nowrap"
              >
                全部清空
              </button>
            )}
          </div>
        </div>

        {/* Clear Confirmation Modal */}
        {showClearConfirm && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full">
              <div className="flex items-center gap-3 text-amber-500 mb-4">
                <AlertCircle size={24} />
                <h3 className="text-lg font-semibold text-gray-800">确认清空</h3>
              </div>
              <p className="text-gray-600 mb-6">确定要清空所有任务吗？此操作无法撤销。</p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="px-4 py-2 rounded-xl text-gray-500 hover:bg-gray-100 transition-all duration-200"
                >
                  取消
                </button>
                <button
                  onClick={clearAll}
                  className="px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition-all duration-200"
                >
                  确认清空
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Todo List */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {filteredTodos.length === 0 ? (
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
                  <p className="text-gray-300 text-sm">在上方输入框添加你的第一个任务吧~</p>
                </>
              )}
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {sortedTodos.map((todo) => (
                <li
                  key={todo.id}
                  className="group flex items-center gap-3 p-4 hover:bg-indigo-50/50 transition-colors duration-200"
                >
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    className="flex-shrink-0 transition-colors duration-200"
                  >
                    {todo.completed ? (
                      <CheckCircle size={24} className="text-green-500" />
                    ) : (
                      <Circle size={24} className="text-gray-300 hover:text-sky-400" />
                    )}
                  </button>
                  <div className={`w-2 h-2 rounded-full ${priorityConfig[todo.priority].dot}`} />
                  {editingId === todo.id ? (
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onKeyDown={handleEditKeyDown}
                      autoFocus
                      className="flex-1 px-3 py-1 bg-indigo-50 border-2 border-indigo-200 rounded-lg text-gray-700 focus:outline-none focus:border-indigo-400 transition-all duration-200"
                    />
                  ) : (
                    <span
                      className={`flex-1 text-gray-700 transition-all duration-200 ${
                        todo.completed ? 'line-through text-gray-400' : ''
                      }`}
                    >
                      {todo.text}
                    </span>
                  )}
                  {editingId === todo.id ? (
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
                        onClick={() => startEdit(todo)}
                        className="p-2 text-gray-300 hover:text-indigo-500 hover:bg-indigo-50 rounded-lg transition-all duration-200"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => deleteTodo(todo.id)}
                        className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-gray-400 text-sm mt-6">
          数据已保存至本地存储
        </p>
      </div>
    </div>
  );
}

export default App;
