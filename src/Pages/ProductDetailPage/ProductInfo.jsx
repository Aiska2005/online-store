import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../../redux/slices/cartSlice";
import CommonButton from "../../Components/ui/buttons/CommonButton";
import styles from "./product-detail.module.css";

// Компонент для выбора цвета
const ColorSelector = ({ colors, selectedColor, onSelect }) => (
  <div className={styles.circleDivWrap}>
    {colors.map((color, index) => (
      <div
        key={index}
        onClick={() => onSelect(index)}
        className="flex items-center justify-center text-white h-[37px] w-[37px] rounded-full border border-black"
        style={{ backgroundColor: color }}
      >
        {selectedColor === index && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 12.75 6 6 9-13.5"
            />
          </svg>
        )}
      </div>
    ))}
  </div>
);

// Компонент для выбора размера
const SizeSelector = ({ sizes, selectedSize, onSelect }) => (
  <div className="flex gap-[12px] mb-[24px] pb-[22px] border-b">
    {sizes.map((size, index) => (
      <CommonButton
        key={index}
        onClick={() => onSelect(size)}
        className={`${
          selectedSize === size ? "bg-black text-white" : "bg-[#F0F0F0]"
        }`}
      >
        {size}
      </CommonButton>
    ))}
  </div>
);

// Компонент для увеличения/уменьшения количества
const IncrementItem = ({ count, setCount }) => (
  <div className="flex rounded-[62px] bg-[#F0F0F0] w-[170px] justify-between h-[52px] items-center px-[22px]">
    <button onClick={() => count > 1 && setCount(count - 1)}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M21.375 12C21.375 12.2984 21.2565 12.5845 21.0455 12.7955C20.8345 13.0065 20.5484 13.125 20.25 13.125H3.75C3.45163 13.125 3.16548 13.0065 2.9545 12.7955C2.74353 12.5845 2.625 12.2984 2.625 12C2.625 11.7016 2.74353 11.4155 2.9545 11.2045C3.16548 10.9935 3.45163 10.875 3.75 10.875H20.25C20.5484 10.875 20.8345 10.9935 21.0455 11.2045C21.2565 11.4155 21.375 11.7016 21.375 12Z"
          fill="black"
        />
      </svg>
    </button>
    <p>{count}</p>
    <button onClick={() => setCount(count + 1)}>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19.375 10C19.375 10.2984 19.2565 10.5845 19.0455 10.7955C18.8345 11.0065 18.5484 11.125 18.25 11.125H11.125V18.25C11.125 18.5484 11.0065 18.8345 10.7955 19.0455C10.5845 19.2565 10.2984 19.375 10 19.375C9.70163 19.375 9.41548 19.2565 9.2045 19.0455C8.99353 18.8345 8.875 18.5484 8.875 18.25V11.125H1.75C1.45163 11.125 1.16548 11.0065 0.954505 10.7955C0.743526 10.5845 0.625 10.2984 0.625 10C0.625 9.70163 0.743526 9.41548 0.954505 9.2045C1.16548 8.99353 1.45163 8.875 1.75 8.875H8.875V1.75C8.875 1.45163 8.99353 1.16548 9.2045 0.954505C9.41548 0.743526 9.70163 0.625 10 0.625C10.2984 0.625 10.5845 0.743526 10.7955 0.954505C11.0065 1.16548 11.125 1.45163 11.125 1.75V8.875H18.25C18.5484 8.875 18.8345 8.99353 19.0455 9.2045C19.2565 9.41548 19.375 9.70163 19.375 10Z"
          fill="black"
        />
      </svg>
    </button>
  </div>
);

// Основной компонент
const ProductInfo = ({ data }) => {
  const [size, setSize] = useState("Small");
  const [iconCheck, setIconCheck] = useState(0);
  const [count, setCount] = useState(1);
  const dispatch = useDispatch();
  
  const handleAddToCart = useCallback(() => {
    dispatch(addItem({ ...data, quantity: count, size, color: data.colors[iconCheck] }));
  }, [dispatch, data, count, size, iconCheck]);
  
  return (
    <>
      <h1 className="md:text-[30px] text-[26px] font-[400] md:mb-[30px] mb-[10px]">
        {data.name}
      </h1>
      <div className="flex gap-[12px] md:text-[32px] text-[18px] mb-[15px]">
        <span className="text-[grey]">{data.price} ⊆</span>
      </div>
      <p className="pb-[13px] border-b font-[400]">{data.description}</p>
      {/* Выбор цвета */}
      <p className={styles.divColors}>Выберите цвета</p>
      <ColorSelector
        colors={data.product_colors.map( ({colors}) =>colors.name )}
        selectedColor={iconCheck}
        onSelect={setIconCheck}
      />
      
      {/* Выбор размера */}
      <p className="text-[#00000099] pt-[24px] pb-[16px]">Выберите размер</p>
      <SizeSelector sizes={["Small", "Medium", "Large", "X-Large"]} selectedSize={size} onSelect={setSize} />
      
      {/* Инкремент количества и добавление в корзину */}
      <div className="flex items-center gap-[20px]">
        <IncrementItem count={count} setCount={setCount} />
        <div className="flex-grow">
          <CommonButton onClick={handleAddToCart} className="bg-[#000] text-[#fff] w-full py-[14px]">
            Add to Cart
          </CommonButton>
        </div>
      </div>
    </>
  );
};

export default ProductInfo;
