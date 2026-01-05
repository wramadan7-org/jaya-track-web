import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Providers from "./app/provider";
import { RouterProvider } from "react-router";
import { router } from "./app/router";
import ConfirmModal from "./components/common/ConfirmModal";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfirmModal />
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  </StrictMode>
);
