import { Plus, ArrowUpRight, ArrowDownLeft, FileText } from "lucide-react";
export function QuickActions() {
  const actions = [
    {
      label: "Stok Masuk",
      icon: ArrowDownLeft,
      color: "bg-green-50 text-green-600 hover:bg-green-100",
    },
    {
      label: "Stok Keluar",
      icon: ArrowUpRight,
      color: "bg-red-50 text-red-600 hover:bg-red-100",
    },
    {
      label: "Tambah Produk",
      icon: Plus,
      color: "bg-blue-50 text-blue-600 hover:bg-blue-100",
    },
    {
      label: "Laporan",
      icon: FileText,
      color: "bg-purple-50 text-purple-600 hover:bg-purple-100",
    },
  ];
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Aksi Cepat</h3>
      <div className="grid grid-cols-2 gap-4">
        {actions.map((action) => (
          <button
            key={action.label}
            className={`flex flex-col items-center justify-center p-4 rounded-lg transition-colors cursor-pointer ${action.color}`}
          >
            <action.icon className="w-6 h-6 mb-2" />
            <span className="text-sm font-medium">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
