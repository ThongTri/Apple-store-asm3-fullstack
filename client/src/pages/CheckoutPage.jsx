import SubBanner from "../comps/SubBanner";
import CheckoutItem from "../comps/CheckoutItem";

import { formatNumber } from "../ultility";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function CheckoutPage() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const user = useSelector((store) => store.curUser);
  const navigate = useNavigate();
  useEffect(() => {
    async function getCart() {
      try {
        const res = await fetch(`http://localhost:5000/user/cart`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        setCart(data.data.cart);
        setTotal(data.data.total);
      } catch (error) {
        alert(error.message);
      }
    }
    getCart();
  }, []);
  async function handleOrder(e) {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address }),
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      navigate("/history");
    } catch (error) {
      alert(error.message);
    }
  }
  return (
    <div>
      <SubBanner name="Checkout" />
      <h2 className="uppercase italic ml-4 text-[24px]">Billing details</h2>
      <div className="flex italic">
        <form onSubmit={handleOrder} className="uppercase italic w-[60%]">
          <div className="flex flex-col py-2 text-gray-500 px-4">
            <label htmlFor="name">full name:</label>
            <input
              type="text"
              id="name"
              className="outline-none px-4 py-2 border"
              placeholder="Enter your Full Name here!"
              value={user.fullName}
              readOnly
            />
          </div>
          <div className="flex flex-col py-2 text-gray-500 px-4">
            <label htmlFor="email">email:</label>
            <input
              type="email"
              id="email"
              className="outline-none px-4 py-2 border"
              placeholder="Enter your Email here!"
              value={user.email}
              readOnly
            />
          </div>
          <div className="flex flex-col py-2 text-gray-500 px-4">
            <label htmlFor="tel">phone number:</label>
            <input
              type="tel"
              id="tel"
              className="outline-none px-4 py-2 border"
              placeholder="Enter your phone number here!"
              value={user.phoneNumber}
              readOnly
            />
          </div>
          <div className="flex flex-col py-2 text-gray-500 px-4">
            <label htmlFor="address">address:</label>
            <input
              type="text"
              id="address"
              className="outline-none px-4 py-2 border"
              placeholder="Enter your address here!"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              required
            />
          </div>
          <button className="bg-black text-white px-4 py-2 ml-4">
            Place order
          </button>
        </form>
        <div className="flex flex-col w-[40%] bg-gray-100 p-8">
          <h2 className="text-[24px] font-semibold uppercase">Your order</h2>
          {cart.map((item) => (
            <CheckoutItem
              product={item.product}
              quantity={item.qty}
              key={"checkout" + item.product._id}
            />
          ))}
          <div className="flex items-center justify-between pt-2 pb-4">
            <h3 className="text-[20px] font-semibold uppercase">total</h3>
            <p className="text-[20px] uppercase">
              {formatNumber(total.toString())}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
