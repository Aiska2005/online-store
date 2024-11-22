import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Header from "./Components/Header/Header";

// import Dish from "./pages/Dish/Dish.jsx";
// import Pasty from "./pages/Pasty/Pasty.jsx";
// import SalatPages from "./pages/SalatPages/SalatPages.jsx";
// import Samsy from "./pages/Samsy/Samsy.jsx";
// import Soup from "./pages/Soup/Soup.jsx";
// import Home from "./pages/home/Home.jsx";
// import Drinks from "./pages/drinks/Drinks";
ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Header />} />
        {/* <Route path="/salat" element={<SalatPages />} />
        <Route path="/drinks" element={<Drinks />} />
        <Route path="/soup" element={<Soup />} />
        <Route path="/meels" element={<Dish />} />
        <Route path="/pasty" element={<Pasty />} />
        <Route path="/samsy" element={<Samsy />} /> */}
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
