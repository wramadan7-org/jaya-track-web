export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  stock: number;
  fillPerSack: number;
  minStock: number;
  basePrice: number;
  sellPrice: number;
  status: "In Stock" | "Low Stock" | "Out of Stock";
}
