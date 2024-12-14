import React, {useState, useEffect, useCallback} from 'react';
import {Typography, Spin, Modal, Button} from 'antd';
import ProductTable from './ProductTable';
import productApi from '../../../service/product.api';
import ProductImages from "./ProductImages";
import ViewProductModal from "./ViewProductModal";
import {Link} from "react-router-dom";

const {Title} = Typography;

const ProductList = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [selectedProduct, setSelectedProduct] = useState(null);
	
	const fetchProducts = useCallback(async () => {
		setLoading(true);
		try {
			const data = await productApi.getProducts();
			setProducts(data);
		} catch (error) {
			console.error('Ошибка загрузки продуктов:', error);
		} finally {
			setLoading(false);
		}
	}, []);
	
	useEffect(() => {
		fetchProducts();
	}, [fetchProducts]);
	
	const handleView = (id) => {
		const product = products.find((product) => product.id === id);
		setSelectedProduct(product);
	};
	
	const handleCloseModal = () => {
		setSelectedProduct(null);
	};
	
	const handleEdit = (id) => {
		console.log(`Редактировать продукт с ID: ${id}`);
	};
	
	const handleDelete = (id) => {
		console.log(`Удалить продукт с ID: ${id}`);
	};
	
	return (
		<div className="container mx-auto p-6">
			<div className={"flex justify-between"}>
				<Title level={2}>Список продуктов</Title>
				<Button>
					<Link to="/add-product">
						Добавить товар
					</Link>
				</Button>
			</div>
			{loading ? (
				<div className="flex justify-center items-center">
					<Spin size="large"/>
				</div>
			) : (
				<ProductTable
					loading={loading}
					products={products}
					handleEdit={handleEdit}
					handleDelete={handleDelete}
					handleView={handleView}
				/>
			)}
			{selectedProduct && <ViewProductModal selectedProduct={selectedProduct} handleCloseModal={handleCloseModal}/>}
		</div>
	);
};

export default ProductList;
