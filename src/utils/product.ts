import type { ProductStatus } from "@/routes/product/types";

export function calculateProductStatus(
  stock: number,
  minStock: number
): ProductStatus {
  if (stock <= 0) return "Out of Stock";
  if (stock < minStock) return "Low Stock";
  return "In Stock";
}
