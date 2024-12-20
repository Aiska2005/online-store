import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FilterSidebar from "./FilterSidebar";
import productApi from "../../service/product.api";
const ProductAll = () => {
  const [goods, setGoods] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const products = await productApi.getProducts();
      setGoods(products);
    } catch (error) {
      console.error("Ошибка при получении товаров:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-start justify-center bg-gray-50 p-4 lg:p-10 gap-6">
      {/* Sidebar */}
      <div className="w-full lg:w-64">
        <FilterSidebar />
      </div>

      {/* Product List */}
      <section className="text-gray-600 body-font w-full">
        <div className="container px-2 sm:px-5 mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {goods.length > 0 ? (
              goods.map((item) => (
                <div key={item.id} className="p-2">
                  <a
                    href={`/product-detail/${item.id}`}
                    className="block relative h-64 rounded overflow-hidden"
                  >
                    <img
                      alt="ecommerce"
                      className="object-contain object-center w-full h-full block"
                      src={item.images?.[0] || "https://dummyimage.com/420x260"}
                    />
                  </a>
                  <div className="mt-2 text-center">
                    <h2 className="text-gray-900 title-font text-sm sm:text-lg font-medium">
                      {item.name}
                    </h2>
                    <p className="mt-1 text-gray-700">${item.price || "N/A"}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center w-full text-gray-500">
                Нет доступных товаров
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
export default ProductAll;
