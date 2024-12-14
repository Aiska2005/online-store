import { useEffect, useState } from "react";
import productApi from "../../service/product/product.api";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await productApi.getProducts();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>{product.price} ₽</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
