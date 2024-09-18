import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import SubBanner from "../comps/SubBanner";
import CartProduct from "../comps/CartProduct";
import { FaGift } from "react-icons/fa";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

import { formatNumber } from "../ultility";
import { useEffect } from "react";
import { getCartFromServer } from "../store";

function CartPage() {
  const dispatch = useDispatch();
  const cart = useSelector((store) => store.cart);

  // const [userCart, setUserCart] = useState(null);
  useEffect(() => {
    async function getCart() {
      try {
        const res = await fetch("http://localhost:5000/user/cart", {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        // setUserCart(data.data);
        dispatch(getCartFromServer(data.data.cart, data.data.total));
      } catch (error) {
        console.log(error.message);
      }
    }
    getCart();
  }, [dispatch]);
  // useEffect(() => {
  //   if (!userCart) return;
  //   dispatch(getCartFromServer(userCart.cart, userCart.total));
  // }, [userCart, dispatch]);
  const navigate = useNavigate();
  const total = cart.reduce(
    (acc, product) => acc + product.product.price * product.qty,
    0
  );

  return (
    <div className="italic">
      <SubBanner name="cart" />
      <h2 className="uppercase text-[28px] py-8 px-4">Shopping cart</h2>
      <div className="flex gap-2 px-4">
        <table className="w-3/4">
          <thead>
            <tr className="uppercase font-bold">
              <th>image</th>
              <th>product</th>
              <th>price</th>
              <th>quantity</th>
              <th>total</th>
              <th>remove</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <CartProduct
                product={item.product}
                quantity={item.qty}
                key={"cart" + item.product._id}
              />
            ))}
          </tbody>
        </table>
        <div className="uppercase flex flex-col w-1/3 bg-gray-100 p-8">
          <h2 className="text-[24px] font-semibold">cart total</h2>
          <div className="flex items-center justify-between pb-2 pt-4">
            <h3 className="text-[18px] font-semibold">subtotal</h3>
            <p className="text-gray-500">{formatNumber(total.toString())}</p>
          </div>
          <div className="flex items-center justify-between border-t pt-2 pb-4">
            <h3 className="text-[18px] font-semibold">total</h3>
            <p className="text-[20px]">{formatNumber(total.toString())}</p>
          </div>
          <input
            type="text"
            placeholder="Enter your coupon"
            className="px-4 py-2 border"
          />
          <button className="bg-black text-white px-4 py-2 flex items-center justify-center gap-2">
            <FaGift />
            Apply coupon
          </button>
        </div>
      </div>
      <div className="flex w-2/3 items-center justify-between">
        <button
          className="px-4 py-2 border hover:border-black border-white italic flex items-center gap-2"
          onClick={() => navigate("/shop")}>
          <FaArrowLeftLong />
          Continue Shopping
        </button>
        {cart.length > 0 && (
          <button
            className="px-4 py-2 border hover:border-black border-white italic flex items-center gap-2"
            onClick={() => navigate("/checkout")}>
            Proceed to checkout
            <FaArrowRightLong />
          </button>
        )}
      </div>
    </div>
  );
}

export default CartPage;
