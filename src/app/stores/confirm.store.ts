import { create } from "zustand";

type ConfirmOptions = {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "primary";
};

type Resolver = (value: boolean) => void;

type ConfirmState = {
  open: boolean;
  loading: boolean;
  options: ConfirmOptions | null;
  resolver: Resolver | null;

  confirm: (options: ConfirmOptions) => Promise<boolean>;
  resolve: (value: boolean) => void;
  close: () => void;
  setLoading: (value: boolean) => void;
};

export const useConfirmStore = create<ConfirmState>((set) => ({
  open: false,
  loading: false,
  options: null,
  resolver: null,

  confirm: (options) =>
    new Promise<boolean>((resolve) => {
      set({
        open: true,
        loading: false,
        options: {
          confirmText: "Ya",
          cancelText: "Batal",
          variant: "danger",
          ...options,
        },
        resolver: resolve,
      });
    }),

  resolve: (value) =>
    set((state) => {
      state.resolver?.(value);
      return {
        open: false,
        loading: false,
        options: null,
        resolver: null,
      };
    }),

  close: () =>
    set({
      open: false,
      loading: false,
      options: null,
      resolver: null,
    }),

  setLoading: (value) => set({ loading: value }),
}));
