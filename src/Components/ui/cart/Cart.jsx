import { IncrementItem } from "../../../Pages/ProductDetailPage/ProductInfo";
import { AiFillDelete } from "react-icons/ai";

const Cart = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center sm:justify-between border border-gray-200 rounded-lg p-4 shadow-sm bg-white mb-4 max-w-full sm:max-w-[667px]">
      <img
        src="https://i.pinimg.com/originals/5b/6e/ca/5b6eca63605bea0eeb48db43f77fa0ce.jpg"
        alt="Gradient Graphic T-shirt"
        className="w-20 h-20 rounded-lg object-cover"
      />

      <div className="flex-1 mt-4 sm:mt-0 sm:ml-4 text-center sm:text-left">
        <h3 className="text-lg font-semibold">Gradient Graphic T-shirt</h3>
        <p className="text-sm text-gray-600">Size: Large</p>
        <p className="text-sm text-gray-600">Color: White</p>
        <p className="text-lg font-bold mt-2 text-gray-800">$145</p>
      </div>

      <div className="flex flex-row sm:flex-col items-center gap-4 mt-4 sm:mt-0">
        <button className="text-red-500 text-xl hover:text-red-600">
          <AiFillDelete />
        </button>
        <IncrementItem />
      </div>
    </div>
  );
};

export default Cart;
