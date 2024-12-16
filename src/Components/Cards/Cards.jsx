import React, { useEffect, useState } from "react";
import ProductApi from "../../service/product.api";
import CommonButton from "../ui/buttons/CommonButton";
import { useNavigate } from "react-router-dom";

const Cards = () => {
  const [goods, setGoods] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const products = await ProductApi.getProducts();
      setGoods(products);
    } catch (error) {
      console.error("Ошибка при получении товаров:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleViewAll = () => {
    navigate("");
  };

  return (
    <div>
      <div className="flex flex-wrap w-full bg-gray-100 py-32 px-10 relative mb-4">
        <img
          alt="gallery"
          className="w-full object-cover h-full object-center block opacity-25 absolute inset-0"
          src="https://png.pngtree.com/thumb_back/fw800/background/20241113/pngtree-abstract-international-sports-day-banner-image-image_16580033.jpg"
        />
        <div className="text-center relative z-10 w-full">
          <h2 className="text-2xl text-gray-900 font-medium title-font mb-2">
            Shooting Stars
          </h2>
          <p className="leading-relaxed">
            Skateboard +1 mustache fixie paleo lumbersexual.
          </p>
        </div>
      </div>
      <h2 className="text-4xl font-bold text-center text-gray-800 my-6 tracking-widest">
        NEW ARRIVALS
      </h2>
      <section className="text-gray-600 body-font">
        <div className="container px-5 mx-auto">
          <div className="flex flex-wrap -m-4">
            {goods.length > 0 ? (
              goods.map((item) => (
                <div key={item.id} className="lg:w-1/4 md:w-1/2 p-4 w-full">
                  <a
                    href={`/product-detail/${item.id}`}
                    className="block relative h-80 rounded overflow-hidden"
                  >
                    <img
                      alt="ecommerce"
                      className="object-contain object-center w-[400px] sm:w-[300px] md:w-[350px] lg:w-[400px] h-auto block"
                      src={item.images?.[0] || "https://dummyimage.com/420x260"}
                    />
                  </a>
                  <div className="mt-4">
                    <h2 className="text-gray-900 title-font text-lg font-medium">
                      {item.name}
                    </h2>
                    <p className="mt-1">${item.price || "N/A"}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center w-full">Нет доступных товаров</p>
            )}
          </div>
        </div>
      </section>
      <div className="flex justify-center mt-6">
        <CommonButton
          onClick={handleViewAll}
          className="text-center border border-gray-300 rounded-full px-6 py-2 text-black font-medium hover:bg-gray-100 transition duration-300"
        >
          View All
        </CommonButton>
      </div>
    </div>
  );
};

export default Cards;
