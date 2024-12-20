import Order from "../../Components/Order/Order";
import Cart from "../../Components/ui/cart/Cart";

const Pay = () => {
  const cartItems = [
    {
      id: 1,
      name: "Gradient Graphic T-shirt",
      size: "Large",
      color: "White",
      price: 145,
      image:
        "https://i.pinimg.com/originals/5b/6e/ca/5b6eca63605bea0eeb48db43f77fa0ce.jpg",
    },
    {
      id: 2,
      name: "Classic Hoodie",
      size: "Medium",
      color: "Black",
      price: 85,
      image:
        "https://img.freepik.com/free-photo/heart-shaped-hands-sunset_23-2150169264.jpg",
    },
  ];
  return (
    <div className="container mx-auto px-4">
      <h3 className="mb-6 text-[40px] font-extrabold leading-[48px] text-left decoration-skip-ink decoration-underline">
        Your cart
      </h3>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-2/3">
          <Cart items={cartItems} />
        </div>

        <div className="w-full md:w-1/3">
          <Order />
        </div>
      </div>
    </div>
  );
};

export default Pay;
