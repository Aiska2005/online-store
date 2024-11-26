import Order from "../Order/Order";
import Cart from "../ui/cart/Cart";

const Pay = () => {
  return (
    <div className="container mx-auto px-4 md:p-0 flex mt-[30px]">
      <Cart />
      <Order />
    </div>
  );
};

export default Pay;
