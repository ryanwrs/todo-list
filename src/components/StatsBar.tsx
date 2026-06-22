import type { Status } from "../types";

interface StatsBarProps {
  uncompletedCount: number;
  completedCount: number;
  overdueCount: number;
  totalCount: number;
  onClearCompleted: () => void;
  onClearAll: () => void;
  status: Status;
  statusFilter: (a: Status)=>void;
}

export function StatsBar({
  uncompletedCount,
  completedCount,
  overdueCount,
  totalCount,
  onClearCompleted,
  onClearAll,
  status,
  statusFilter
}: StatsBarProps) {
  return (
    <div className="flex gap-4 mb-6 items-stretch">
      <div className="flex-1 grid grid-cols-4 gap-4">
         <button
            onClick={() => statusFilter("all")}
            className={`rounded-xl shadow p-4 text-center transition-all duration-200 cursor-pointer ${
              status === "all"
                ? "ring-2 ring-indigo-400 shadow-md"
                : "bg-white hover:shadow-md hover:bg-indigo-50 hover:scale-[1.02]"
            }`}
          >
            <div className="text-2xl font-bold text-indigo-500">{totalCount}</div>
            <div
              className={`text-sm ${status === "all" ? "text-indigo-500" : "text-gray-500"}`}
            >
              全部
            </div>
          </button>
          <button
            onClick={() => statusFilter("upcoming")}
            className={`rounded-xl shadow p-4 text-center transition-all duration-200 cursor-pointer ${
              status === "upcoming"
                ? "ring-2 ring-indigo-400 shadow-md"
                : "bg-white hover:shadow-md hover:bg-indigo-50 hover:scale-[1.02]"
            }`}
          >
            <div className="text-2xl font-bold text-sky-600">{uncompletedCount}</div>
            <div
              className={`text-sm ${status === "upcoming" ? "text-sky-600" : "text-gray-500"}`}
            >
              待完成
            </div>
          </button>
          <button
            onClick={() => statusFilter("done")}
            className={`rounded-xl shadow p-4 text-center transition-all duration-200 cursor-pointer ${
              status === "done"
                ? "ring-2 ring-indigo-400 shadow-md"
                : "bg-white hover:shadow-md hover:bg-indigo-50 hover:scale-[1.02]"
            }`}
          >
            <div className="text-2xl font-bold text-green-500">{completedCount}</div>
            <div
              className={`text-sm ${status === "done" ? "text-green-500" : "text-gray-500"}`}
            >
              已完成
            </div>
          </button>
          <button
            onClick={() => statusFilter("overdue")}
            className={`rounded-xl shadow p-4 text-center transition-all duration-200 cursor-pointer ${
              status === "overdue"
                ? "ring-2 ring-indigo-400 shadow-md"
                : "bg-white hover:shadow-md hover:bg-indigo-50 hover:scale-[1.02]"
            }`}
          >
            <div
              className={`text-2xl font-bold ${overdueCount > 0 ? "text-red-500" : "text-gray-400"}`}
            >
              {overdueCount}
            </div>
            <div
              className={`text-sm ${status === "overdue" ? (overdueCount > 0 ? "text-red-500" : "text-gray-400") : "text-gray-500"}`}
            >
              已逾期
            </div>
          </button>
      </div>
      <div className="flex flex-col gap-2">
        {completedCount > 0 && (
          <button
            onClick={onClearCompleted}
            className="px-4 py-2 bg-white rounded-xl shadow text-gray-500 hover:text-red-500 hover:bg-red-50 transition-all duration-200 text-sm whitespace-nowrap"
          >
            清空已完成
          </button>
        )}
        {totalCount > 0 && (
          <button
            onClick={onClearAll}
            className="px-4 py-2 bg-white rounded-xl shadow text-gray-500 hover:text-red-500 hover:bg-red-50 transition-all duration-200 text-sm whitespace-nowrap"
          >
            全部清空
          </button>
        )}
      </div>
    </div>
  );
}
