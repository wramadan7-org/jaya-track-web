import type { Product } from "../types";
import { ProductRow } from "./ProductRow";

export function ProductTable({ products }: { products: Product[] }) {
  return (
    <div className="bg-white rounded-xl border overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-50 text-xs uppercase">
          <tr className="bg-gray-50/50 border-b border-gray-100">
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Produk Info
            </th>
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Kategori
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
            products.map((p) => <ProductRow key={p.id} product={p} />)
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
