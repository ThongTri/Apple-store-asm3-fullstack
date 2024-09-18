import { useDispatch } from "react-redux";

import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { FaRegTrashCan } from "react-icons/fa6";

import { formatNumber } from "../ultility";
import { deleteCart, updateCart } from "../store";

function CartProduct({ product, quantity }) {
  const dispatch = useDispatch();
  async function updateMyCart(product, quantity) {
    dispatch(updateCart(product, quantity));
    try {
      await fetch(`http://localhost:5000/user/cart/${product._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ qty: quantity }),
        credentials: "include",
      });
    } catch (error) {
      alert(error.message);
    }
  }
  async function handleDelete() {
    try {
      const res = await fetch(
        `http://localhost:5000/user/cart/${product._id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (!res.ok) throw new Error("cant delete");
      dispatch(deleteCart(product));
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <tr className="h-[100px]">
      <td className="h-[80px] w-[100px]">
        <img
          src={product.img1}
          alt={product.name}
          className="h-[80px] w-auto"
        />
      </td>
      <td className="font-bold w-[120px]">{product.name}</td>
      <td className="text-center w-[100px]">
        {formatNumber(product.price.toString())}
      </td>
      <td>
        <div className="flex items-center border justify-center w-[100px] m-auto">
          <button
            className="p-1"
            type="button"
            onClick={() => updateMyCart(product, -1)}>
            <SlArrowLeft />
          </button>
          <input
            type="text"
            placeholder="Quantity"
            className="p-1 outline-none text-center w-[30px]"
            value={quantity ? quantity : 0}
            onChange={(e) =>
              updateMyCart(product, Number(e.target.value) - quantity)
            }
          />
          <button
            className="p-1"
            type="button"
            onClick={() => updateMyCart(product, 1)}>
            <SlArrowRight />
          </button>
        </div>
      </td>
      <td className="text-center w-[110px]">
        {formatNumber((Number(product.price) * quantity).toString())}
      </td>
      <td className="text-center">
        <button type="button" onClick={handleDelete}>
          <FaRegTrashCan />
        </button>
      </td>
    </tr>
  );
}

export default CartProduct;
