import { useContext } from "react";
import myContext from "../context";
import { Link, useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { CiUser } from "react-icons/ci";
import { GiSmartphone } from "react-icons/gi";
import { LuMenuSquare } from "react-icons/lu";

function SideBar() {
  const { setIsLogin, user } = useContext(myContext);
  const navigate = useNavigate();
  async function handleLogout() {
    try {
      const res = await fetch("http://localhost:5000/user/logout", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setIsLogin(false);
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <div className="w-1/6 h-[100vh] border-r">
      <h1 className="text-green-700 text-[24px] border-b-2 text-center p-2 capitalize">
        {user.role} Page
      </h1>
      <div className="capitalize">
        <div className="mb-4">
          <h3 className="uppercase">Main</h3>
          <Link to="/" className="flex justify-start items-center gap-1 pl-4">
            <MdDashboard className="text-green-700" />
            Dashboard
          </Link>
        </div>
        <div className="mb-4">
          <h3 className="uppercase">lists</h3>
          <Link
            to="/user"
            className="flex justify-start items-center gap-1 pl-4">
            <CiUser className="text-green-700" />
            Users
          </Link>
          <Link
            to="/product"
            className="flex justify-start items-center gap-1 pl-4">
            <GiSmartphone className="text-green-700" />
            Products
          </Link>
          <Link
            to="/order"
            className="flex justify-start items-center gap-1 pl-4">
            <LuMenuSquare className="text-green-700" />
            Orders
          </Link>
        </div>
        <div className="mb-4">
          <h3 className="uppercase">New</h3>
          <Link
            to="/add-product"
            className="flex justify-start items-center gap-1 pl-4">
            <GiSmartphone className="text-green-700" />
            new product
          </Link>
        </div>
        <div className="mb-4">
          <h3 className="uppercase">Social</h3>
          <Link
            to="/chat"
            className="flex justify-start items-center gap-1 pl-4">
            <GiSmartphone className="text-green-700" />
            Chat
          </Link>
        </div>
        <div>
          <h3 className="uppercase">User</h3>
        </div>
        <div
          className="flex justify-start items-center gap-1 pl-4 cursor-pointer"
          onClick={handleLogout}>
          <MdDashboard className="text-green-700" />
          logout
        </div>
      </div>
    </div>
  );
}

export default SideBar;
