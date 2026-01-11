import { create } from "zustand";

type SidebarMode = "expanded" | "collapsed";

type UIState = {
  /** Sidebar (mobile / desktop) */
  sidebarOpen: boolean;
  sidebarMode: SidebarMode;

  /** Actions */
  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;
  toggleSidebarMode: () => void;
};

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: false,
  sidebarMode: "expanded",
  openSidebar: () => set({ sidebarOpen: true }),
  closeSidebar: () => set({ sidebarOpen: false }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  toggleSidebarMode: () =>
    set((s) => ({
      sidebarMode: s.sidebarMode === "expanded" ? "collapsed" : "expanded",
    })),
}));
