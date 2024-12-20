import {Modal} from "antd";
import ProductImages from "./ProductImages";
import React from "react";

const ViewProductModal = ({selectedProduct,handleCloseModal}) => {
	return (
    <Modal
      title={selectedProduct.name}
      visible={!!selectedProduct}
      onCancel={handleCloseModal}
      footer={null}
    >
      <div>
        <ProductImages images={selectedProduct.images} id={selectedProduct.id}/>
        <p><strong>Описание:</strong> {selectedProduct.description}</p>
        <p><strong>Цена:</strong> {selectedProduct.price} ⊆ </p>
        <p><strong>В наличии:</strong> {selectedProduct.stock > 0 ? 'Да' : 'Нет'}</p>
      </div>
    </Modal>
	);
};

export default ViewProductModal;