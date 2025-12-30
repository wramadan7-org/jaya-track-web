import { useState } from "react";
import { NavLink, useLocation } from "react-router";
import { ChevronRight } from "lucide-react";
import { iconMap } from "@/configs/icons";
import type { NavigationItem } from "@/types/navigation";
import { useUIStore } from "@/app/stores/ui.store";

export default function SidebarItem({ item }: { item: NavigationItem }) {
  const { closeSidebar } = useUIStore();
  const location = useLocation();
  const isChildActive =
    item.children?.some((c) => location.pathname.startsWith(c.path ?? "")) ??
    false;

  const [open, setOpen] = useState(isChildActive);

  const Icon = item.icon ? iconMap[item.icon] : null;

  if (item.children) {
    return (
      <div>
        <button
          onClick={() => setOpen((v) => !v)}
          className={`
            w-full flex items-center justify-between
            px-3 py-2 rounded-md text-sm
            transition
            ${
              isChildActive
                ? "bg-slate-800 text-white"
                : "text-slate-300 hover:bg-slate-800"
            }
          `}
        >
          <div className="flex items-center gap-2">
            {Icon && <Icon className="w-4 h-4" />}
            <span>{item.label}</span>
          </div>

          <ChevronRight
            className={`w-4 h-4 transition-transform ${
              open ? "rotate-90" : ""
            }`}
          />
        </button>

        <div
          className={`
            ml-4 mt-1 space-y-1 overflow-hidden
            transition-all duration-300
            ${open ? "max-h-96" : "max-h-0"}
          `}
        >
          {item.children.map((child) => (
            <NavLink
              key={child.path}
              to={child.path!}
              className={({ isActive }) =>
                `
                  block px-3 py-2 rounded-md text-sm
                  transition
                  ${
                    isActive
                      ? "bg-blue-600 text-white important"
                      : "text-slate-300 hover:bg-slate-800"
                  }
                `
              }
              onClick={() => closeSidebar()}
            >
              {child.label}
            </NavLink>
          ))}
        </div>
      </div>
    );
  }

  return (
    <NavLink
      to={item.path!}
      className={({ isActive }) =>
        `
          flex items-center gap-2
          px-3 py-2 rounded-md text-sm
          transition
          ${
            isActive
              ? "bg-blue-600 text-white"
              : "text-slate-300 hover:bg-slate-800"
          }
        `
      }
      onClick={() => closeSidebar()}
    >
      {Icon && <Icon className="w-4 h-4" />}
      <span>{item.label}</span>
    </NavLink>
  );
}
