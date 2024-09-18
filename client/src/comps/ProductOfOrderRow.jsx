import { Tooltip } from "react-tooltip";
import { formatNumber } from "../ultility";

function ProductOfOrderRow({ product, index, quantity }) {
  return (
    <tr className={`${index % 2 === 0 ? "bg-red-100" : ""} text-gray-600`}>
      <td className="py-2 px-1 border">
        <div
          data-tooltip-id={product._id}
          data-tooltip-content={product._id}
          className="w-20 truncate">
          {product._id}
        </div>
        <Tooltip id={product._id} />
      </td>
      <td className="py-2 px-1 border flex justify-center items-center">
        <img src={product.img1} alt={product.name} className="w-[75px]" />
      </td>
      <td className="py-2 px-1 border">{product.name}</td>
      <td className="py-2 px-1 border text-center">
        {formatNumber(product.price.toString())}
      </td>
      <td className="py-2 px-1 border text-center">{quantity}</td>
    </tr>
  );
}

export default ProductOfOrderRow;
