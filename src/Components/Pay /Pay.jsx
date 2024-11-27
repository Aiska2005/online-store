import Order from "../Order/Order";
import Cart from "../ui/cart/Cart";

const Pay = () => {
  return (
    <div className="container mx-auto px-4">
      <h3 className=" mb-6 text-lg font-semibold">Your cart</h3>
      <div className="flex flex-col md:flex-row gap-6 mt-8">
        <div className="w-full md:w-2/3">
          <Cart />
        </div>

        <div className="w-full md:w-1/3">
          <Order />
        </div>
      </div>
    </div>
  );
};

export default Pay;
