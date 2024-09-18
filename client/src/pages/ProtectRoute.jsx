import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ProtectRoute({ children }) {
  const isLogin = useSelector((store) => store.isLogin);
  const navigate = useNavigate();
  const notLogin = (
    <div className="mt-20 text-center">
      <p>Please login first</p>
      <button
        className="px-4 py-2 bg-black text-white mt-10"
        onClick={() => navigate("/login")}>
        Go to login page
      </button>
    </div>
  );
  return (
    <>
      {isLogin && children}
      {!isLogin && notLogin}
    </>
  );
}

export default ProtectRoute;
