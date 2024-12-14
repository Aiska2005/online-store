const ProductImages = ({ images, id }) => {
  return (
    <div className="flex flex-wrap">
      {images.map((image, index) => (
        <div key={index} className="w-1/4 p-1">
          <img
            src={image}
            alt={`product-image-${id}-${index}`}
            className="w-full object-cover rounded shadow-md"
          />
        </div>
      ))}
    </div>
  );
};

export default ProductImages;