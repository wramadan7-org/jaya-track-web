export const STOCK_MOVEMENT_TYPE = {
  id: {
    IN: "Stok Masuk",
    OUT: "Stok Keluar",
  },
  en: {
    IN: "Stock In",
    OUT: "Stock Out",
  },
} as const;

export const STOCK_MOVEMENT_REFERENCE_TYPE = {
  id: {
    INVOICE: "Faktur Penjualan",
    PURCHASE_ORDER: "Pesanan Pembelian",
    STOCK_ADJUSTMENT: "Penyesuaian Stok",
  },
  en: {
    INVOICE: "Invoice",
    PURCHASE_ORDER: "Purchase Order",
    STOCK_ADJUSTMENT: "Stock Adjustment",
  },
} as const;
