import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import "./Styles/index.css";
import Pay from "./Components/Pay /Pay";

ReactDOM.render(
  <BrowserRouter
    future={{
      v7_relativeSplatPath: true,
    }}
  >
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/pay" element={<Pay />} />
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
