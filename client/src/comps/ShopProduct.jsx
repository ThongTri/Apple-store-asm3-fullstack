import { useNavigate } from "react-router-dom";

import { formatNumber } from "../ultility";

function ShopProduct({ product }) {
  const navigate = useNavigate();
  function handleShopProduct() {
    navigate(`/detail/${product._id}`);
  }
  return (
    <div className="w-1/3 animated-comp">
      <div className="relative" onClick={handleShopProduct}>
        <img
          src={product.img1}
          alt={product.name}
          className="w-full object-cover h-[300px]"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-white opacity-0 hover:opacity-50 transition-all"></div>
      </div>
      <h2 className="font-semibold italic text-center pt-4">{product.name}</h2>
      <p className="text-gray-500 italic text-center">
        {formatNumber(product.price.toString())}
      </p>
    </div>
  );
}

export default ShopProduct;
