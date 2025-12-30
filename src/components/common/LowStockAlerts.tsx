import { AlertTriangle, ArrowRight } from "lucide-react";

interface LowStockItem {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  threshold: number;
}

const mockLowStock: LowStockItem[] = [
  {
    id: "1",
    name: "Serok Besar",
    sku: "KCW-002",
    quantity: 8,
    threshold: 15,
  },
  {
    id: "2",
    name: "Cikrak Blek",
    sku: "CLN-002",
    quantity: 5,
    threshold: 8,
  },
  {
    id: "3",
    name: "Japit Daun",
    sku: "KCW-006",
    quantity: 10,
    threshold: 8,
  },
];

export function LowStockAlerts() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-500" />
          Peringatan Serok Menipis
        </h3>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 cursor-pointer">
          Lihat Semua <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-3">
        {mockLowStock.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-3 bg-amber-50 rounded-lg border border-amber-100"
          >
            <div>
              <p className="font-medium text-gray-900">{item.name}</p>
              <p className="text-xs text-gray-500">SKU: {item.sku}</p>
            </div>
            <div className="text-right">
              <span className="block text-lg font-bold text-amber-700">
                {item.quantity}
              </span>
              <span className="text-xs text-amber-600">
                Min: {item.threshold}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
