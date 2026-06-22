import { ClipboardList } from "lucide-react";

export function Header() {
  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center gap-3 mb-2">
        <ClipboardList size={36} className="text-indigo-500" />
        <h1 className="text-3xl font-bold bg-gradient-to-r from-sky-600 to-purple-600 bg-clip-text text-transparent">
          我的待办清单
        </h1>
      </div>
      <p className="text-indigo-400">记录你的每一天</p>
    </div>
  );
}
