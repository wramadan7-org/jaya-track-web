import {
  changeWordingReferenceType,
  changeWordingStockMovementType,
} from "@/utils/wording";
import type { Stock } from "../type";
import { getDateTime } from "@/utils/date";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Eye,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";
import { useModalCreateUpdateStockMovementStore } from "../store/stock-movement.moda.store";
import { useConfirmStore } from "@/app/stores/confirm.store";
import { useStockMovementStore } from "../store";

type Props = {
  stockMovement: Stock;
  index?: number;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
};

export default function StockMovementRow({
  stockMovement,
  index,
  onToggle,
  isOpen,
  onClose,
}: Props) {
  const { onOpen } = useModalCreateUpdateStockMovementStore();
  const { selectId, removeStockMovement } = useStockMovementStore();
  const confirm = useConfirmStore((s) => s.confirm);

  const handleMenuAction = async (type: "edit" | "delete") => {
    selectId(stockMovement.id);
    onClose();

    if (type === "edit") {
      onOpen();
    } else {
      const ok = await confirm({
        title: "Konfirmasi Penghapusan",
        message: `Pergerakan stok "${stockMovement.product}" akan dihapus secara permanen.`,
      });

      if (!ok) return;
      // use await if API already exists
      removeStockMovement(stockMovement.id);
    }
  };

  return (
    <tr
      key={`row-stock-movement-${stockMovement.id}`}
      className={`transition-colors group ${
        index && index % 2 === 1 && "bg-gray-300/80"
      }`}
    >
      <td className="px-6 py-4">
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-900">
            {getDateTime(stockMovement.createdAt).date}
          </span>
          <span className="text-xs text-gray-500">
            {getDateTime(stockMovement.createdAt).time}
          </span>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className="text-sm font-medium text-gray-900">
          {stockMovement.product}
        </span>
      </td>
      <td className="px-6 py-4">
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
            stockMovement.type === "IN"
              ? "bg-green-50 text-green-700 border border-green-100"
              : "bg-red-50 text-red-700 border border-red-100"
          }`}
        >
          {stockMovement.type === "IN" ? (
            <ArrowDownLeft className="w-3 h-3" />
          ) : (
            <ArrowUpRight className="w-3 h-3" />
          )}
          {changeWordingStockMovementType(stockMovement.type)}
        </span>
      </td>
      <td className="px-6 py-4">
        <span
          className={`text-sm font-bold ${
            stockMovement.type === "IN" ? "text-green-600" : "text-red-600"
          }`}
        >
          {stockMovement.type === "IN" ? "+" : "-"}
          {stockMovement.qty}
        </span>
      </td>
      <td className="px-6 py-4">
        <span className="text-sm text-gray-600 font-mono bg-gray-50 px-2 py-1 rounded">
          {changeWordingReferenceType(stockMovement.referenceType)}
        </span>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">
            -
          </div>
          <span className="text-sm text-gray-600">-</span>
        </div>
      </td>
      <td className="px-6 py-4 text-right">
        <button
          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors z-20 relative"
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
        >
          <MoreHorizontal className="w-4 h-4" />
        </button>
        {isOpen && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute right-0 mt-2 w-52 bg-white border rounded-lg shadow-lg z-50"
          >
            <button
              onClick={() => handleMenuAction("edit")}
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-sky-700 hover:bg-sky-50 cursor-pointer"
            >
              <Eye className="w-4 h-4" />
              Detail Pergerakan Stok
            </button>
            <button
              onClick={() => handleMenuAction("edit")}
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
            >
              <Pencil className="w-4 h-4" />
              Edit Pergerakan Stok
            </button>
            <button
              onClick={() => handleMenuAction("delete")}
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              Hapus Pergerakan Stok
            </button>
          </div>
        )}
      </td>
    </tr>
  );
}
