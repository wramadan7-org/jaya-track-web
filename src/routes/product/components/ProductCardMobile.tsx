import { changeWordingStatusProduct } from "@/utils/wording";
import type { Product } from "../types";

type Props = {
  product: Product;
};

export default function ProductCardMobile({ product }: Props) {
  return (
    <div
      key={`card-product-${product.id}`}
      className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <h3 className="font-semibold text-gray-900 text-base">
          {product.name}
        </h3>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium text-nowrap ${
            product.status === "In Stock"
              ? "bg-green-100 text-green-700"
              : product.status === "Low Stock"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {changeWordingStatusProduct(product.status)}
        </span>
      </div>
      {/* Content */}
      <div className="mt-4 grid grid-cols-2 gap-y-3 text-sm">
        <span className="text-gray-500">Stok</span>
        <span className="font-semibold text-gray-900">
          {product.stock} losin
        </span>
        <span className="text-gray-500">Isi / Sak</span>
        <span className="text-gray-700">{product.fillPerSack} losin</span>
        <span className="text-gray-500">Harga Modal</span>
        <span className="text-gray-700">
          Rp {product.basePrice.toLocaleString("id-ID")}
        </span>
        <span className="text-gray-500">Harga Jual</span>
        <span className="font-semibold text-gray-900">
          Rp {product.sellPrice.toLocaleString("id-ID")}
        </span>
      </div>
      {/* Action */}
      <div className="mt-4 flex justify-end gap-2">
        <button className="px-3 py-1.5 text-sm text-gray-600 border rounded-lg hover:bg-gray-50">
          Detail
        </button>
        <button className="px-3 py-1.5 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700">
          Edit
        </button>
      </div>
    </div>
  );
}
