import { useRef, useState } from "react";
import { NavLink, useLocation } from "react-router";
import { ChevronRight } from "lucide-react";
import { iconMap } from "@/configs/icons";
import type { NavigationItem } from "@/types/navigation";
import { useUIStore } from "@/app/stores/ui.store";

interface Props {
  item: NavigationItem;
  collapsed: boolean;
}

export default function SidebarItem({ item, collapsed }: Props) {
  const { closeSidebar } = useUIStore();
  const location = useLocation();

  const isChildActive =
    item.children?.some((c) => location.pathname.startsWith(c.path ?? "")) ??
    false;

  const [open, setOpen] = useState(isChildActive);
  const [hovered, setHovered] = useState(false);
  const hoverTimeout = useRef<number | null>(null);

  const handleEnter = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setHovered(true);
  };

  const handleLeave = () => {
    hoverTimeout.current = window.setTimeout(() => {
      setHovered(false);
    }, 200);
  };

  const Icon = item.icon ? iconMap[item.icon] : null;

  /*  SUB MENU  */
  if (item.children) {
    return (
      <div
        className="relative "
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        <button
          onClick={() => !collapsed && setOpen((v) => !v)}
          className={`
            w-full flex items-center ${
              collapsed ? "justify-center" : "justify-between"
            }
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
            {!collapsed && <span>{item.label}</span>}
          </div>

          {!collapsed && (
            <ChevronRight
              className={`w-4 h-4 transition-transform ${
                open ? "rotate-90" : ""
              }`}
            />
          )}
        </button>

        {/* Expanded submenu */}
        {!collapsed && (
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
                onClick={closeSidebar}
                className={({ isActive }) =>
                  `
                  block px-3 py-2 rounded-md text-sm
                  ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-slate-300 hover:bg-slate-800"
                  }
                `
                }
              >
                {child.label}
              </NavLink>
            ))}
          </div>
        )}

        {/* Collapsed submenu tooltip */}
        {collapsed && hovered && (
          <div
            className="
              absolute left-full top-0 ml-2
              group-hover:block
              bg-slate-800 rounded-md p-2 min-w-45
              shadow-lg
            "
          >
            <p className="px-2 py-1 text-xs text-slate-400">{item.label}</p>
            {item.children.map((child) => (
              <NavLink
                key={child.path}
                to={child.path!}
                onClick={() => {
                  closeSidebar();
                  setHovered(false);
                }}
                className={({ isActive }) =>
                  `
                  block px-3 py-2 rounded-md text-sm
                  ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-slate-300 hover:bg-slate-700"
                  }
                `
                }
              >
                {child.label}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    );
  }

  /*  SINGLE ITEM  */
  return (
    <div className="relative group">
      <NavLink
        to={item.path!}
        onClick={closeSidebar}
        className={({ isActive }) =>
          `
          flex items-center gap-2
          px-3 py-2 rounded-md text-sm
          transition ${collapsed ? "justify-center" : "justify-start"}
          ${
            isActive
              ? "bg-blue-600 text-white"
              : "text-slate-300 hover:bg-slate-800"
          }
        `
        }
      >
        {Icon && <Icon className="w-4 h-4" />}
        {!collapsed && <span>{item.label}</span>}
      </NavLink>

      {/* Tooltip */}
      {collapsed && (
        <div
          className="
            absolute left-full top-1/2 -translate-y-1/2 ml-2
            bg-slate-800 text-white text-sm
            px-3 py-1 rounded
            opacity-0 group-hover:opacity-100
            transition pointer-events-none
          "
        >
          {item.label}
        </div>
      )}
    </div>
  );
}
