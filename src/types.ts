export type Priority = "high" | "medium" | "low";

export type Status = "overdue" | "done" | "upcoming" | "all";

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  priority: Priority;
  createdAt: number;
  dueDate: string | null;
}
