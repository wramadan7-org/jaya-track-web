import type { ProductStatus } from "@/routes/product/types";
import type {
  StockMovementReferenceType,
  StockMovementType,
} from "@/routes/stock-movement/type";

export const referenceTypeLabel: Record<StockMovementReferenceType, string> = {
  PURCHASE_ORDER: "Pesanan Pembelian",
  STOCK_ADJUSTMENT: "Penyesuaian Stok",
  INVOICE: "Faktur Penjualan",
};

const statusProductLabel: Record<ProductStatus, string> = {
  "In Stock": "Tersedia",
  "Low Stock": "Stok Menipis",
  "Out of Stock": "Habis",
};

export const stockMovementTypeLabel: Record<StockMovementType, string> = {
  IN: "Stok Masuk",
  OUT: "Stok Keluar",
};

export const changeWordingReferenceType = (
  referenceType: StockMovementReferenceType
) => {
  return referenceTypeLabel[referenceType] ?? "-";
};

export const changeWordingStatusProduct = (status: ProductStatus) => {
  return statusProductLabel[status] ?? "-";
};

export const changeWordingStockMovementType = (type: StockMovementType) => {
  return stockMovementTypeLabel[type] ?? "-";
};
