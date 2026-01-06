export type ProductStatus = "In Stock" | "Low Stock" | "Out of Stock";

export type Product = {
  id: string;
  name: string;
  stock: number;
  fillPerSack: number;
  minStock: number;
  basePrice: number;
  sellPrice: number;
  status: ProductStatus;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateProductPayload = Omit<
  Product,
  "id" | "stock" | "status" | "createdAt" | "updatedAt"
>;

export type UpdateProductPayload = Omit<
  Product,
  "id" | "stock" | "status" | "createdAt"
>;

export type ProductState = {
  products: Product[];
  selectedId: string;
  selectId: (id?: string) => void;
  addProduct: (product: CreateProductPayload) => void;
  updateProduct: (id: string, payload: Partial<UpdateProductPayload>) => void;
  removeProduct: (id: string) => void;
};

export type CreateUpdateModalProductState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};
