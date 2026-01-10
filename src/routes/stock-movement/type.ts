export type StockMovementType = "IN" | "OUT";

export type StockMovementReferenceType =
  | "INVOICE"
  | "PURCHASE_ORDER"
  | "STOCK_ADJUSTMENT";

export type Stock = {
  id: string;
  productId: string;
  referenceId: string | null;
  product: string;
  type: StockMovementType;
  qty: number;
  referenceType: StockMovementReferenceType;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateStockMovement = Omit<Stock, "id" | "createdAt" | "updatedAt">;
export type UpdateStockMovement = Omit<Stock, "id" | "createdAt">;

export type StockMovementState = {
  stockMovements: Stock[];
  selectedId: string;
  selectId: (id?: string) => void;
  addStockMovement: (stockMovement: CreateStockMovement) => void;
  updateStockMovement: (
    id: string,
    payload: Partial<UpdateStockMovement>
  ) => void;
  removeStockMovement: (id: string) => void;
};

export type CreateUpdateModalStockMovementState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};
