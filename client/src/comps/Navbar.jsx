import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { FaCartFlatbed } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";

import { getCategory, onLogout } from "../store";

function Navbar() {
  const isLogin = useSelector((store) => store.isLogin);
  const curUser = useSelector((store) => store.curUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleLogout() {
    const res = await fetch("http://localhost:5000/user/logout", {
      method: "GET",
      credentials: "include",
    });
    if (!res.ok) throw new Error("Something went wrong!");
    dispatch(onLogout());
  }
  function handleHome() {
    navigate("/");
  }
  function handleShop() {
    dispatch(getCategory("all"));
    navigate("/shop");
  }
  function handleHistory() {
    navigate("/history");
  }
  function handleCart() {
    navigate("/cart");
  }
  function handleRegister() {
    navigate("/register");
  }
  return (
    <div className="max-w-[1200px] flex justify-between items-center p-4 italic m-auto">
      <div className="flex gap-4 text-[24px]">
        <button type="button" onClick={handleHome}>
          Home
        </button>
        <button type="button" onClick={handleShop}>
          Shop
        </button>
        <button
          type="button"
          onClick={handleHistory}
          className="border border-black ml-4 px-2">
          Your Orders
        </button>
      </div>
      <h1 className="text-[32px] ">BOUTIQUE</h1>
      <div className="flex gap-4 text-[24px]">
        <button className="flex items-center gap-1" onClick={handleCart}>
          <FaCartFlatbed className="text-gray-400" />
          Cart
        </button>
        {isLogin ? (
          <button className="flex items-center gap-1" onClick={handleLogout}>
            <FaUser className="text-gray-400" />
            {curUser.fullName} (logout)
          </button>
        ) : (
          <button className="flex items-center gap-1" onClick={handleRegister}>
            <FaUser className="text-gray-400" />
            Login
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
