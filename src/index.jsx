import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import "./Styles/index.css";
import Cards from "./Components/Cards/Cards";
import ProductDetailPage from "./pages/product-detail/ProductDetailPage";
import {Provider} from "react-redux";
import store from "./redux/store";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter
      future={{
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/test" element={<Cards />} />
          <Route path="/product-detail/:id" element={<ProductDetailPage/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
  ,
  document.getElementById("root")
);
