import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Main = () => {
  const [goods, setGoods] = useState([]);

  const fetchData = async () => {
    const url = "https://673d89de0118dbfe86079da2.mockapi.io/api/v1/goods";
    const response = await fetch(url);
    const data = await response.json();
    setGoods(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="flex flex-wrap w-full bg-gray-100 py-32 px-10 relative mb-4">
        <img
          alt="gallery"
          className="w-full object-cover h-full object-center block opacity-25 absolute inset-0"
          src="https://swjournal.ru/wp-content/uploads/2021/03/Eco-Friendly-tops.jpg"
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

      <div className="container mx-auto px-4 md:p-0 flex flex-col items-center justify-center">
        <h2 className="mb-6 text-[40px] font-extrabold leading-[48px] mb-6 text-center">
          NEW ARRIVALS
        </h2>
        <Link to="/product-detail/:id" className="mx-auto">
          <div className="flex flex-wrap justify-center">
            {goods?.map((item) => (
              <div className="lg:w-1/4 md:w-1/2 p-4 w-full" key={item.id}>
                <a className="block relative h-80 rounded overflow-hidden">
                  <img
                    alt="ecommerce"
                    className="object-contain object-center w-full block"
                    src={item.images[0]}
                  />
                </a>
                <div className="mt-4">
                  <h2 className="text-gray-900 title-font text-lg font-medium">
                    {item.name}
                  </h2>
                  <p className="mt-1">${item.new_price}</p>
                </div>
              </div>
            ))}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Main;
