import { create } from "zustand";
import type { Stock, StockMovementState } from "../type";
import { mockStocks } from "../data/mockStocks";

export const useStockMovementStore = create<StockMovementState>((set) => ({
  stockMovements: mockStocks,
  selectedId: "",
  selectId: (id) =>
    set(() => ({
      selectedId: id ? id : "",
    })),
  addStockMovement: (stockMovement) =>
    set((state) => {
      const payload: Stock = {
        id: crypto.randomUUID(),
        ...stockMovement,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      return {
        stockMovements: [...state.stockMovements, payload],
      };
    }),
  updateStockMovement: (id, payload) =>
    set((state) => ({
      stockMovements: state.stockMovements.map((movement) =>
        movement.id === id
          ? { ...movement, ...{ ...payload, updatedAt: new Date() } }
          : movement
      ),
    })),
  removeStockMovement: (id) =>
    set((state) => ({
      stockMovements: state.stockMovements.filter(
        (stockMovement) => stockMovement.id !== id
      ),
    })),
}));
