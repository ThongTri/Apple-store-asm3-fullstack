import { useNavigate } from "react-router-dom";
import myContext from "../context";
import { useContext } from "react";

function ProtectRoute({ children }) {
  const { isLogin } = useContext(myContext);
  const navigate = useNavigate();
  const notAuth = (
    <div className="flex flex-col justify-center items-center mt-20">
      <h2 className="text-[28px]">Please Login first</h2>
      <button
        type="button"
        className="px-2 py-1 bg-black text-white"
        onClick={() => navigate("/login")}>
        Go to Login page
      </button>
    </div>
  );
  return (
    <>
      {!isLogin && notAuth}
      {isLogin && children}
    </>
  );
}

export default ProtectRoute;
