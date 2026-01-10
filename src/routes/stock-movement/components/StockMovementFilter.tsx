import { Filter, Search } from "lucide-react";
import type { StockMovementType } from "../type";

interface Props {
  search: string;
  filterType: "" | StockMovementType;
  onSearch: (value: string) => void;
  onFilterTypeChange: (type: "" | StockMovementType) => void;
}

export default function StockMovementFilter({
  search,
  filterType,
  onSearch,
  onFilterTypeChange,
}: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100 justify-between items-center">
      {/* Search */}
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Cari riwayat pergerakan stok..."
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400 text-gray-600 text-ellipsis"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      {/* Type Filter */}
      <div className="flex bg-white rounded-lg border border-gray-200 p-1">
        <button
          onClick={() => onFilterTypeChange("")}
          className={`flex-1 py-1.5 px-3 rounded-md text-sm font-medium transition-all cursor-pointer ${
            filterType === ""
              ? "bg-gray-100 text-gray-900 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Semua
        </button>
        <button
          onClick={() => onFilterTypeChange("IN")}
          className={`flex-1 py-1.5 px-3 rounded-md text-sm font-medium transition-all cursor-pointer ${
            filterType === "IN"
              ? "bg-green-50 text-green-700 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Stok Masuk
        </button>
        <button
          onClick={() => onFilterTypeChange("OUT")}
          className={`flex-1 py-1.5 px-3 rounded-md text-sm font-medium transition-all cursor-pointer ${
            filterType === "OUT"
              ? "bg-red-50 text-red-700 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Stok Keluar
        </button>
      </div>
      {/* More Filters */}
      <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-all cursor-pointer">
        <Filter className="w-4 h-4" />
        <span>Filter Lanjutan</span>
      </button>
    </div>
  );
}
