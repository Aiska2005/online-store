import { IncrementItem } from "../../../Pages/ProductDetailPage/ProductInfo";
import { AiFillDelete } from "react-icons/ai";

const Cart = ({ items }) => {
  return (
    <div>
      {items.map((item) => (
        <div
          key={item.id}
          className="flex flex-col sm:flex-row items-center sm:justify-between border border-gray-200 rounded-lg p-4 shadow-sm bg-white mb-4 max-w-full"
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-20 h-20 rounded-lg object-cover"
          />

          <div className="flex-1 mt-4 sm:mt-0 sm:ml-4 text-center sm:text-left">
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <p className="text-sm text-gray-600">Size: {item.size}</p>
            <p className="text-sm text-gray-600">Color: {item.color}</p>
            <p className="text-lg font-bold mt-2 text-gray-800">
              ${item.price}
            </p>
          </div>

          <div className="flex flex-row sm:flex-col items-center gap-4 mt-4 sm:mt-0">
            <button className="text-red-500 text-xl hover:text-red-600">
              <AiFillDelete />
            </button>
            <IncrementItem />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cart;
