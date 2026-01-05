import { useState } from "react";
import type { Product } from "../types";
import { ProductRow } from "./ProductRow";

export function ProductTable({ products }: { products: Product[] }) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  return (
    <div className="bg-white rounded-xl border overflow-x-auto">
      {openMenuId && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setOpenMenuId(null)}
        />
      )}
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-50 text-xs uppercase">
          <tr className="bg-gray-50/50 border-b border-gray-100">
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Produk Info
            </th>
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Stok (Losin)
            </th>
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Isi/Sak
            </th>
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Harga Dasar
            </th>
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Harga Jual
            </th>
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody>
          {products?.length > 0 ? (
            products.map((p, i) => (
              <ProductRow
                key={p.id}
                index={i}
                product={p}
                isOpen={openMenuId === p.id}
                onToggle={() =>
                  setOpenMenuId((prev) => (prev === p.id ? null : p.id))
                }
                onClose={() => setOpenMenuId(null)}
              />
            ))
          ) : (
            <tr>
              <td colSpan={8} className="px-6 py-4 text-center text-gray-500">
                Tidak ada produk yang ditemukan
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
