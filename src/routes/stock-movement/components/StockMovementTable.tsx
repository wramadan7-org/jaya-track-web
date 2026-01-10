import type { Stock } from "../type";
import StockMovementRow from "./StockMovementRow";
import { useState } from "react";
import StockMovementCardMobile from "./StockMovementCardMobile";

export default function StockMovementTable({
  stockMovements,
}: {
  stockMovements: Stock[];
}) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  return (
    <div className="bg-transparent md:bg-white rounded-xl md:shadow-sm md:border border-gray-100 overflow-hidden">
      {openMenuId && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setOpenMenuId(null)}
        />
      )}
      {/** Dekstop */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Waktu
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Nama Produk
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Tipe
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Jumlah
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Tipe Referensi
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {stockMovements.map((movement, index) => (
              <StockMovementRow
                key={`wrap-row-sock-movement-${movement.id}`}
                stockMovement={movement}
                index={index}
                isOpen={openMenuId === movement.id}
                onToggle={() =>
                  setOpenMenuId((prev) =>
                    prev === movement.id ? null : movement.id
                  )
                }
                onClose={() => setOpenMenuId(null)}
              />
            ))}
          </tbody>
        </table>
      </div>
      {/** Mobile */}
      <div className="md:hidden space-y-3">
        {stockMovements.map((movement) => (
          <StockMovementCardMobile
            key={`wrap-card-stock-movement-${movement.id}`}
            stockMovement={movement}
          />
        ))}
      </div>
    </div>
  );
}
