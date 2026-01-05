import { create } from "zustand";
import type { CreateUpdateModalProductState } from "../types";

export const useModalCreateUpdateProductStore =
  create<CreateUpdateModalProductState>((set) => ({
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
