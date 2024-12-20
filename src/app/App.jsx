import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import Layout from "../Components/Layout/Layout";
import AddProduct from "../pages/admin/add-product/AddProduct";
import LoginPage from "../pages/login-page/LoginPage";
import ProductDetailPage from "../pages/ProductDetailPage/ProductDetailPage";
import ProductAll from "../pages/ProductAll/ProductAll";
import AdminPage from "../pages/admin";
import ProductList from "../pages/admin/product-list/ProductList";
import CartPage from "../pages/cart-page/CartPage";
import HomePage from "../pages/home-page/HomePage";

const App = () => {
	const isAuthenticated = !!localStorage.getItem(
		"sb-jpzknqwwmjzjmomeamao-auth-token"
	);
	
	return (
		<Routes>
			<Route path="/" element={<Layout/>}>
				<Route index element={<HomePage/>}/>
				<Route path="/login" element={<LoginPage/>}/>
				<Route path="/product-detail/:id" element={<ProductDetailPage/>}/>
				<Route path="/product-all" element={<ProductAll/>}/>
				<Route path="/cart" element={<CartPage/>}/>
			</Route>
			<Route path="/admin/" element={<AdminPage/>}>
				<Route path="products" element={<ProductList />} />
				<Route
					path="add-product"
					element={isAuthenticated ? <AddProduct/> : <Navigate to="/login"/>}
				/>
				{/*<Route path="orders" element={<Orders />} />*/}
				{/*<Route path="users" element={<Users />} />*/}
			</Route>
		</Routes>
	);
};

export default App;
