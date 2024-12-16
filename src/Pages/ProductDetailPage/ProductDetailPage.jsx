import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import productApi from "../../service/product.api";
import ProductInfo from "./ProductInfo";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [imgIndex, setImgIndex] = useState(0);
  const [img, setImg] = useState("");

  useEffect(() => {
    productApi.getProducts().then((data) => {
      const foundProduct = data.find((item) => item.id.toString() === id);
      if (foundProduct) {
        setProduct(foundProduct);
        setImg(foundProduct.images[0]);
      }
    });
  }, [id]);

  if (!product) {
    return <h3>Loading...</h3>;
  }

  return (
    <div className={"container mx-auto px-4 md:p-0"}>
      <div className="md:flex  gap-[40px] mb-[80px] ">
        <div className="md:flex flex flex-col md:flex-row md:w-1/2 gap-3.5 md:h-[568px]">
          <div className="flex md:justify-between gap-[10px] mb-[10px] md:mb-[0] md:flex-col">
            {product.images.map((item, i) => (
              <img
                key={i}
                className={`md:w-[152px] ${
                  imgIndex === i ? "border-2 border-[#4F4631]" : ""
                } w-[80px] md:h-[168px] h-[100px] object-cover rounded-[20px] cursor-pointer`}
                src={item}
                alt=""
                onClick={() => {
                  setImg(item);
                  setImgIndex(i);
                }}
              />
            ))}
          </div>
          <div className="-order-1 md:order-1">
            <img
              className="block md:h-full w-full md:min-w-[478px] h-[420px] rounded-[20px] object-contain object-center"
              src={img}
              alt=""
            />
          </div>
        </div>
        <div className={"md:w-1/2 "}>
          <ProductInfo data={product} />
        </div>
      </div>
      <div className={"mb-[116px] mt-[150px] md:mt-[0px]"}>
        <p className={"pb-[24px] border-b"}>Подробная информация о продукте</p>
      </div>
      <div>
        <h3 className={"text-center text-[48px]"}>
          {" "}
          Вам также может понравиться
        </h3>
      </div>
    </div>
  );
};

export default ProductDetailPage;
