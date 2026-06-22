import type { Priority } from "./types";

export const PRIORITIES: Priority[] = ["high", "medium", "low"];

export const priorityConfig: Record<
  Priority,
  { label: string; color: string; dot: string }
> = {
  high: {
    label: "高优先",
    color: "bg-red-500 text-white border-red-500 shadow-md shadow-red-200",
    dot: "bg-red-500",
  },
  medium: {
    label: "中优先",
    color: "bg-amber-400 text-white border-amber-400 shadow-md shadow-amber-200",
    dot: "bg-amber-500",
  },
  low: {
    label: "低优先",
    color: "bg-green-500 text-white border-green-500 shadow-md shadow-green-200",
    dot: "bg-green-500",
  },
};

export const dueStatusConfig = {
  overdue: {
    label: "已逾期",
    textColor: "text-red-500",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
  },
  today: {
    label: "今天到期",
    textColor: "text-amber-600",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
  },
  upcoming: {
    label: "",
    textColor: "text-gray-400",
    bgColor: "",
    borderColor: "",
  },
};

/** 返回截止日期的状态 */
export function getDueStatus(
  dueDate: string | null,
): "overdue" | "today" | "upcoming" | null {
  if (!dueDate) return null;
  const today = new Date().toISOString().slice(0, 10);
  if (dueDate < today) return "overdue";
  if (dueDate === today) return "today";
  return "upcoming";
}

export function formatDueDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const weekDays = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
  return `${month}月${day}日 ${weekDays[d.getDay()]}`;
}
