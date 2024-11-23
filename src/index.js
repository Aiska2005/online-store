import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import "./Styles/index.css";
import Cards from "./Components/Cards/Cards";

ReactDOM.render(
  <BrowserRouter
    future={{
      v7_relativeSplatPath: true,
    }}
  >
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/test" element={<Cards />} />
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
