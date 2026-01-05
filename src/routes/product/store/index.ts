import { create } from "zustand";
import type { ProductState } from "../types";
import { mockProducts } from "../data/mockProducts";

export const useProductStore = create<ProductState>((set) => ({
  products: mockProducts,
  selectedId: "",
  selectId: (id) =>
    set(() => ({
      selectedId: id ? id : "",
    })),
  addProduct: (product) =>
    set((state) => ({
      products: [...state.products, product],
    })),
  updateProduct: (id, payload) =>
    set((state) => ({
      products: state.products.map((product) =>
        product.id === id ? { ...product, ...payload } : product
      ),
    })),
  removeProduct: (id) =>
    set((state) => ({
      products: state.products.filter((product) => product.id !== id),
    })),
}));
