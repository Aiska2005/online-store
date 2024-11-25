import ProductInfo from "./ProductInfo";
import {useEffect, useState} from "react";
import productApi from "../../service/product/product.api";

const ProductDetailPage = () => {
  const [data, setData] = useState([]);
  
  
  useEffect(() => {
    productApi.getAllProducts().then(data => {
      setData(data);
    })
  }, [])
  
  if (data.length === 0) {
    return (<h3>Loading...</h3>)
  }
  let url1 = 'https://ae04.alicdn.com/kf/H7479f24a525c4aa59452a8d24dbc6742V.jpg'
  let url2 = 'https://ae01.alicdn.com/kf/Sc187e38f640c41b68d181fa39e99f2bcp.jpg?width=750&height=1000&hash=1750'
  
  return (
    <div className={"container mx-auto"}>
      <div className="flex gap-[40px] mb-[80px] ">
        <div className={"flex w-1/2 gap-3.5 h-[568px] "}>
          <div className={"flex flex-grow justify-between  flex-col "}>
            {[url1, url1, url2].map((item, i) => (
              <img key={i} className={"w-[152px] h-[168px] object-top object-cover rounded-[20px]"}
                   src={item}
                   alt=""/>))}
          </div>
          <div>
            <img className={"block h-full rounded-[20px]"}
                 src={"https://img.joomcdn.net/19750690a5b0f9851011772d16d5785ac7d915b6_original.jpeg"} alt=""/>
          </div>
        </div>
        <div className={"w-1/2 h-[568px] "}>
          <ProductInfo/>
        </div>
      </div>
      <div className={"mb-[116px]"}>
        <p className={"pb-[24px] border-b"}>Подробная информация о продукте</p>
      </div>
      <div>
        <h3 className={"text-center text-[48px]"}> Вам также может понравиться</h3>
      </div>
    </div>
  );
};

export default ProductDetailPage;


