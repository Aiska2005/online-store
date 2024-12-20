import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "../Components/Layout/Layout";
import HomePag from "../Pages/home-page/HomePage";
import LoginPage from "../Pages/login-page/LoginPage";
import ProductDetailPage from "../Pages/ProductDetailPage/ProductDetailPage";
import ProductAll from "../Pages/ProductAll/ProductAll";
import CartPage from "../Pages/cart-page/CartPage";
// import AdminPage from "../Pages/admin/add-product";

const App = () => {
  const isAuthenticated = !!localStorage.getItem(
    "sb-jpzknqwwmjzjmomeamao-auth-token"
  );

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePag />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/product-detail/:id" element={<ProductDetailPage />} />
        <Route path="/product-all" element={<ProductAll />} />
        <Route path="/cart" element={<CartPage />} />
      </Route>
      {/* <Route path="/admin/" element={<AdminPage />}> */}
      {/* <Route path="products" element={<ProductList />} /> */}
      {/* <Route
          path="add-product"
          element={isAuthenticated ? <AddProduct /> : <Navigate to="/login" />}
        /> */}
      {/*<Route path="orders" element={<Orders />} />*/}
      {/*<Route path="users" element={<Users />} />*/}
      {/* </Route> */}
    </Routes>
  );
};

export default App;
