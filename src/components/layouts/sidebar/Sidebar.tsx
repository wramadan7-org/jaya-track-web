import navigationData from "@/configs/navigation.json";
import type { NavigationConfig } from "@/types/navigation";
import SidebarItem from "./SidebarItem";
import { useUIStore } from "@/app/stores/ui.store";
import { NavLink } from "react-router";

const navigation = navigationData as NavigationConfig;

export default function Sidebar() {
  const { sidebarOpen, toggleSidebar, closeSidebar } = useUIStore();

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
          fixed z-50 inset-y-0 left-0 w-64
          bg-slate-900 text-slate-200
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        <NavLink
          to={"/"}
          className="h-16 flex items-center px-6 text-lg font-semibold border-b border-slate-800 w-full cursor-pointer text-white"
          onClick={() => closeSidebar()}
        >
          <p className="text-white">MyApp</p>
        </NavLink>

        <nav className="p-4 space-y-1">
          {navigation.sidebar.map((item) => (
            <SidebarItem key={item.label} item={item} />
          ))}
        </nav>
      </aside>
    </>
  );
}
