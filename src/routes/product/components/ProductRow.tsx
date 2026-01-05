import {
  MoreVertical,
  CheckCircle2,
  AlertCircle,
  Trash2,
  Pencil,
} from "lucide-react";
import type { Product } from "../types";
import { useModalCreateUpdateProductStore } from "../store/product.modal.store";
import { useProductStore } from "../store";
import { useConfirmStore } from "@/app/stores/confirm.store";

export function ProductRow({
  product,
  index,
  isOpen,
  onToggle,
  onClose,
}: {
  product: Product;
  index?: number;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}) {
  const { onOpen } = useModalCreateUpdateProductStore();
  const { selectId, removeProduct } = useProductStore();
  const confirm = useConfirmStore((s) => s.confirm);

  let statusLabel = "Habis";
  if (product.status === "In Stock") statusLabel = "Tersedia";
  if (product.status === "Low Stock") statusLabel = "Stok Menipis";

  const handleMenuAction = async (type: "edit" | "delete") => {
    selectId(product.id);
    onClose();

    if (type === "edit") {
      onOpen();
    } else {
      const ok = await confirm({
        title: "Konfirmasi Penghapusan",
        message: `Produk "${product.name}" akan dihapus secara permanen.`,
      });

      if (!ok) return;
      // use await if API already exists
      removeProduct(product.id);
    }
  };

  return (
    <tr
      className={`transition-colors group ${
        index && index % 2 === 1 && "bg-gray-300/80"
      }`}
    >
      {/* Produk */}
      <td className="px-6 py-4">
        <span className="font-medium text-gray-900">{product.name}</span>
      </td>
      {/* Stok */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${
                product.stock <= product.minStock
                  ? "bg-red-500"
                  : product.stock <= product.minStock * 2
                  ? "bg-yellow-500"
                  : "bg-green-500"
              }`}
              style={{
                width: `${Math.min((product.stock / 100) * 100, 100)}%`,
              }}
            />
          </div>
          <span className="text-sm text-gray-600 font-medium">
            {product.stock}
          </span>
        </div>
      </td>
      {/* Isi per sak */}
      <td className="px-6 py-4">
        <span className="text-sm text-gray-600">
          {product.fillPerSack} losin
        </span>
      </td>
      {/* Harga */}
      <td className="px-6 py-4">
        <span className="text-sm text-gray-600">
          Rp {product.basePrice.toLocaleString("id-ID")}
        </span>
      </td>
      <td className="px-6 py-4">
        <span className="text-sm text-gray-600">
          Rp {product.sellPrice.toLocaleString("id-ID")}
        </span>
      </td>
      {/* Status */}
      <td className="px-6 py-4 flex items-center gap-2">
        {product.status === "In Stock" && (
          <CheckCircle2 className="w-4 h-4 text-green-500" />
        )}
        {product.status !== "In Stock" && (
          <AlertCircle className="w-4 h-4 text-red-500" />
        )}
        <span
          className={`text-sm font-medium ${
            product.status === "In Stock"
              ? "text-green-700"
              : product.status === "Low Stock"
              ? "text-yellow-700"
              : "text-red-700"
          }`}
        >
          {statusLabel}
        </span>
      </td>
      {/* Action */}
      <td className="px-6 py-4 text-right">
        <button
          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors z-20 relative"
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
        >
          <MoreVertical className="w-4 h-4" />
        </button>
        {isOpen && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-50"
          >
            <button
              onClick={() => handleMenuAction("edit")}
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
            >
              <Pencil className="w-4 h-4" />
              Edit Produk
            </button>
            <button
              onClick={() => handleMenuAction("delete")}
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              Hapus Produk
            </button>
          </div>
        )}
      </td>
    </tr>
  );
}
