import { Search, XCircle } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (v: string) => void;
  resultCount: number;
}

export function SearchBar({ value, onChange, resultCount }: SearchBarProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 mb-6">
      <div className="relative">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="搜索任务..."
          className="w-full pl-10 pr-10 py-3 bg-indigo-50 border-2 border-indigo-100 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:border-indigo-300 focus:bg-white transition-all duration-200"
        />
        {value && (
          <button
            onClick={() => onChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <XCircle size={18} />
          </button>
        )}
      </div>
      {value.trim() && (
        <p className="text-gray-400 text-sm mt-2 ml-1">
          找到 {resultCount} 条匹配任务
        </p>
      )}
    </div>
  );
}
