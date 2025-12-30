import { Home, Users, ShoppingCart, Settings, Package } from "lucide-react";

export const iconMap = {
  home: Home,
  users: Users,
  products: Package,
  sales: ShoppingCart,
  settings: Settings,
};

export type IconName = keyof typeof iconMap;
