import { useDispatch } from "react-redux";

import { formatNumber } from "../ultility";
import { showPopup } from "../store";

function Product({ product }) {
  const dispatch = useDispatch();
  function handleProduct() {
    dispatch(showPopup(product));
  }
  return (
    <div className="w-1/4">
      <div className="relative" onClick={handleProduct}>
        <img
          src={product.img1}
          alt={product.name}
          className="w-full object-cover"
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

export default Product;
