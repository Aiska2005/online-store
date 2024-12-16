import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "../Components/Layout/Layout";
import Cards from "../Components/Cards/Cards";
import AddProduct from "../pages/admin/add-product/AddProduct";
import LoginPage from "../pages/login-page/LoginPage";
import ProductList from "../pages/product-list/ProductList";
import ProductDetailPage from "../pages/ProductDetailPage/ProductDetailPage";

const App = () => {
  const isAuthenticated = !!localStorage.getItem(
    "sb-jpzknqwwmjzjmomeamao-auth-toke"
  );

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Cards />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/list" element={<ProductList />} />
        <Route
          path="/add-product"
          element={isAuthenticated ? <AddProduct /> : <Navigate to="/login" />}
        />
        <Route path="/product-detail/:id" element={<ProductDetailPage />} />
        {/* <Route path="/admin/products" element={<ProductList />} /> */}
      </Route>
    </Routes>
  );
};

export default App;
