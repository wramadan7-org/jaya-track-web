import { MoreVertical, CheckCircle2, AlertCircle } from "lucide-react";
import type { Product } from "../types";

export function ProductRow({ product }: { product: Product }) {
  let statusLabel = "Habis";
  if (product.status === "In Stock") statusLabel = "Tersedia";
  if (product.status === "Low Stock") statusLabel = "Stok Menipis";

  return (
    <tr className="hover:bg-gray-50/50 transition-colors group">
      {/* Produk */}
      <td className="px-6 py-4">
        <div className="flex flex-col">
          <span className="font-medium text-gray-900">{product.name}</span>
          <span className="text-xs text-gray-500">SKU: {product.sku}</span>
        </div>
      </td>
      {/* Kategori */}
      <td className="px-6 py-4">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          {product.category}
        </span>
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
        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
          <MoreVertical className="w-4 h-4" />
        </button>
      </td>
    </tr>
  );
}
