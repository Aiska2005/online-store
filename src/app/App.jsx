

import React from 'react'
import { Route, Routes } from 'react-router-dom';

const App = () => {
  const isAuthenticated = !!localStorage.getItem('token');

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
  )
}

export default App