import { formatNumber } from "../ultility";

function CheckoutItem({ product, quantity }) {
  return (
    <div className="flex items-center justify-between pb-2 pt-4 border-b">
      <h3 className="text-[18px] font-semibold w-1/2">{product.name}</h3>
      <p className="text-gray-500">
        {formatNumber(product.price.toString())} x {quantity}
      </p>
    </div>
  );
}

export default CheckoutItem;
