import { create } from "zustand";
import type { CreateUpdateModalStockMovementState } from "../type";

export const useModalCreateUpdateStockMovementStore =
  create<CreateUpdateModalStockMovementState>((set) => ({
    isOpen: false,
    onOpen: () =>
      set(() => ({
        isOpen: true,
      })),
    onClose: () =>
      set(() => ({
        isOpen: false,
      })),
  }));
