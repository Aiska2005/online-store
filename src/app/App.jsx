

import React from 'react'
import {Navigate, Route, Routes} from 'react-router-dom';
import Layout from "../Components/Layout/Layout";
import Cards from "../Components/Cards/Cards";

import AddProduct from "../pages/admin/add-product/AddProduct";
import ProductDetailPage from "../pages/product-detail/ProductDetailPage";
import LoginPage from "../pages/login-page/LoginPage";
import ProductList from "../pages/admin/product-list/ProductList";

const App = () => {
  const isAuthenticated = !!localStorage.getItem('sb-jpzknqwwmjzjmomeamao-auth-token');

  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/test" element={<Cards />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/add-product"
            element={isAuthenticated ? <AddProduct /> : <Navigate to="/login" />}
          />
          <Route path="/product-detail/:id" element={<ProductDetailPage />} />
          <Route path="/admin/products/" element={<ProductList />} />
          
        </Route>
      </Routes>
  )
}

export default App