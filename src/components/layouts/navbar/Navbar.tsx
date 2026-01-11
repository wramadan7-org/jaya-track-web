import navigationData from "@/configs/navigation.json";
import type { NavigationConfig } from "@/types/navigation";
import { NavLink } from "react-router";
import { useState } from "react";
import { useUIStore } from "@/app/stores/ui.store";
import { Menu, ChevronDown } from "lucide-react";

const navigation = navigationData as NavigationConfig;

export default function Navbar() {
  const [open, setOpen] = useState<string | null>(null);
  const toggleSidebar = useUIStore((s) => s.toggleSidebar);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;

  return (
    <header className="sticky top-0 z-30 h-16 bg-white border-b flex items-center px-4 lg:px-6">
      {/* Mobile sidebar toggle */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden mr-4 p-2 rounded-md hover:bg-slate-100 cursor-pointer"
        aria-label="Toggle sidebar"
      >
        <Menu className="w-5 h-5 text-slate-700" />
      </button>

      <div className="flex-1" />

      <nav className="flex items-center gap-4">
        {navigation.navbar.map((item) =>
          item.children ? (
            <div key={item.label} className="relative group">
              {/* TRIGGER */}
              <button
                onClick={() =>
                  isMobile
                    ? setOpen(open === item.label ? null : item.label)
                    : undefined
                }
                className="flex items-center gap-1 text-sm font-medium text-slate-700 hover:text-blue-600"
              >
                {item.label}
                <ChevronDown className="w-4 h-4" />
              </button>

              {/* HOVER AREA */}
              <div className="absolute right-0 top-full pt-2 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition">
                {/* DROPDOWN PANEL */}
                <div className="w-44 bg-white border rounded-md shadow-md">
                  {item.children.map((child) => (
                    <NavLink
                      key={child.path || "/"}
                      to={child.path || "/"}
                      onClick={() => setOpen(null)}
                      className={({ isActive }) =>
                        `
              block px-4 py-2 text-sm
              ${
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-slate-700 hover:bg-slate-100"
              }
            `
                      }
                    >
                      {child.label}
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <NavLink
              key={item.path}
              to={item.path!}
              className={({ isActive }) =>
                `
                  text-sm font-medium
                  ${
                    isActive
                      ? "text-blue-600"
                      : "text-slate-700 hover:text-blue-600"
                  }
                `
              }
            >
              {item.label}
            </NavLink>
          )
        )}
      </nav>
    </header>
  );
}
