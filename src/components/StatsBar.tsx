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
         <button className={`bg-white rounded-xl shadow p-4 text-center ${status === 'all' ? 'bg-indigo-400 opacity-90' : ''}` } onClick={()=>statusFilter('all')}>
          <div className="text-2xl font-bold text-indigo-500">
            {totalCount}
          </div>
          <div className="text-gray-500 text-sm">全部</div>
        </button>
        <button className={`bg-white rounded-xl shadow p-4 text-center ${status === 'upcoming' ? 'bg-indigo-400 opacity-90' : ''}` } onClick={()=>statusFilter('upcoming')}>
          <div className="text-2xl font-bold text-sky-600">
            {uncompletedCount}
          </div>
          <div className="text-gray-500 text-sm">待完成</div>
        </button>
        <button className={`bg-white rounded-xl shadow p-4 text-center ${status === 'done' ? 'bg-indigo-400 opacity-90' : ''}` }  onClick={()=>statusFilter('done')}>
          <div className="text-2xl font-bold text-green-500">
            {completedCount}
          </div>
          <div className="text-gray-500 text-sm">已完成</div>
        </button>
        <button className={`bg-white rounded-xl shadow p-4 text-center ${status === 'overdue' ? 'bg-indigo-400 opacity-90' : ''}` } onClick={()=>statusFilter('overdue')}>
          <div
            className={`text-2xl font-bold ${overdueCount > 0 ? "text-red-500" : "text-gray-400"}`}
          >
            {overdueCount}
          </div>
          <div className="text-gray-500 text-sm">已逾期</div>
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
