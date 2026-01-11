import Navbar from "@/components/layouts/navbar/Navbar";
import Sidebar from "@/components/layouts/sidebar/Sidebar";
import { Outlet } from "react-router";
import "@/components/layouts/layout.css";
import { useEffect } from "react";
import { useUIStore } from "@/app/stores/ui.store";

export default function RootLayout() {
  const closeSidebar = useUIStore((s) => s.closeSidebar);
  const sidebarMode = useUIStore((s) => s.sidebarMode);

  const isCollapsed = sidebarMode === "collapsed";

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");

    const handler = (e: MediaQueryListEvent) => {
      if (e.matches) {
        closeSidebar();
      }
    };

    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, [closeSidebar]);

  return (
    <div className="app-layout">
      <Sidebar />

      <div className={`app-main ${isCollapsed ? "lg:pl-20" : "lg:pl-64"}`}>
        <Navbar />

        <main className="app-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
