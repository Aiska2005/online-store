import CommonButton from "../ui/buttons/CommonButton";

const Order = () => {
  return (
    <div class="max-w-sm mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-md">
      <h2 class="text-xl font-semibold mb-4">Order Summary</h2>

      <div class="flex justify-between text-gray-700 mb-2">
        <span>Subtotal</span>
        <span class="font-medium">$565</span>
      </div>

      <div class="flex justify-between text-gray-700 mb-2">
        <span>Discount (-20%)</span>
        <span class="font-medium text-red-500">-$113</span>
      </div>

      <div class="flex justify-between text-gray-700 mb-4">
        <span>Delivery Fee</span>
        <span class="font-medium">$15</span>
      </div>

      <hr class="border-t border-gray-300 mb-4" />

      <div class="flex justify-between text-gray-900 text-lg font-semibold mb-4">
        <span>Total</span>
        <span>$467</span>
      </div>

      <div class="flex items-center mb-4 space-x-2">
        <div class="flex items-center border border-gray-300 rounded-lg flex-1 px-3 py-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5 text-gray-400 mr-2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 7.5l16.5-4.125M7.5 10.125L21.375 12 7.5 13.875m-3.75 2.625l16.5 4.125"
            />
          </svg>
          <input
            type="text"
            placeholder="Add promo code"
            class="w-full bg-transparent outline-none text-gray-700"
          />
        </div>
        <div className={"flex-grow"}>
          <CommonButton className={"bg-[#000] text-[#fff] w-full py-[14px]"}>
            Apply
          </CommonButton>
        </div>
      </div>

      <div className={"flex-grow"}>
        <CommonButton className={"bg-[#000] text-[#fff] w-full py-[14px]"}>
          Go to Checkout
        </CommonButton>
      </div>
    </div>
  );
};
export default Order;
