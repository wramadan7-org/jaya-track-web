import { create } from "zustand";
import type { Product, ProductState } from "../types";
import { mockProducts } from "../data/mockProducts";
import { calculateProductStatus } from "@/utils/product";

export const useProductStore = create<ProductState>((set) => ({
  products: mockProducts,
  selectedId: "",
  selectId: (id) =>
    set(() => ({
      selectedId: id ? id : "",
    })),
  addProduct: (product) =>
    set((state) => {
      const payload: Product = {
        id: crypto.randomUUID(),
        ...product,
        stock: 0,
        status: calculateProductStatus(0, product.minStock),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      return {
        products: [...state.products, payload],
      };
    }),
  updateProduct: (id, payload) =>
    set((state) => ({
      products: state.products.map((product) =>
        product.id === id
          ? { ...product, ...{ ...payload, updatedAt: new Date() } }
          : product
      ),
    })),
  removeProduct: (id) =>
    set((state) => ({
      products: state.products.filter((product) => product.id !== id),
    })),
}));
