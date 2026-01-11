import navigationData from "@/configs/navigation.json";
import type { NavigationConfig } from "@/types/navigation";
import SidebarItem from "./SidebarItem";
import { useUIStore } from "@/app/stores/ui.store";
import { NavLink } from "react-router";
import { Menu } from "lucide-react";

const navigation = navigationData as NavigationConfig;

export default function Sidebar() {
  const {
    sidebarOpen,
    toggleSidebar,
    closeSidebar,
    sidebarMode,
    toggleSidebarMode,
  } = useUIStore();

  const isCollapsed = sidebarMode === "collapsed";

  return (
    <>
      {/* Overlay Mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      <aside
        className={`
          fixed z-50 inset-y-0 left-0
          ${isCollapsed ? "w-20" : "w-64"}
          bg-slate-900 text-slate-200
          transition-all duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Header */}
        <div
          className={`h-16 flex items-center ${
            isCollapsed ? "justify-center" : "justify-between"
          }  px-4 border-b border-slate-800`}
        >
          {!isCollapsed && (
            <NavLink
              to="/"
              className="text-lg font-semibold text-white"
              onClick={closeSidebar}
            >
              MyApp
            </NavLink>
          )}

          <button
            onClick={toggleSidebarMode}
            className="p-2 rounded hover:bg-slate-800 cursor-pointer"
            aria-label="Toggle sidebar mode"
          >
            <Menu className="w-5 h-5 text-slate-700" />
          </button>
        </div>

        <nav className="p-2 space-y-1">
          {navigation.sidebar.map((item) => (
            <SidebarItem key={item.label} item={item} collapsed={isCollapsed} />
          ))}
        </nav>
      </aside>
    </>
  );
}
