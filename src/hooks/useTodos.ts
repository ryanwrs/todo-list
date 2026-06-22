import { useState, useEffect, useCallback } from "react";
import type { Todo, Priority } from "../types";

function loadTodos(): Todo[] {
  try {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function saveTodos(todos: Todo[]): void {
  try {
    localStorage.setItem("todos", JSON.stringify(todos));
  } catch {
    // localStorage 满或不可用，静默忽略
  }
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(loadTodos);

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  const addTodo = useCallback(
    (text: string, priority: Priority, dueDate: string | null) => {
      const newTodo: Todo = {
        id: crypto.randomUUID(),
        text: text.trim(),
        completed: false,
        priority,
        createdAt: Date.now(),
        dueDate,
      };
      setTodos((prev) => [newTodo, ...prev]);
    },
    [],
  );

  const toggleTodo = useCallback((id: string) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  }, []);

  const updateTodo = useCallback(
    (id: string, updates: Partial<Pick<Todo, "text" | "priority" | "dueDate">>) => {
      setTodos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, ...updates } : t)),
      );
    },
    [],
  );

  const deleteTodo = useCallback((id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const clearCompleted = useCallback(() => {
    setTodos((prev) => prev.filter((t) => !t.completed));
  }, []);

  const clearAll = useCallback(() => {
    setTodos([]);
  }, []);

  return {
    todos,
    addTodo,
    toggleTodo,
    updateTodo,
    deleteTodo,
    clearCompleted,
    clearAll,
  };
}
