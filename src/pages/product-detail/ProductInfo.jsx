import styles from "./product-detail.module.css";
import CommonButton from "../../Components/ui/buttons/CommonButton";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {addItem} from "../../redux/slices/cartSlice";

const ProductInfo = ({data}) => {
	const [size, setSize] = useState("Small");
	const [iconCheck, setIconCheck] = useState(0);
	const dispatch = useDispatch();
	
	const handleAddToCart = (newItem) => {
		dispatch(addItem(newItem))
	}
	
	return (
		<>
			<h1 className={"md:text-[30px] text-[26px] font-[400] md:mb-[30px] mb-[10px]"}>
				{data.title}
			</h1>
			<div className={"flex gap-[12px] md:text-[32px] text-[18px] mb-[15px]"}>
				<span>$260</span>
				<span className={"text-[grey]"}>$300</span>
			</div>
			<p className={"pb-[13px] border-b font-[400]"}>
				Эта футболка с графическим рисунком идеально подойдет для любого случая. Изготовленная из мягкой и дышащей
				ткани, она обеспечивает непревзойденный комфорт и стиль.
			</p>
			<p className={styles.divColors}>
				Выберите цвета
			</p>
			<div className={styles.circleDivWrap}>
				{["red", "blue", "black", "green"].map((item, i) => (
					<div
						key={i}
						onClick={() => {
							setIconCheck(i)
						}}
						className={`flex items-center justify-center text-[white] h-[37px] w-[37px] rounded-full bg-[${item}]`}>
						{iconCheck === i ? (
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
							     stroke="currentColor" className="size-6">
								<path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5"/>
							</svg>) : null}
					</div>
				))}
			</div>
			<p className={"text-[#00000099] pt-[24px] pb-[16px]"}>
				Выберите размер
			</p>
			<div className={"flex gap-[12px] mb-[24px] pb-[22px] border-b"}>
				{["Small", "Medium", "Large", "X-Large"].map((btn, i) => (
						<CommonButton
							onClick={() => setSize(btn)}
							className={`${size === btn ? 'bg-[black] text-[white] ' : 'bg-[#F0F0F0]'}  `}
							key={i}>{btn}
						</CommonButton>
					)
				)}
			</div>
			<div className={"flex items-center gap-[20px]"}>
				<IncrementItem/>
				<div className={"flex-grow"}>
					<CommonButton onClick={() => {
						handleAddToCart(data)
					}} className={"bg-[#000] text-[#fff] w-full py-[14px]"}>Add to Cart</CommonButton>
				</div>
			</div>
		</>
	);
};

export default ProductInfo;


const IncrementItem = () => {
	const [count, setCount] = useState(1)
	
	return (
		<div className={"flex rounded-[62px] bg-[#F0F0F0] w-[170px] justify-between h-[52px] items-center px-[22px]"}>
			<button onClick={() => {
				if (count === 1) return
				setCount(count - 1)
			}}>
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M21.375 12C21.375 12.2984 21.2565 12.5845 21.0455 12.7955C20.8345 13.0065 20.5484 13.125 20.25 13.125H3.75C3.45163 13.125 3.16548 13.0065 2.9545 12.7955C2.74353 12.5845 2.625 12.2984 2.625 12C2.625 11.7016 2.74353 11.4155 2.9545 11.2045C3.16548 10.9935 3.45163 10.875 3.75 10.875H20.25C20.5484 10.875 20.8345 10.9935 21.0455 11.2045C21.2565 11.4155 21.375 11.7016 21.375 12Z"
						fill="black"/>
				</svg>
			</button>
			<p> {count} </p>
			<button onClick={() => setCount(count + 1)}>
				<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M19.375 10C19.375 10.2984 19.2565 10.5845 19.0455 10.7955C18.8345 11.0065 18.5484 11.125 18.25 11.125H11.125V18.25C11.125 18.5484 11.0065 18.8345 10.7955 19.0455C10.5845 19.2565 10.2984 19.375 10 19.375C9.70163 19.375 9.41548 19.2565 9.2045 19.0455C8.99353 18.8345 8.875 18.5484 8.875 18.25V11.125H1.75C1.45163 11.125 1.16548 11.0065 0.954505 10.7955C0.743526 10.5845 0.625 10.2984 0.625 10C0.625 9.70163 0.743526 9.41548 0.954505 9.2045C1.16548 8.99353 1.45163 8.875 1.75 8.875H8.875V1.75C8.875 1.45163 8.99353 1.16548 9.2045 0.954505C9.41548 0.743526 9.70163 0.625 10 0.625C10.2984 0.625 10.5845 0.743526 10.7955 0.954505C11.0065 1.16548 11.125 1.45163 11.125 1.75V8.875H18.25C18.5484 8.875 18.8345 8.99353 19.0455 9.2045C19.2565 9.41548 19.375 9.70163 19.375 10Z"
						fill="black"/>
				</svg>
			</button>
		</div>
	)
}