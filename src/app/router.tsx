import DashboardPage from "@/routes/dashboard/page";
import ProductPage from "@/routes/product/page";
import ProfilePage from "@/routes/profile/page";
import RootLayout from "@/routes/root/Layout";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "dashboard", element: <DashboardPage /> },
      { path: "product", element: <ProductPage /> },
      { path: "profile", element: <ProfilePage /> },
    ],
  },
]);
