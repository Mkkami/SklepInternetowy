import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/index.css";
import App from "./pages/App.tsx";
import CreateUser from "./pages/CreateUser.tsx";
import Login from "./pages/Login.tsx";
import Cart from "./pages/Cart.tsx";
import CreateProduct from "./pages/CreateProduct.tsx";
import ProtectedRoute from "./services/ProtectedRoute.tsx";
import AdminPanel from "./pages/AdminPanel.tsx";
import AdminProducts from "./pages/AdminProducts.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/register" element={<CreateUser />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        {/* <Route path="/create-product" element={<CreateProduct />} /> */}
        <Route
          path="/create-product"
          element={
            <ProtectedRoute requiredRole="ROLE_ADMIN">
              <CreateProduct />
            </ProtectedRoute>}/>
        <Route
          path="/admin-panel"
          element={
            <ProtectedRoute requiredRole="ROLE_ADMIN">
              <AdminPanel />
            </ProtectedRoute>}/>
            <Route
          path="/admin-panel/products"
          element={
            <ProtectedRoute requiredRole="ROLE_ADMIN">
              <AdminProducts />
            </ProtectedRoute>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
