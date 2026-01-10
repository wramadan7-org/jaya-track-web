import { Search, Filter } from "lucide-react";
import type { ProductStatus } from "../types";

interface Props {
  search: string;
  status: ProductStatus | "";
  onSearch: (v: string) => void;
  onStatusChange: (v: ProductStatus | "") => void;
}

export function ProductFilters({
  search,
  status,
  onSearch,
  onStatusChange,
}: Props) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-center">
      <div className="relative w-full sm:w-96">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Cari produk berdasarkan nama..."
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400 text-gray-600 text-ellipsis"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <select
          className="px-4 py-2 border border-gray-200 rounded-lg bg-white text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer"
          onChange={(e) => onStatusChange(e.target.value as ProductStatus | "")}
          value={status}
        >
          <option value="">Semua Status</option>
          <option value="In Stock">Tersedia</option>
          <option value="Low Stock">Stok Menipis</option>
          <option value="Out of Stock">Habis</option>
        </select>
        <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600">
          <Filter className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
