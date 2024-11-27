import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Main from "./Pages/Main/Main.jsx";
import "./Styles/index.css";
import Pay from "./Pages/Pay/Pay.jsx";
import ProductDetailPage from "./Pages/ProductDetailPage/ProductDetailPage";

ReactDOM.render(
  <BrowserRouter
    future={{
      v7_relativeSplatPath: true,
    }}
  >
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Main />} />
        <Route path="/pay" element={<Pay />} />
        <Route path="/product-detail/:id" element={<ProductDetailPage />} />
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
