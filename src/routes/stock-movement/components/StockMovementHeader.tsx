import { Download, Plus } from "lucide-react";
import { useModalCreateUpdateStockMovementStore } from "../store/stock-movement.moda.store";

export default function StockMovementHeader() {
  const { onOpen } = useModalCreateUpdateStockMovementStore();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Riwayat Pergerakan Stok
        </h1>
        <p className="text-gray-500 mt-1">
          Pantau riwayat stok dan catatan transaksi barang
        </p>
      </div>
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 px-4 py-2 bg-green-600 rounded-lg text-white hover:bg-green-700 transition-all shadow-sm cursor-pointer">
          <Download className="w-4 h-4" />
          <span>Expor Riwayat</span>
        </button>
        <button
          onClick={onOpen}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-sm shadow-blue-600/20 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Pergerakan</span>
        </button>
      </div>
    </div>
  );
}
