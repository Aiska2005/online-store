import { useEffect, useState } from "react";
import productApi from "../../service/product.api";
import ProductInfo from "./ProductInfo";

const ProductDetailPage = () => {
  const [data, setData] = useState([]);
  const [imgIndex, setImgIndex] = useState(0);
  const [img, setImg] = useState("https://ae04.alicdn.com/kf/H7479f24a525c4aa59452a8d24dbc6742V.jpg");


  useEffect(() => {
    productApi.getAllProducts().then(data => {
      setData(data);
      setImg(data.image)
    })
  }, [])

  if (data.length === 0) {
    return <h3>Loading...</h3>
  }

  let url1 = 'https://ae04.alicdn.com/kf/H7479f24a525c4aa59452a8d24dbc6742V.jpg'
  let url2 = 'https://ae01.alicdn.com/kf/Sc187e38f640c41b68d181fa39e99f2bcp.jpg?width=750&height=1000&hash=1750'
  let url3 = 'https://img.joomcdn.net/43503572d4c91faf99e1830eeb56f94dd960b560_original.jpeg'

  return (
    <div className={"container mx-auto px-4 md:p-0"}>
      <div className="md:flex  gap-[40px] mb-[80px] ">
        <div className="md:flex flex flex-col md:flex-row md:w-1/2 gap-3.5 md:h-[568px]">
          <div className="flex md:justify-between gap-[10px] mb-[10px] md:mb-[0] md:flex-col">
            {[url1, url3, url2].map((item, i) => (
              <img
                key={i}
                className={`md:w-[152px]  ${imgIndex === i ? "border-2 border-[#4F4631]" : ""}  w-[80px] md:h-[168px] h-[100px] object-cover rounded-[20px] cursor-pointer`}
                src={item}
                alt=""
                onClick={() => {
                  setImg(item)
                  setImgIndex(i)
                }}
              // style={{objectFit: 'cover'}} // Дополнительный стиль для фиксирования
              />
            ))}
          </div>
          <div className="-order-1 md:order-1">
            <img
              className="block md:h-full w-full md:min-w-[478px] h-[420px] rounded-[20px] object-contain object-center"
              src={img}
              alt=""
            // style={{objectFit: 'cover'}}
            />
          </div>
        </div>
        <div className={"md:w-1/2 "}>
          <ProductInfo data={data} />
        </div>
      </div>
      <div className={"mb-[116px] mt-[150px] md:mt-[0px]"}>
        <p className={"pb-[24px] border-b"}>Подробная информация о продукте</p>
      </div>
      <div>
        <h3 className={"text-center text-[48px]"}> Вам также может понравиться</h3>
      </div>
    </div>
  );
};

export default ProductDetailPage;


