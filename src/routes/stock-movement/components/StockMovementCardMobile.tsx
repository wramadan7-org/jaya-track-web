import { changeWordingReferenceType } from "@/utils/wording";
import type { Stock } from "../type";
import { getDateTime } from "@/utils/date";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";

type Props = {
  stockMovement: Stock;
};

export default function StockMovementCardMobile({ stockMovement }: Props) {
  return (
    <div
      key={`card-stock-movement-${stockMovement.id}`}
      className="border rounded-xl p-4 shadow-sm bg-white flex flex-col"
    >
      <div className="flex flex-row items-center justify-between">
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium w-fit ${
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
          {stockMovement.type === "IN" ? "Stock In" : "Stock Out"}
        </span>
        <span className="text-sm text-gray-500">{`${
          getDateTime(stockMovement.createdAt).date
        } ${getDateTime(stockMovement.createdAt).time}`}</span>
      </div>
      <span className="font-semibold text-gray-900">
        {stockMovement.product}
      </span>
      <span className="text-sm text-gray-600 font-mono bg-gray-50 px-2 py-1 rounded w-fit">
        {changeWordingReferenceType(stockMovement.referenceType)}
      </span>
      <div className="mt-2 flex justify-between text-gray-600">
        <span>Jumlah</span>
        <span
          className={`text-sm font-bold ${
            stockMovement.type === "IN" ? "text-green-600" : "text-red-600"
          }`}
        >
          {stockMovement.type === "IN" ? "+" : "-"}
          {stockMovement.qty}
        </span>
      </div>
    </div>
  );
}
