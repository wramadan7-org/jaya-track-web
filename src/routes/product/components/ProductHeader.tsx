import { Plus, Download } from "lucide-react";
import { useModalCreateUpdateProductStore } from "../store/product.modal.store";

export function ProductHeader() {
  const { onOpen } = useModalCreateUpdateProductStore();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Produk</h1>
        <p className="text-gray-500 mt-1">
          Kelola katalog inventaris, tingkat stok, dan harga produk Anda.
        </p>
      </div>
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 px-4 py-2 bg-green-600 rounded-lg text-white hover:bg-green-700 hover:border-green-300 transition-all shadow-sm cursor-pointer">
          <Download className="w-4 h-4" />
          <span>Export</span>
        </button>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-sm shadow-blue-600/20 cursor-pointer"
          onClick={onOpen}
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Product</span>
        </button>
      </div>
    </div>
  );
}
