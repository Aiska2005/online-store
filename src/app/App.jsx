import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "../Components/Layout/Layout";
import Cards from "../Components/Cards/Cards";
import ProductList from "../Pages/product-list/ProductList";
import AddProduct from "../Pages/add-product/AddProduct";
import ProductDetailPage from "../Pages/ProductDetailPage/ProductDetailPage";

const App = () => {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/test" element={<Cards />} />
        <Route path="/list" element={<ProductList />} />
        <Route
          path="/add-product"
          element={isAuthenticated ? <AddProduct /> : <Navigate to="/login" />}
        />
        <Route path="/product-detail/:id" element={<ProductDetailPage />} />
      </Route>
    </Routes>
  );
};

export default App;
