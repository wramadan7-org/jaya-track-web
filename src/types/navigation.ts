import type { IconName } from "@/configs/icons";

export type NavigationItem = {
  label: string;
  path?: string;
  icon?: IconName;
  children?: NavigationItem[];
};

export type NavigationConfig = {
  sidebar: NavigationItem[];
  navbar: NavigationItem[];
};
