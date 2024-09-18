import { useDispatch, useSelector } from "react-redux";

import { Outlet } from "react-router-dom";
import Navbar from "../comps/Navbar";
import Footer from "../comps/Footer";
import Popup from "../comps/Popup";
// import LiveChat from "../comps/LiveChat";
import { onLogin } from "../store";
import { useEffect } from "react";
import LiveChat from "../comps/LiveChat";

function Root() {
  const dispatch = useDispatch();
  const isShow = useSelector((store) => store.show);
  useEffect(() => {
    async function autoLogin() {
      try {
        const res = await fetch("http://localhost:5000/user/auto-login", {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        if (!res.ok) throw new Error("Cant access!");
        if (data.data.user) dispatch(onLogin(data.data.user));
      } catch (error) {
        console.log(error.message);
      }
    }
    autoLogin();
  }, [dispatch]);
  return (
    <>
      {isShow && <Popup />}
      <div>
        <Navbar />
        <div className="max-w-[1200px] m-auto py-8">
          <Outlet />
        </div>
        <Footer />
        <LiveChat />
      </div>
    </>
  );
}

export default Root;
