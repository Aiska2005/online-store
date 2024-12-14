import React, { useEffect, useState } from "react";

const Cards = () => {
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
      <div class="flex flex-wrap w-full bg-gray-100 py-32 px-10 relative mb-4">
        <img
          alt="gallery"
          class="w-full object-cover h-full object-center block opacity-25 absolute inset-0"
          src="https://dummyimage.com/820x340"
        />
        <div class="text-center relative z-10 w-full">
          <h2 class="text-2xl text-gray-900 font-medium title-font mb-2">
            Shooting Stars
          </h2>
          <p class="leading-relaxed">
            Skateboard +1 mustache fixie paleo lumbersexual.
          </p>
        </div>
      </div>
      <section class="text-gray-600 body-font">
        <div class="container px-5 py-24 mx-auto">
          <div class="flex flex-wrap -m-4">
            {goods?.map((item) => (
              <div class="lg:w-1/4 md:w-1/2 p-4 w-full">
                <a class="block relative h-80 rounded overflow-hidden">
                  <img
                    alt="ecommerce"
                    class="object-contain object-center w-full  block"
                    src={item.images[0]}
                  />
                </a>
                <div class="mt-4">
                  <h2 class="text-gray-900 title-font text-lg font-medium">
                    {item.name}
                  </h2>
                  <p class="mt-1">${item.new_price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cards;
