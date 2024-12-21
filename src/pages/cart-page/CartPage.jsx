import React from "react";
import { useParams } from "react-router-dom";

const CartPage = ({ data }) => {
  const { id } = useParams();

  // Ищем товар по id
  const product = data.find((item) => item.id === parseInt(id, 10));

  if (!product) {
    return <p>Товар не найден.</p>;
  }

  return (
    <section className="py-8 antialiased md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 className="text-xl font-semibold sm:text-2xl">Корзина покупок</h2>

        <div className="mt-6 space-y-6">
          <div className="rounded-lg border p-4 shadow-sm md:p-6">
            <div className="flex items-center gap-6">
              <img
                src={product.image}
                alt={product.name}
                className="h-20 w-20"
              />
              <div className="flex-1">
                <h3 className="text-base font-medium">{product.name}</h3>
                <p>Размер: {product.size}</p>
                <p>Цвет: {product.color}</p>
              </div>
              <p className="text-base font-bold">{product.price} ⊆</p>
              <p>Количество: {product.quantity}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartPage;
